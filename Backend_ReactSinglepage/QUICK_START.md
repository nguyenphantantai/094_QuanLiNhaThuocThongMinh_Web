# 🚀 Hướng dẫn Test Flow Đăng ký và Hoàn thiện Profile

## ✅ Đã hoàn thành

Tôi đã tạo sẵn **form hoàn thiện thông tin cá nhân** với đầy đủ các trường bạn yêu cầu:

### 📋 Form bao gồm:
- **Họ và tên** (bắt buộc) ⭐
- **Ngày tháng năm sinh** (tùy chọn) 📅
- **Giới tính** (bắt buộc) ⭐ - Nam/Nữ/Khác
- **Ảnh đại diện** (tùy chọn) 📸
- **Tên đệm** (tùy chọn)
- **Địa chỉ** (tùy chọn) 📍

## 🎯 Flow hoạt động

1. **Đăng ký** → Điền thông tin cơ bản (SĐT, mật khẩu, email, OTP)
2. **Tự động hiển thị form thông tin cá nhân** → Điền họ tên, ngày sinh, giới tính
3. **Cập nhật database** → Thông tin được lưu vào MongoDB
4. **Hoàn tất** → Người dùng có thể sử dụng đầy đủ tính năng

## 🧪 Cách test

### Bước 1: Khởi động Backend
```bash
cd Backend_ReactSinglepage
npm run dev
```

### Bước 2: Khởi động Frontend
```bash
cd ReactSinglepage
npm run dev
```

### Bước 3: Test trên Browser
1. Mở: `http://localhost:3000`
2. Click "Đăng nhập/Đăng ký"
3. Click "Đăng ký"
4. Điền thông tin:
   - Số điện thoại: `0942808842`
   - Mật khẩu: `password123`
   - Email: `test@example.com`
   - OTP: `123456` (xem console backend)
5. Click "Đăng Ký Ngay"
6. **Form thông tin cá nhân sẽ tự động hiển thị**
7. Điền thông tin và click "Hoàn thiện thông tin"

## 📁 Files đã tạo/cập nhật

### Backend:
- ✅ `src/controllers/authController.ts` - Logic xử lý
- ✅ `src/models/schema.ts` - Thêm field avatar
- ✅ `src/routes/authRoutes.ts` - Route complete-profile

### Frontend:
- ✅ `client/src/components/complete-profile-form.tsx` - **Form mới**
- ✅ `client/src/components/register-form.tsx` - Cập nhật flow

### Test & Docs:
- ✅ `test-register-flow.js` - Test script
- ✅ `demo-flow.js` - Demo script
- ✅ `USER_GUIDE.md` - Hướng dẫn chi tiết

## 🎨 Giao diện Form

Form thông tin cá nhân có giao diện đẹp với:
- Header giống form đăng ký
- Upload ảnh đại diện với preview
- Input fields với validation
- Buttons giới tính (Nam/Nữ/Khác)
- Date picker cho ngày sinh
- Tùy chọn bỏ qua

## 🔧 API Endpoints

### POST `/api/auth/complete-profile`
```javascript
// Headers
Authorization: Bearer <token>
Content-Type: multipart/form-data

// Body (FormData)
firstName: "Nguyễn Văn"
lastName: "Test"
dateOfBirth: "1990-01-01"
gender: "male"
address: "123 Đường Test"
avatar: File (optional)
```

## 🎉 Kết quả

Sau khi hoàn thành:
- ✅ User được tạo với thông tin đầy đủ
- ✅ Dữ liệu lưu vào MongoDB
- ✅ Token được lưu trong localStorage
- ✅ UI cập nhật với thông tin user

## 🐛 Nếu có lỗi

1. **Backend không chạy**: Kiểm tra port 5000
2. **OTP không nhận được**: Xem console backend
3. **Form không hiển thị**: Kiểm tra browser console
4. **Database lỗi**: Kiểm tra MongoDB connection

---

**🎯 Form thông tin cá nhân đã sẵn sàng sử dụng!**
