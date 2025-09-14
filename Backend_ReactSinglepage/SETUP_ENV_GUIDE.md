# Hướng dẫn Setup Environment Variables

## Vấn đề
Lỗi 500 Internal Server Error có thể do thiếu environment variables.

## Giải pháp

### Bước 1: Tạo file .env
Tạo file `.env` trong thư mục `Backend_ReactSinglepage` với nội dung:

```env
# Environment Variables
NODE_ENV=development
PORT=5000

# Database - MongoDB
MONGODB_URI=mongodb://localhost:27017/pharmacy_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-for-development
JWT_EXPIRES_IN=7d

# Session
SESSION_SECRET=your-session-secret-key-for-development

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Bước 2: Khởi động MongoDB
Đảm bảo MongoDB đang chạy trên localhost:27017

### Bước 3: Khởi động backend
```bash
cd Backend_ReactSinglepage
npm run dev
```

### Bước 4: Kiểm tra console
Sẽ thấy các log:
```
Register request body: {...}
Looking for OTP for phone: 0942808839
Password hashed successfully
Creating user with data: {...}
```

## Lưu ý
- File .env phải được tạo trong thư mục Backend_ReactSinglepage
- Không commit file .env vào git
- JWT_SECRET và SESSION_SECRET có thể dùng giá trị bất kỳ cho development
