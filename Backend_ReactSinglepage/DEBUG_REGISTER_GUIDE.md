# Hướng dẫn Debug Lỗi Đăng Ký

## Vấn đề
Khi click "Đăng Ký Ngay" sau khi đã gửi OTP, hiển thị lỗi 400:
```
POST /api/auth/register 400 86.974 ms - 248
```

**Nguyên nhân:** Validation middleware yêu cầu `firstName` và `lastName` nhưng form đăng ký không gửi những field này.

## Các bước debug đã thực hiện:

### 1. ✅ Đã sửa backend
- Bỏ field `country` không cần thiết trong register API
- Thêm logging để debug request body và OTP storage
- **Tạo validation mới** `validateUserRegisterWithOTP` không yêu cầu firstName/lastName
- **Cập nhật route** `/register` sử dụng validation mới

### 2. ✅ Đã thêm logging frontend
- Log request body trước khi gửi
- Log response từ server
- Log OTP send response

### 3. ✅ Tạo script debug
- File `debug-register.js` để test API trực tiếp

## Cách debug:

### Bước 1: Khởi động backend
```bash
cd Backend_ReactSinglepage
npm run dev
```

### Bước 2: Kiểm tra console backend
Khi bạn gửi OTP và đăng ký, sẽ thấy các log:
```
OTP stored for phone: 0942808839 OTP: 123456
Register request body: { phone: '0942808839', otp: '123456', password: '123456', email: 'test@gmail.com' }
Looking for OTP for phone: 0942808839
Current OTP storage: ['0942808839']
```

### Bước 3: Kiểm tra console frontend
Mở Developer Tools (F12) và xem Console tab:
```
Register request body: {phone: "0942808839", otp: "123456", password: "123456", email: "test@gmail.com"}
Register response: {success: false, message: "..."}
```

### Bước 4: Chạy script debug (tùy chọn)
```bash
cd Backend_ReactSinglepage
node debug-register.js
```

**Lưu ý:** Script đã được sửa để sử dụng built-in fetch của Node.js 18+

## Các lỗi có thể gặp:

### 1. "OTP not found or expired"
- **Nguyên nhân:** OTP không được lưu hoặc đã hết hạn
- **Giải pháp:** Gửi lại OTP và thử đăng ký ngay

### 2. "Phone, OTP, password, and email are required"
- **Nguyên nhân:** Thiếu field trong request
- **Giải pháp:** Kiểm tra form có đầy đủ thông tin

### 3. "Invalid OTP"
- **Nguyên nhân:** Mã OTP không đúng
- **Giải pháp:** Kiểm tra mã OTP trong console backend

### 4. "User with this email/phone already exists"
- **Nguyên nhân:** Tài khoản đã tồn tại
- **Giải pháp:** Dùng email/phone khác

## Test case:

1. **Gửi OTP:**
   - Phone: `0942808839`
   - Method: `sms`
   - Kết quả: OTP được lưu và hiển thị trong console

2. **Đăng ký:**
   - Phone: `0942808839`
   - OTP: `123456` (từ console)
   - Password: `123456`
   - Email: `test@gmail.com`

## ✅ Đã sửa xong!

**Vấn đề chính:** 
1. Validation middleware yêu cầu `firstName` và `lastName` - ✅ Đã sửa
2. Role enum không đúng (`'user'` thay vì `'customer'`) - ✅ Đã sửa
3. Thiếu environment variables - ✅ Đã tạo hướng dẫn

**Giải pháp:** 
- Tạo validation mới `validateUserRegisterWithOTP` chỉ yêu cầu: `email`, `phone`, `password`, `otp`
- Sửa role từ `'user'` thành `'customer'` để match schema
- Thêm logging chi tiết để debug
- Tạo hướng dẫn setup .env file

## 🚨 QUAN TRỌNG: Cần tạo file .env

**Trước khi test, hãy tạo file `.env` trong thư mục `Backend_ReactSinglepage`:**

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pharmacy_db
JWT_SECRET=your-super-secret-jwt-key-here-for-development
JWT_EXPIRES_IN=7d
SESSION_SECRET=your-session-secret-key-for-development
CORS_ORIGIN=http://localhost:3000
```

**Xem chi tiết:** `SETUP_ENV_GUIDE.md`

## Lưu ý:
- OTP có thời hạn 5 phút
- Mỗi phone chỉ có 1 OTP active
- Gửi OTP mới sẽ ghi đè OTP cũ
- Trong development, OTP được log ra console
- **Sau khi tạo .env, đăng ký sẽ hoạt động bình thường!**
