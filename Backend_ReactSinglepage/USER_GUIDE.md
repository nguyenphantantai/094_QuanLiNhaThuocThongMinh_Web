# Hướng dẫn sử dụng Flow Đăng ký và Hoàn thiện Thông tin

## 🎯 Tổng quan

Sau khi đăng ký thành công, hệ thống sẽ tự động hiển thị form hoàn thiện thông tin cá nhân để người dùng điền thêm các thông tin cần thiết.

## 📋 Flow hoạt động

### Bước 1: Đăng ký tài khoản
1. Mở website và click "Đăng ký"
2. Điền thông tin:
   - **Số điện thoại** (bắt buộc)
   - **Mật khẩu** (bắt buộc)
   - **Nhập lại mật khẩu** (bắt buộc)
   - **Email** (bắt buộc)
3. Click "Gửi OTP" để nhận mã xác thực
4. Nhập mã OTP 6 chữ số
5. Click "Đăng Ký Ngay"

### Bước 2: Hoàn thiện thông tin cá nhân
Sau khi đăng ký thành công, form thông tin cá nhân sẽ tự động hiển thị:

#### Thông tin bắt buộc:
- **Họ và tên** ⭐
- **Giới tính** ⭐ (Nam/Nữ/Khác)

#### Thông tin tùy chọn:
- **Ảnh đại diện** (upload file hình ảnh, tối đa 5MB)
- **Tên đệm**
- **Ngày sinh** (chọn từ calendar)
- **Địa chỉ**

### Bước 3: Hoàn tất
- Click "Hoàn thiện thông tin" để lưu
- Hoặc click "Bỏ qua và hoàn thiện sau" để bỏ qua

## 🎨 Giao diện Form

### Form Đăng ký
```
┌─────────────────────────────────────┐
│  🏥 NhaThuocAI    🌐 Việt Nam - Tiếng việt  │
├─────────────────────────────────────┤
│  Đăng ký                            │
│                                     │
│  Số điện thoại *                    │
│  [________________]                 │
│                                     │
│  Mật khẩu *                         │
│  [________________] 👁️              │
│                                     │
│  Nhập lại mật khẩu *                │
│  [________________] 👁️              │
│                                     │
│  E-mail *                           │
│  [________________]                 │
│                                     │
│  Mã xác thực *                      │
│  [________] [Gửi OTP]               │
│                                     │
│  [    Đăng Ký Ngay    ]            │
└─────────────────────────────────────┘
```

### Form Hoàn thiện Thông tin
```
┌─────────────────────────────────────┐
│  🏥 NhaThuocAI    🌐 Việt Nam - Tiếng việt  │
├─────────────────────────────────────┤
│  Hoàn thiện thông tin cá nhân       │
│                                     │
│  Ảnh đại diện                       │
│  [👤] [Chọn ảnh]                    │
│                                     │
│  Họ và tên *                        │
│  [________________]                 │
│                                     │
│  Tên đệm (tùy chọn)                 │
│  [________________]                 │
│                                     │
│  📅 Ngày sinh                       │
│  [____-__-__]                       │
│                                     │
│  Giới tính *                        │
│  [Nam] [Nữ] [Khác]                  │
│                                     │
│  📍 Địa chỉ                         │
│  [________________]                 │
│                                     │
│  [  Hoàn thiện thông tin  ]         │
│                                     │
│  Bỏ qua và hoàn thiện sau           │
└─────────────────────────────────────┘
```

## 🔧 Cách test

### 1. Khởi động ứng dụng
```bash
# Terminal 1 - Backend
cd Backend_ReactSinglepage
npm run dev

# Terminal 2 - Frontend  
cd ReactSinglepage
npm run dev
```

### 2. Test thủ công
1. Mở browser: `http://localhost:3000`
2. Click "Đăng nhập/Đăng ký"
3. Click "Đăng ký"
4. Điền thông tin và test flow

### 3. Test tự động
```bash
cd Backend_ReactSinglepage
node test-register-flow.js
```

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String,           // Email đăng ký
  phone: String,           // Số điện thoại
  password: String,        // Mật khẩu đã hash
  firstName: String,       // Tên (từ form hoàn thiện)
  lastName: String,        // Họ (từ form hoàn thiện)
  dateOfBirth: Date,       // Ngày sinh (tùy chọn)
  gender: String,          // Giới tính (male/female/other)
  address: String,         // Địa chỉ (tùy chọn)
  avatar: String,          // Đường dẫn ảnh đại diện
  isActive: Boolean,       // Trạng thái tài khoản
  isVerified: Boolean,     // Đã xác thực OTP
  role: String,            // Vai trò (customer/admin/pharmacist)
  createdAt: Date,         // Ngày tạo
  updatedAt: Date          // Ngày cập nhật
}
```

## 🚨 Lưu ý quan trọng

1. **OTP**: Mã OTP sẽ được hiển thị trong console của backend (chỉ trong môi trường development)
2. **Avatar**: Hiện tại chỉ lưu filename, trong production cần upload lên cloud storage
3. **Validation**: Tất cả validation được thực hiện ở cả frontend và backend
4. **Security**: JWT token được sử dụng để xác thực các request

## 🎯 Kết quả mong đợi

Sau khi hoàn thành flow:
- ✅ User được tạo trong database với thông tin đầy đủ
- ✅ Token được lưu trong localStorage
- ✅ Form đăng ký đóng lại
- ✅ Form hoàn thiện thông tin hiển thị
- ✅ Sau khi hoàn thiện, user có thể sử dụng đầy đủ tính năng

## 🐛 Troubleshooting

### Lỗi thường gặp:
1. **"OTP not found"**: Kiểm tra console backend để lấy OTP
2. **"User already exists"**: Sử dụng số điện thoại khác
3. **"Invalid OTP"**: Nhập đúng mã OTP 6 chữ số
4. **"Token expired"**: Đăng nhập lại

### Debug:
- Kiểm tra console browser (F12)
- Kiểm tra console backend
- Kiểm tra Network tab để xem API calls
