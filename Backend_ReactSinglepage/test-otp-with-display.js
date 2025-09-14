// Test script for OTP with display
const API_BASE = 'http://localhost:5000';

async function testOTPWithDisplay() {
  const phone = '0942808839';
  
  console.log('🧪 Testing OTP with display...\n');
  
  try {
    // Test SMS OTP
    console.log('📱 Testing SMS OTP...');
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
    
    if (smsResult.success && smsResult.data.otp) {
      console.log(`✅ SMS OTP sent! Code: ${smsResult.data.otp}`);
    } else {
      console.log('❌ SMS OTP failed or no OTP in response');
    }
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test Zalo OTP
    console.log('\n💬 Testing Zalo OTP...');
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
    
    if (zaloResult.success && zaloResult.data.otp) {
      console.log(`✅ Zalo OTP sent! Code: ${zaloResult.data.otp}`);
    } else {
      console.log('❌ Zalo OTP failed or no OTP in response');
    }
    
    console.log('\n🎉 Test completed!');
    console.log('📝 Note: In production, OTP will be sent via real SMS/Zalo API');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
  }
}

testOTPWithDisplay();

