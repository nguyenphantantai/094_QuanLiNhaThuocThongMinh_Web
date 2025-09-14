# Hướng dẫn tích hợp OTP thực tế

## 🚨 Vấn đề hiện tại
Hiện tại hệ thống chỉ sử dụng mock service - OTP chỉ được in ra console chứ không thực sự gửi qua SMS/Zalo.

## 📱 Tích hợp SMS API

### 1. Twilio (Khuyến nghị - có free tier)
```bash
npm install twilio
```

Thêm vào `.env`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

Uncomment code trong `SMSService.sendSMS()` và thêm:
```javascript
const twilio = require('twilio');
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const result = await client.messages.create({
  body: message,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: phone
});
```

### 2. Viettel SMS API
```javascript
const response = await fetch('https://api.viettelpost.vn/api/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.VIETTEL_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    phone: phone,
    message: message
  })
});
```

### 3. VNPT SMS API
```javascript
const response = await fetch('https://api.vnpt.vn/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.VNPT_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    phone: phone,
    message: message
  })
});
```

## 💬 Tích hợp Zalo API

### 1. Zalo Official Account
1. Đăng ký Zalo Official Account
2. Tạo ứng dụng trên Zalo Developer
3. Lấy Access Token

Thêm vào `.env`:
```env
ZALO_ACCESS_TOKEN=your_zalo_access_token
ZALO_OA_ID=your_zalo_oa_id
```

Uncomment code trong `ZaloService.sendZaloMessage()` và thêm:
```javascript
const response = await fetch('https://openapi.zalo.me/v2.0/oa/message', {
  method: 'POST',
  headers: { 
    'Authorization': `Bearer ${process.env.ZALO_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
    recipient: { user_id: phone },
    message: { text: message }
  })
});
```

## 📧 Tích hợp Email (Tạm thời)

### Gmail SMTP
Thêm vào `.env`:
```env
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_app_password
```

Uncomment code trong `EmailService.sendOTPEmail()` và thêm:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

## 🧪 Test với Mock Service

Hiện tại bạn có thể test bằng cách:

1. **Xem OTP trong console**: Khi gửi OTP, mã sẽ được in ra console backend
2. **Sử dụng mã OTP**: Copy mã từ console và nhập vào frontend
3. **Test flow hoàn chỉnh**: Đăng nhập → Nhập số điện thoại → Gửi OTP → Nhập mã → Xác thực

## 🚀 Triển khai Production

1. Chọn một SMS provider (Twilio khuyến nghị)
2. Đăng ký Zalo Official Account
3. Cập nhật environment variables
4. Uncomment code tương ứng trong service
5. Test với số điện thoại thật

## 💡 Lưu ý

- **Twilio**: Có free tier 15$ credit, đủ cho testing
- **Zalo**: Cần đăng ký Official Account, có thể mất phí
- **Email**: Chỉ nên dùng cho testing, không phù hợp cho production
- **Rate limiting**: Thêm rate limiting để tránh spam OTP

## 🔧 Troubleshooting

### SMS không gửi được:
- Kiểm tra API key/credentials
- Kiểm tra format số điện thoại (phải có country code)
- Kiểm tra balance/credit của provider

### Zalo không gửi được:
- Kiểm tra Access Token
- Kiểm tra OA ID
- Đảm bảo user đã follow Official Account

### Email không gửi được:
- Kiểm tra Gmail App Password
- Kiểm tra 2FA đã bật
- Kiểm tra firewall/network
