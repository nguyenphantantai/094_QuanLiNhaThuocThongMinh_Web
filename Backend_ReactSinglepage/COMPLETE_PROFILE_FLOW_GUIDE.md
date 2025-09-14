# Hướng dẫn Flow Hoàn thiện Thông tin Cá nhân

## Tổng quan

Sau khi đăng ký thành công, người dùng sẽ được yêu cầu hoàn thiện thông tin cá nhân thông qua một form riêng biệt. Flow này giúp tăng trải nghiệm người dùng và thu thập thông tin cần thiết.

## Flow hoạt động

### 1. Đăng ký ban đầu
- Người dùng nhập: số điện thoại, mật khẩu, email, OTP
- Hệ thống tạo user tạm thời với thông tin cơ bản:
  - `firstName`: "Khách"
  - `lastName`: "Hàng"
  - `isVerified`: true (sau khi xác thực OTP)
  - Các trường khác để trống

### 2. Yêu cầu hoàn thiện profile
- Response từ `/api/auth/register` sẽ bao gồm:
  ```json
  {
    "success": true,
    "message": "Đăng ký thành công! Vui lòng hoàn thiện thông tin cá nhân.",
    "data": {
      "user": { ... },
      "token": "...",
      "requiresProfileCompletion": true
    }
  }
  ```

### 3. Form hoàn thiện profile
- Hiển thị form với các trường:
  - **Ảnh đại diện** (tùy chọn)
  - **Họ và tên** (bắt buộc)
  - **Tên đệm** (tùy chọn)
  - **Ngày sinh** (tùy chọn)
  - **Giới tính** (bắt buộc)
  - **Địa chỉ** (tùy chọn)

### 4. API Endpoints

#### POST `/api/auth/complete-profile`
**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body (FormData):**
```
firstName: string (required)
lastName: string (optional)
dateOfBirth: string (optional, format: YYYY-MM-DD)
gender: string (required, values: 'male', 'female', 'other')
address: string (optional)
avatar: File (optional, max 5MB, image only)
```

**Response:**
```json
{
  "success": true,
  "message": "Hoàn thiện thông tin cá nhân thành công!",
  "data": {
    "user": {
      "id": "...",
      "email": "...",
      "phone": "...",
      "firstName": "...",
      "lastName": "...",
      "dateOfBirth": "...",
      "gender": "...",
      "address": "...",
      "avatar": "...",
      "role": "customer",
      "isVerified": true
    }
  }
}
```

## Frontend Components

### 1. RegisterForm
- Được cập nhật để xử lý `requiresProfileCompletion`
- Tự động hiển thị CompleteProfileForm sau đăng ký thành công

### 2. CompleteProfileForm
- Component mới để hoàn thiện thông tin cá nhân
- Hỗ trợ upload ảnh đại diện
- Validation form đầy đủ
- Tùy chọn bỏ qua và hoàn thiện sau

## Testing

### Chạy test flow hoàn chỉnh:
```bash
node test-complete-profile-flow.js
```

### Test thủ công:
1. Đăng ký với số điện thoại mới
2. Kiểm tra response có `requiresProfileCompletion: true`
3. Hoàn thiện profile với thông tin đầy đủ
4. Kiểm tra profile đã được cập nhật

## Lưu ý

1. **Avatar upload**: Hiện tại chỉ lưu filename, trong production cần upload lên cloud storage
2. **Validation**: Tất cả validation được thực hiện ở cả frontend và backend
3. **Error handling**: Xử lý lỗi đầy đủ cho tất cả các trường hợp
4. **UX**: Người dùng có thể bỏ qua và hoàn thiện sau

## Database Schema

User schema đã được cập nhật với field `avatar`:
```typescript
export interface IUser extends Document {
  // ... existing fields
  avatar?: string;
  // ... other fields
}
```

## Security

- Tất cả endpoints yêu cầu authentication
- File upload có giới hạn kích thước và loại file
- Validation input đầy đủ
- JWT token được sử dụng để xác thực
