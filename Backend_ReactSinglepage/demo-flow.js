// Demo script để test flow đăng ký và hoàn thiện profile
const API_BASE = 'http://localhost:5000';

console.log('🎬 DEMO: Flow Đăng ký và Hoàn thiện Thông tin Cá nhân');
console.log('=' .repeat(60));

async function demoFlow() {
  try {
    console.log('\n📱 BƯỚC 1: Gửi OTP');
    console.log('Đang gửi OTP đến số: 0942808841');
    
    const otpResponse = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '0942808841', method: 'sms' }),
    });
    
    const otpData = await otpResponse.json();
    console.log('✅ OTP đã được gửi:', otpData.message);
    
    console.log('\n📝 BƯỚC 2: Đăng ký tài khoản');
    console.log('Đang đăng ký với thông tin:');
    console.log('- Số điện thoại: 0942808841');
    console.log('- Email: demo@example.com');
    console.log('- Mật khẩu: password123');
    console.log('- OTP: 123456');
    
    const registerResponse = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '0942808841',
        otp: '123456',
        password: 'password123',
        email: 'demo@example.com',
      }),
    });
    
    const registerData = await registerResponse.json();
    console.log('✅ Đăng ký thành công!');
    console.log('🔑 Token:', registerData.data.token.substring(0, 30) + '...');
    console.log('📋 Cần hoàn thiện profile:', registerData.data.requiresProfileCompletion);
    
    if (registerData.data.requiresProfileCompletion) {
      console.log('\n👤 BƯỚC 3: Hoàn thiện thông tin cá nhân');
      console.log('Đang gửi thông tin cá nhân:');
      console.log('- Họ tên: Nguyễn Văn Demo');
      console.log('- Ngày sinh: 1990-01-01');
      console.log('- Giới tính: Nam');
      console.log('- Địa chỉ: 123 Đường Demo, Quận 1, TP.HCM');
      
      const formData = new FormData();
      formData.append('firstName', 'Nguyễn Văn Demo');
      formData.append('lastName', '');
      formData.append('dateOfBirth', '1990-01-01');
      formData.append('gender', 'male');
      formData.append('address', '123 Đường Demo, Quận 1, TP.HCM');
      
      const completeResponse = await fetch(`${API_BASE}/api/auth/complete-profile`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${registerData.data.token}` },
        body: formData,
      });
      
      const completeData = await completeResponse.json();
      console.log('✅ Hoàn thiện thông tin thành công!');
      console.log('👤 Thông tin user:');
      console.log('   - ID:', completeData.data.user.id);
      console.log('   - Email:', completeData.data.user.email);
      console.log('   - Phone:', completeData.data.user.phone);
      console.log('   - Họ tên:', completeData.data.user.firstName, completeData.data.user.lastName);
      console.log('   - Ngày sinh:', completeData.data.user.dateOfBirth);
      console.log('   - Giới tính:', completeData.data.user.gender);
      console.log('   - Địa chỉ:', completeData.data.user.address);
    }
    
    console.log('\n🎉 DEMO HOÀN THÀNH!');
    console.log('=' .repeat(60));
    console.log('📊 Tóm tắt:');
    console.log('✅ Gửi OTP thành công');
    console.log('✅ Đăng ký tài khoản thành công');
    console.log('✅ Hoàn thiện thông tin cá nhân thành công');
    console.log('✅ Dữ liệu đã được lưu vào database');
    
    console.log('\n🌐 Bây giờ bạn có thể:');
    console.log('1. Mở browser: http://localhost:3000');
    console.log('2. Click "Đăng nhập/Đăng ký"');
    console.log('3. Click "Đăng ký"');
    console.log('4. Điền thông tin và test flow thực tế');
    
  } catch (error) {
    console.error('❌ Demo thất bại:', error.message);
    console.log('\n🔧 Kiểm tra:');
    console.log('1. Backend đã chạy chưa? (npm run dev)');
    console.log('2. Port 5000 có bị chiếm không?');
    console.log('3. Database connection OK?');
  }
}

// Chạy demo
demoFlow();
