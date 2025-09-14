# Hướng dẫn Setup Firebase Authentication

## 🔥 Bước 1: Tạo Firebase Project

1. **Truy cập Firebase Console**: https://console.firebase.google.com/
2. **Tạo project mới**:
   - Click "Create a project"
   - Nhập tên project: `pharmacy-management`
   - Bật Google Analytics (tùy chọn)
   - Click "Create project"

## 📱 Bước 2: Enable Authentication

1. **Vào Authentication**:
   - Trong Firebase Console, click "Authentication"
   - Click "Get started"

2. **Enable Sign-in methods**:
   - Click tab "Sign-in method"
   - **Phone**: Click "Phone" → Enable → Save
   - **Google**: Click "Google" → Enable → Chọn project support email → Save

## 🔑 Bước 3: Lấy Firebase Config

1. **Vào Project Settings**:
   - Click biểu tượng ⚙️ → "Project settings"
   - Scroll xuống "Your apps"
   - Click "Web app" (biểu tượng `</>`)

2. **Tạo Web App**:
   - App nickname: `pharmacy-web`
   - Bật "Firebase Hosting" (tùy chọn)
   - Click "Register app"

3. **Copy Firebase Config**:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "pharmacy-management.firebaseapp.com",
     projectId: "pharmacy-management",
     storageBucket: "pharmacy-management.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdefghijklmnop"
   };
   ```

## 🔐 Bước 4: Lấy Service Account Key

1. **Vào Project Settings** → "Service accounts"
2. **Click "Generate new private key"**
3. **Download file JSON** (lưu an toàn, không commit vào git)

## 📋 Bước 5: Cập nhật .env

Thêm vào file `.env`:

```env
# Firebase Configuration
FIREBASE_API_KEY=AIzaSyAtt4SY7yetaYGJwJ64L2RALB2UNYpe_2o
FIREBASE_AUTH_DOMAIN=quanlinhathuocai.firebaseapp.com
FIREBASE_PROJECT_ID=quanlinhathuocai
FIREBASE_STORAGE_BUCKET=quanlinhathuocai.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=125708758953
FIREBASE_APP_ID=1:125708758953:web:afb3ded63c4e6ddf035eb8

# Firebase Service Account (path to JSON file)
FIREBASE_SERVICE_ACCOUNT_KEY=./firebase-service-account.json

# Firebase Admin SDK (alternative to service account)
FIREBASE_ADMIN_PROJECT_ID=pharmacy-management
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@pharmacy-management.iam.gserviceaccount.com
```

## 🛠️ Bước 6: Cài đặt Dependencies

### Backend (Node.js)
```bash
npm install firebase-admin
```

### Frontend (React)
```bash
npm install firebase
```

## 🔧 Bước 7: Cấu hình Firebase Rules

1. **Vào Firebase Console** → "Firestore Database"
2. **Click "Create database"**
3. **Chọn "Start in test mode"** (cho development)
4. **Chọn location** (asia-southeast1 cho Việt Nam)

## 📱 Bước 8: Test Configuration

1. **Backend**: Khởi động server và test Firebase Admin SDK
2. **Frontend**: Test Firebase Auth với phone và Google sign-in
3. **Console**: Kiểm tra logs trong Firebase Console

## 🚨 Lưu ý Bảo mật

1. **Không commit** file `firebase-service-account.json` vào git
2. **Thêm vào .gitignore**:
   ```
   firebase-service-account.json
   .env
   ```
3. **Sử dụng environment variables** cho production
4. **Cấu hình Firebase Rules** cho production

## 🔍 Troubleshooting

### Lỗi "Firebase App not initialized":
- Kiểm tra Firebase config trong .env
- Đảm bảo đã import Firebase đúng cách

### Lỗi "Invalid phone number":
- Kiểm tra format số điện thoại (+84...)
- Đảm bảo đã enable Phone authentication

### Lỗi "Google sign-in failed":
- Kiểm tra Google OAuth configuration
- Đảm bảo domain được whitelist

## 📚 Tài liệu tham khảo

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Phone Authentication](https://firebase.google.com/docs/auth/web/phone-auth)
- [Google Sign-in](https://firebase.google.com/docs/auth/web/google-signin)
