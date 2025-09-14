// Using built-in fetch in Node.js 18+

async function testRegister() {
  try {
    // First, send OTP
    console.log('1. Sending OTP...');
    const otpResponse = await fetch('http://localhost:5000/api/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: '0942808839',
        method: 'sms',
      }),
    });

    const otpData = await otpResponse.json();
    console.log('OTP Response:', otpData);

    if (otpData.success) {
      // Wait a bit then try to register
      console.log('2. Waiting 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('3. Attempting to register...');
      const registerResponse = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: '0942808839',
          otp: '123456', // Use the OTP from console log
          password: '123456',
          email: 'test@gmail.com',
        }),
      });

      const registerData = await registerResponse.json();
      console.log('Register Response:', registerData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testRegister();
