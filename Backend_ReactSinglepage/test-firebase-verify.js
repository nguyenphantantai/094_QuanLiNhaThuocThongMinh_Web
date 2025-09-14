// Test script for Firebase OTP verification
const API_BASE = 'http://localhost:5000';

async function testFirebaseVerify(phone, otp) {
  console.log('🔥 Testing Firebase OTP verification...\n');
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        otp: otp,
        method: 'firebase'
      }),
    });
    
    const result = await response.json();
    console.log('Verification Response:', result);
    
    if (result.success) {
      console.log(`✅ OTP verified successfully!`);
      console.log(`👤 User: ${result.data.user.firstName} ${result.data.user.lastName}`);
      console.log(`📧 Email: ${result.data.user.email}`);
      console.log(`🔑 Token: ${result.data.user.token.substring(0, 20)}...`);
    } else {
      console.log('❌ OTP verification failed:', result.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node test-firebase-verify.js <phone> <otp>');
  console.log('Example: node test-firebase-verify.js 0942808839 123456');
  process.exit(1);
}

const [phone, otp] = args;
testFirebaseVerify(phone, otp);
