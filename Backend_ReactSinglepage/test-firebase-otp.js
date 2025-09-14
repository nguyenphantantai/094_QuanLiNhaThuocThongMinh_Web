// Test script for Firebase OTP
const API_BASE = 'http://localhost:5000';

async function testFirebaseOTP() {
  const phone = '0942808839';
  
  console.log('🔥 Testing Firebase OTP...\n');
  
  try {
    // Test Firebase OTP
    console.log('📱 Testing Firebase OTP...');
    const firebaseResponse = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        method: 'firebase'
      }),
    });
    
    const firebaseResult = await firebaseResponse.json();
    console.log('Firebase Response:', firebaseResult);
    
    if (firebaseResult.success) {
      console.log(`✅ Firebase OTP sent! Session: ${firebaseResult.data.sessionInfo}`);
      console.log('📝 Check server console for the OTP code');
      
      // Test verification (you'll need to get the OTP from console)
      console.log('\n🔐 To test verification, use the OTP from server console');
      console.log('Example: node test-firebase-verify.js 0942808839 123456');
    } else {
      console.log('❌ Firebase OTP failed:', firebaseResult.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Make sure:');
    console.log('   1. Backend server is running on port 5000');
    console.log('   2. Firebase is properly configured in .env');
    console.log('   3. Firebase service account key is available');
  }
}

testFirebaseOTP();
