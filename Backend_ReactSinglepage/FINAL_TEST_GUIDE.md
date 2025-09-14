# 🎯 Hướng dẫn Test Flow Hoàn chỉnh

## ✅ Đã hoàn thành

### 1. **Form Garena Style** 
- ✅ Nền xanh lá như yêu cầu
- ✅ Layout 2 cột giống Garena
- ✅ Các trường: Họ và tên, Năm sinh, Ngày sinh, Địa chỉ nhà, Email, Số điện thoại
- ✅ Email và Số điện thoại hiển thị từ thông tin đăng ký

### 2. **Hiển thị tên khách hàng**
- ✅ Header hiển thị "Xin chào, [Họ tên]" sau khi hoàn thiện thông tin
- ✅ Thay thế "Đăng nhập/Đăng ký" bằng tên user

### 3. **Sửa lỗi form không hiển thị**
- ✅ Form tự động hiển thị sau đăng ký
- ✅ Sử dụng setTimeout để đảm bảo timing đúng

## 🧪 Cách Test

### Bước 1: Khởi động
```bash
# Terminal 1 - Backend
cd Backend_ReactSinglepage
npm run dev

# Terminal 2 - Frontend
cd ReactSinglepage
npm run dev
```

### Bước 2: Test Flow
1. **Mở browser:** `http://localhost:3000`
2. **Đăng ký:**
   - Click "Đăng nhập/Đăng ký"
   - Click "Đăng ký"
   - Điền thông tin:
     - Số điện thoại: `0942808846` (số mới)
     - Mật khẩu: `password123`
     - Email: `test@example.com`
     - OTP: `123456` (xem console backend)
   - Click "Đăng Ký Ngay"

3. **Form Garena Style hiển thị:**
   - Form với nền xanh lá
   - Layout 2 cột
   - Điền thông tin:
     - Họ và tên: `Nguyễn Văn Test`
     - Năm sinh: `1990`
     - Ngày sinh: `15/03`
     - Địa chỉ nhà: `123 Đường Test, Quận 1, TP.HCM`
   - Click "Lưu thông tin"

4. **Kiểm tra kết quả:**
   - Header hiển thị: "Xin chào, Nguyễn Văn Test"
   - Thay thế "Đăng nhập/Đăng ký"
   - Thông tin được lưu vào database

## 🎨 Giao diện Form

```
┌─────────────────────────────────────────┐
│  🟢 Thông tin cá nhân              [Lưu] │
├─────────────────────────────────────────┤
│  👤 Họ và tên:     [Nguyễn Văn Test    ] │
│  📅 Năm sinh:      [1990              ] │
│  📅 Ngày sinh:     [15/03             ] │
│  📍 Địa chỉ nhà:   [123 Đường Test... ] │
│  📧 Email:         [test@example.com  ] │
│  📱 Số điện thoại: [0942808846        ] │
│                                     │
│                    [Hủy] [Lưu thông tin] │
└─────────────────────────────────────────┘
```

## 🔧 Debug

### Nếu form không hiển thị:
1. Mở F12 → Console
2. Kiểm tra logs:
   ```
   Register response: {...}
   requiresProfileCompletion: true
   Setting showCompleteProfile to true
   GarenaStyleProfileForm props: {isOpen: true, ...}
   ```

### Nếu tên không hiển thị:
1. Kiểm tra localStorage:
   ```javascript
   console.log(JSON.parse(localStorage.getItem('user')));
   ```
2. Kiểm tra firstName và lastName có đúng không

## 📊 Database Schema

User sau khi hoàn thiện:
```javascript
{
  _id: ObjectId,
  email: "test@example.com",
  phone: "0942808846",
  firstName: "Nguyễn Văn",
  lastName: "Test",
  dateOfBirth: "1990-03-15T00:00:00.000Z",
  address: "123 Đường Test, Quận 1, TP.HCM",
  gender: "other",
  isActive: true,
  isVerified: true,
  role: "customer",
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Kết quả Mong đợi

### Trước khi hoàn thiện:
- Header: "Đăng nhập/Đăng ký"
- User: `{firstName: "Khách", lastName: "Hàng"}`

### Sau khi hoàn thiện:
- Header: "Xin chào, Nguyễn Văn Test"
- User: `{firstName: "Nguyễn Văn", lastName: "Test", address: "...", dateOfBirth: "..."}`

## 🚨 Lưu ý

1. **OTP:** Xem console backend để lấy OTP
2. **Số điện thoại:** Dùng số mới mỗi lần test
3. **Form validation:** Tất cả trường bắt buộc phải điền
4. **Database:** Thông tin được lưu vào MongoDB

## 🎉 Hoàn thành!

Flow đã hoạt động đúng:
- ✅ Form Garena style với nền xanh lá
- ✅ Hiển thị tên khách hàng trong header
- ✅ Tự động hiển thị form sau đăng ký
- ✅ Lưu thông tin vào database
