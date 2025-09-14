const API_BASE = 'http://localhost:5000';

async function testRegisterFlow() {
  console.log('🧪 Testing Register Flow with Profile Completion...\n');

  try {
    // Step 1: Send OTP
    console.log('📱 Step 1: Sending OTP...');
    const otpResponse = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '0942808840', // Use a different phone number
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
        phone: '0942808840',
        otp: '123456', // Use the OTP from console log
        password: 'password123',
        email: 'testuser@example.com',
      }),
    });

    const registerData = await registerResponse.json();
    console.log('Register Response:', registerData);

    if (!registerData.success) {
      throw new Error(`Registration failed: ${registerData.message}`);
    }

    const token = registerData.data.token;
    console.log('✅ Registration successful!');
    console.log('🔑 Token received:', token.substring(0, 20) + '...');
    console.log('📋 Requires profile completion:', registerData.data.requiresProfileCompletion);

    if (registerData.data.requiresProfileCompletion) {
      console.log('\n👤 Step 3: Completing profile...');
      
      // Create FormData for profile completion
      const formData = new FormData();
      formData.append('firstName', 'Nguyễn Văn');
      formData.append('lastName', 'Test');
      formData.append('dateOfBirth', '1990-01-01');
      formData.append('gender', 'male');
      formData.append('address', '123 Đường Test, Quận 1, TP.HCM');

      const completeResponse = await fetch(`${API_BASE}/api/auth/complete-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const completeData = await completeResponse.json();
      console.log('Complete Profile Response:', completeData);

      if (!completeData.success) {
        throw new Error(`Complete profile failed: ${completeData.message}`);
      }

      console.log('✅ Profile completed successfully!');
      console.log('👤 Final user data:', {
        id: completeData.data.user.id,
        email: completeData.data.user.email,
        phone: completeData.data.user.phone,
        firstName: completeData.data.user.firstName,
        lastName: completeData.data.user.lastName,
        dateOfBirth: completeData.data.user.dateOfBirth,
        gender: completeData.data.user.gender,
        address: completeData.data.user.address,
      });
    }

    console.log('\n🎉 Complete Register Flow Test PASSED!');
    console.log('\n📊 Summary:');
    console.log('- ✅ OTP sent successfully');
    console.log('- ✅ User registered with temporary profile');
    console.log('- ✅ Profile completion form triggered');
    console.log('- ✅ Profile completed with personal information');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testRegisterFlow();
