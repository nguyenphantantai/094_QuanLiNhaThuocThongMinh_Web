# Hướng dẫn Test Chức năng Đăng nhập/Đăng ký

## 🚀 Cách Test

### 1. Khởi động Backend
```bash
cd Backend_ReactSinglepage
npm run dev
```
Backend sẽ chạy trên http://localhost:5000

### 2. Khởi động Frontend
```bash
cd ReactSinglepage
npm run dev
```
Frontend sẽ chạy trên http://localhost:5173

### 3. Test Chức năng Đăng nhập/Đăng ký

#### Bước 1: Mở trang web
- Truy cập http://localhost:5173
- Click vào nút "Đăng nhập/ Đăng ký" ở góc phải header

#### Bước 2: Test với số điện thoại mới
- Nhập số điện thoại: `0987654321` (hoặc số khác chưa đăng ký)
- Click "Tiếp tục"
- Hệ thống sẽ tự động đăng ký tài khoản mới với:
  - Email: `0987654321@pharmacy.com`
  - Password: `123456`
  - Tên: `Khách Hàng`

#### Bước 3: Test với số điện thoại đã có
- Nhập số điện thoại: `0987654321` (đã đăng ký ở bước 2)
- Click "Tiếp tục"
- Hệ thống sẽ đăng nhập với tài khoản đã có

#### Bước 4: Kiểm tra trạng thái đăng nhập
- Sau khi đăng nhập thành công, header sẽ hiển thị:
  - "Xin chào, Khách" thay vì nút "Đăng nhập/ Đăng ký"
  - Nút logout (icon LogOut) để đăng xuất

### 4. Test API trực tiếp (Optional)

#### Test với curl/Postman:
```bash
# Đăng ký
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@pharmacy.com",
    "phone": "0987654321",
    "password": "123456",
    "firstName": "Test",
    "lastName": "User"
  }'

# Đăng nhập
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@pharmacy.com",
    "password": "123456"
  }'
```

## 📝 Lưu ý

1. **Format số điện thoại**: Chỉ chấp nhận số điện thoại Việt Nam bắt đầu bằng 0[3|5|7|8|9] và có 10 chữ số
2. **Password mặc định**: Tất cả tài khoản demo đều có password `123456`
3. **Token**: Sau khi đăng nhập thành công, token được lưu trong localStorage
4. **Auto-register**: Nếu số điện thoại chưa tồn tại, hệ thống sẽ tự động đăng ký tài khoản mới

## 🐛 Troubleshooting

- **Lỗi CORS**: Đảm bảo backend đang chạy trên cổng 5000
- **Lỗi validation**: Kiểm tra format số điện thoại (phải bắt đầu bằng 0[3|5|7|8|9])
- **Lỗi kết nối**: Kiểm tra cả backend và frontend đều đang chạy



