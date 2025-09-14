# Hướng dẫn Test Đăng nhập/Đăng ký NhaThuocAI

## Tổng quan
Đã tạo thành công hệ thống đăng nhập/đăng ký với thương hiệu NhaThuocAI với các tính năng:

### ✅ Đã hoàn thành:
1. **Form đăng nhập** giống hình 1:
   - Input cho username/email/phone và password
   - Validation với thông báo lỗi màu đỏ
   - Nút "Đăng Nhập Ngay" màu xanh lá
   - Nút "Create new account" để chuyển sang đăng ký
   - Link "Quên mật khẩu?"

2. **Form đăng ký** giống hình 2 với thay đổi:
   - **Số điện thoại** thay vì "Tên truy cập"
   - Password và nhập lại password
   - Email với validation
   - **Trường nhập mã OTP** thay vì dropdown quốc gia
   - **Xác thực OTP** tích hợp trực tiếp trong form đăng ký

3. **Xác thực OTP**:
   - Gửi OTP qua SMS/Zalo
   - Nhập mã 6 chữ số
   - Countdown timer
   - Tích hợp với backend

4. **Backend API**:
   - `/api/auth/login` - Đăng nhập bằng email/phone
   - `/api/auth/register` - Đăng ký với OTP verification
   - `/api/auth/send-otp` - Gửi OTP
   - `/api/auth/verify-otp` - Xác thực OTP

## Cách test:

### 1. Khởi động Backend:
```bash
cd Backend_ReactSinglepage
npm install
npm run dev
```

### 2. Khởi động Frontend:
```bash
cd ReactSinglepage
npm install
npm run dev
```

### 3. Test đăng ký:
1. Click nút "Đăng nhập/Đăng ký" trên header
2. Click "Create new account"
3. Điền thông tin:
   - Số điện thoại: `0942808839`
   - Mật khẩu: `123456`
   - Nhập lại mật khẩu: `123456`
   - Email: `test@gmail.com`
4. Click nút "Gửi OTP" để nhận mã xác thực
5. Nhập mã OTP 6 chữ số (sẽ hiển thị trong console backend)
6. Click "Đăng Ký Ngay" để hoàn tất đăng ký

### 4. Test đăng nhập:
1. Click nút "Đăng nhập/Đăng ký"
2. Điền thông tin:
   - Username: `test@gmail.com` hoặc `0942808839`
   - Password: `123456`
3. Click "Đăng Nhập Ngay"

## Tính năng đặc biệt:

### 🎨 UI/UX với thương hiệu NhaThuocAI:
- Logo NhaThuocAI với chữ N màu xanh lá
- Màu xanh lá chủ đạo cho buttons và focus states
- Layout trung tâm với background xám
- Language selector "Việt Nam - Tiếng việt"
- Terms và Privacy Policy links

### 🔐 Bảo mật:
- OTP verification bắt buộc cho đăng ký (tích hợp trực tiếp trong form)
- Password hashing với bcrypt
- JWT token authentication
- Input validation và sanitization
- Countdown timer cho việc gửi lại OTP

### 📱 Responsive:
- Tương thích mobile và desktop
- Form validation real-time
- Error messages rõ ràng

## Files đã tạo/cập nhật:

### Frontend:
- `client/src/components/login-form.tsx` - Form đăng nhập
- `client/src/components/register-form.tsx` - Form đăng ký
- `client/src/components/garena-auth-dialog.tsx` - Dialog chính
- `client/src/components/otp-verification-dialog.tsx` - Xác thực OTP (đã cập nhật)
- `client/src/components/header.tsx` - Header (đã cập nhật)

### Backend:
- `src/controllers/authController.ts` - Controller (đã cập nhật)

## Lưu ý:
- OTP sẽ được log ra console trong development mode
- Backend sử dụng in-memory storage cho OTP (trong production nên dùng Redis)
- Form validation hoạt động real-time
- Tất cả API calls đều có error handling
