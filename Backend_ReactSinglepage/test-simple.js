// Simple test for OTP API
const API_BASE = 'http://localhost:5000';

async function testSimple() {
  console.log('🧪 Testing OTP API...\n');
  
  try {
    // Test send OTP via SMS
    console.log('📱 Testing SMS OTP...');
    const response = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '0942808839',
        method: 'sms'
      }),
    });
    
    const result = await response.json();
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ SMS OTP sent successfully!');
      console.log('📝 Check server console for the OTP code');
    } else {
      console.log('❌ SMS OTP failed:', result.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
  }
}

testSimple();

