const API_BASE = 'http://localhost:5000';

async function testBackendResponse() {
  console.log('🧪 Testing Backend Response...\n');

  try {
    // Step 1: Send OTP
    console.log('📱 Step 1: Sending OTP...');
    const otpResponse = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '0942808843',
        method: 'sms',
      }),
    });

    const otpData = await otpResponse.json();
    console.log('OTP Response:', otpData);

    if (!otpData.success) {
      throw new Error(`OTP failed: ${otpData.message}`);
    }

    // Step 2: Register with OTP
    console.log('\n📝 Step 2: Registering user...');
    const registerResponse = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '0942808843',
        otp: '123456',
        password: 'password123',
        email: 'testuser2@example.com',
      }),
    });

    const registerData = await registerResponse.json();
    console.log('\n🔍 FULL REGISTER RESPONSE:');
    console.log(JSON.stringify(registerData, null, 2));

    if (!registerData.success) {
      throw new Error(`Registration failed: ${registerData.message}`);
    }

    console.log('\n✅ Registration successful!');
    console.log('🔑 Token received:', registerData.data.token.substring(0, 20) + '...');
    console.log('📋 Requires profile completion:', registerData.data.requiresProfileCompletion);
    console.log('👤 User data:', registerData.data.user);

    if (registerData.data.requiresProfileCompletion) {
      console.log('\n✅ Backend is correctly returning requiresProfileCompletion: true');
      console.log('🎯 Frontend should show CompleteProfileForm');
    } else {
      console.log('\n❌ Backend is NOT returning requiresProfileCompletion: true');
      console.log('🔧 This is the problem!');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Make sure backend is running:');
    console.log('cd Backend_ReactSinglepage && npm run dev');
  }
}

// Run the test
testBackendResponse();
