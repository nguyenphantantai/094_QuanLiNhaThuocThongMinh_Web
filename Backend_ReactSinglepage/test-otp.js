// Test script for OTP functionality
const API_BASE = 'http://localhost:5000';

async function testOTP() {
  const phone = '0942808839'; // Test phone number
  
  console.log('🧪 Testing OTP functionality...\n');
  
  try {
    // Test 1: Send OTP via SMS
    console.log('1️⃣ Testing SMS OTP...');
    const smsResponse = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        method: 'sms'
      }),
    });
    
    const smsResult = await smsResponse.json();
    console.log('SMS Response:', smsResult);
    
    if (smsResult.success) {
      console.log('✅ SMS OTP sent successfully!\n');
    } else {
      console.log('❌ SMS OTP failed:', smsResult.message, '\n');
    }
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test 2: Send OTP via Zalo
    console.log('2️⃣ Testing Zalo OTP...');
    const zaloResponse = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        method: 'zalo'
      }),
    });
    
    const zaloResult = await zaloResponse.json();
    console.log('Zalo Response:', zaloResult);
    
    if (zaloResult.success) {
      console.log('✅ Zalo OTP sent successfully!\n');
    } else {
      console.log('❌ Zalo OTP failed:', zaloResult.message, '\n');
    }
    
    // Test 3: Test invalid phone number
    console.log('3️⃣ Testing invalid phone number...');
    const invalidResponse = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '123',
        method: 'sms'
      }),
    });
    
    const invalidResult = await invalidResponse.json();
    console.log('Invalid Phone Response:', invalidResult);
    
    if (!invalidResult.success) {
      console.log('✅ Invalid phone validation working correctly!\n');
    } else {
      console.log('❌ Invalid phone validation failed!\n');
    }
    
    console.log('🎉 OTP testing completed!');
    console.log('📝 Note: Check the server console for the actual OTP codes.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
  }
}

// Run the test
testOTP();
