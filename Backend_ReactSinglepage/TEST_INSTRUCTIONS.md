# 🧪 Hướng dẫn Test Form Hoàn thiện Thông tin

## 🚀 Cách Test

### Bước 1: Khởi động ứng dụng
```bash
# Terminal 1 - Backend
cd Backend_ReactSinglepage
npm run dev

# Terminal 2 - Frontend
cd ReactSinglepage  
npm run dev
```

### Bước 2: Test trên Browser
1. Mở: `http://localhost:3000`
2. Click "Đăng nhập/Đăng ký"
3. Click "Đăng ký"
4. Điền thông tin:
   - **Số điện thoại:** `0942808844` (dùng số mới)
   - **Mật khẩu:** `password123`
   - **Email:** `test@example.com`
   - **OTP:** `123456` (xem console backend)

### Bước 3: Kiểm tra Kết quả

#### ✅ Nếu Form tự động hiển thị:
- Form đăng ký đóng lại
- Form "Hoàn thiện thông tin cá nhân" hiển thị
- Điền thông tin và test

#### ⚠️ Nếu Form không tự động hiển thị:
- Thông báo "Đăng ký thành công" hiển thị
- Click button "Hoàn thiện ngay" trong thông báo
- Form sẽ hiển thị

### Bước 4: Debug (nếu cần)
1. Mở Developer Tools (F12)
2. Vào tab **Console**
3. Kiểm tra các log:
   ```
   Register response: {...}
   requiresProfileCompletion: true
   Setting showCompleteProfile to true
   showCompleteProfile state changed: true
   CompleteProfileForm props: {isOpen: true, ...}
   ```

## 🔧 Troubleshooting

### Lỗi "fetch failed"
- Backend chưa chạy
- Chạy: `cd Backend_ReactSinglepage && npm run dev`

### Lỗi "OTP not found"
- Xem console backend để lấy OTP
- Hoặc dùng OTP: `123456`

### Form không hiển thị
- Kiểm tra console logs
- Click button "Hoàn thiện ngay" trong thông báo
- Restart frontend

### Lỗi database
- Kiểm tra MongoDB connection
- Xem console backend

## 📊 Kết quả Mong đợi

Sau khi hoàn thành:
- ✅ User được tạo trong database
- ✅ Thông tin cá nhân được lưu
- ✅ Token được lưu trong localStorage
- ✅ UI cập nhật với thông tin user

## 🎯 Test Cases

### Test Case 1: Đăng ký bình thường
- Số điện thoại: `0942808845`
- Kết quả: Form hoàn thiện hiển thị

### Test Case 2: Đăng ký với số đã tồn tại
- Số điện thoại: `0942808839` (đã có)
- Kết quả: Lỗi "User already exists"

### Test Case 3: OTP sai
- OTP: `000000`
- Kết quả: Lỗi "Invalid OTP"

## 📱 Test trên Mobile

1. Mở browser mobile
2. Vào `http://localhost:3000`
3. Test responsive design
4. Kiểm tra form trên mobile

---

**🎉 Form hoàn thiện thông tin đã sẵn sàng test!**
