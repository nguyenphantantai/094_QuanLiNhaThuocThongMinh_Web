import admin from 'firebase-admin';
import { config } from '../config/index.js';

// Initialize Firebase Admin SDK
let firebaseApp: admin.app.App;

export const initializeFirebase = () => {
  try {
    if (admin.apps.length === 0) {
      // Option 1: Using service account key file
      if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        firebaseApp = admin.initializeApp({
          credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
          projectId: process.env.FIREBASE_PROJECT_ID,
        });
      }
      // Option 2: Using environment variables
      else if (process.env.FIREBASE_ADMIN_PROJECT_ID && process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
        firebaseApp = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          }),
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        });
      }
      // Option 3: Using default credentials (for production)
      else {
        firebaseApp = admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID,
        });
      }
      
      console.log('✅ Firebase Admin SDK initialized successfully');
    } else {
      firebaseApp = admin.app();
    }
  } catch (error) {
    console.error('❌ Firebase Admin SDK initialization failed:', error);
    throw error;
  }
};

// Firebase Phone Authentication Service
export class FirebasePhoneService {
  static async sendOTP(phoneNumber: string): Promise<{ success: boolean; sessionInfo?: string; error?: string }> {
    try {
      if (!firebaseApp) {
        throw new Error('Firebase not initialized');
      }

      // Format phone number for Firebase (must include country code)
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+84${phoneNumber.substring(1)}`;
      
      console.log(`📱 Sending OTP to ${formattedPhone} via Firebase...`);

      // In a real implementation, you would use Firebase Admin SDK to send OTP
      // However, Firebase Admin SDK doesn't directly send OTP - it's handled by the client
      // For backend verification, we'll create a custom OTP system
      
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP in Firestore for verification
      const db = admin.firestore();
      await db.collection('otp_verifications').doc(formattedPhone).set({
        otp,
        phoneNumber: formattedPhone,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        verified: false,
      });

      // For development, we'll simulate sending OTP
      // In production, you would integrate with SMS service like Twilio
      console.log(`🔐 OTP for ${formattedPhone}: ${otp}`);
      console.log(`📱 [MOCK SMS] OTP sent to ${formattedPhone}: ${otp}`);
      
      return {
        success: true,
        sessionInfo: `mock_session_${Date.now()}`,
      };
    } catch (error) {
      console.error('Firebase OTP sending failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async verifyOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      if (!firebaseApp) {
        throw new Error('Firebase not initialized');
      }

      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+84${phoneNumber.substring(1)}`;
      
      const db = admin.firestore();
      const otpDoc = await db.collection('otp_verifications').doc(formattedPhone).get();
      
      if (!otpDoc.exists) {
        return {
          success: false,
          error: 'OTP not found or expired',
        };
      }

      const otpData = otpDoc.data();
      if (!otpData) {
        return {
          success: false,
          error: 'Invalid OTP data',
        };
      }

      // Check if OTP is expired
      if (new Date() > otpData.expiresAt.toDate()) {
        await otpDoc.ref.delete();
        return {
          success: false,
          error: 'OTP has expired',
        };
      }

      // Verify OTP
      if (otpData.otp !== otp) {
        return {
          success: false,
          error: 'Invalid OTP',
        };
      }

      // OTP is valid, mark as verified
      await otpDoc.ref.update({
        verified: true,
        verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Create or get user
      let user = await db.collection('users').where('phone', '==', formattedPhone).limit(1).get();
      
      if (user.empty) {
        // Create new user
        const newUserRef = await db.collection('users').add({
          phone: formattedPhone,
          email: `${formattedPhone}@pharmacy.com`,
          firstName: 'Khách',
          lastName: 'Hàng',
          role: 'customer',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          isActive: true,
        });
        
        user = await newUserRef.get();
      }

      const userData = user.docs[0].data();
      
      // Generate custom token for the user
      const customToken = await admin.auth().createCustomToken(formattedPhone, {
        uid: user.docs[0].id,
        phone: formattedPhone,
        role: userData.role,
      });

      return {
        success: true,
        user: {
          id: user.docs[0].id,
          phone: formattedPhone,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          customToken,
        },
      };
    } catch (error) {
      console.error('Firebase OTP verification failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Firebase Google Authentication Service
export class FirebaseGoogleService {
  static async verifyGoogleToken(idToken: string): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      if (!firebaseApp) {
        throw new Error('Firebase not initialized');
      }

      // Verify the ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      
      console.log('✅ Google token verified for:', decodedToken.email);

      // Get or create user in Firestore
      const db = admin.firestore();
      let user = await db.collection('users').where('email', '==', decodedToken.email).limit(1).get();
      
      if (user.empty) {
        // Create new user
        const newUserRef = await db.collection('users').add({
          email: decodedToken.email,
          firstName: decodedToken.name?.split(' ')[0] || 'User',
          lastName: decodedToken.name?.split(' ').slice(1).join(' ') || '',
          role: 'customer',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          isActive: true,
          googleUid: decodedToken.uid,
        });
        
        user = await newUserRef.get();
      }

      const userData = user.docs[0].data();
      
      return {
        success: true,
        user: {
          id: user.docs[0].id,
          email: decodedToken.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          googleUid: decodedToken.uid,
        },
      };
    } catch (error) {
      console.error('Firebase Google verification failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
