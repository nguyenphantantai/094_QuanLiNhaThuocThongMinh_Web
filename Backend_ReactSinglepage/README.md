# Backend Pharmacy Management System

A comprehensive backend API for managing pharmacy operations including products, categories, users, orders, and prescriptions.

## Features

- 🔐 **Authentication & Authorization**: JWT-based authentication with role-based access control
- 📦 **Product Management**: CRUD operations for products with categories, inventory tracking
- 👥 **User Management**: User registration, login, profile management
- 🛒 **Order Management**: Order processing, status tracking, payment handling
- 📋 **Prescription Management**: Prescription upload and verification
- ⭐ **Review System**: Product reviews and ratings
- 🔍 **Search & Filtering**: Advanced product search with multiple filters
- 📊 **Analytics**: Sales reports and inventory management
- 🛡️ **Security**: Rate limiting, input validation, CORS protection

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **Validation**: Zod schemas
- **Security**: Helmet, CORS, Rate limiting
- **File Upload**: Cloudinary integration
- **Email**: Nodemailer

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local hoặc MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Backend_ReactSinglepage
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp env.example .env
```

4. Configure your `.env` file with your database credentials and other settings

5. Set up the database
```bash
# Tạo dữ liệu mẫu
npm run db:seed
```

6. Start the development server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES_IN` | JWT expiration time | No (default: 7d) |
| `SESSION_SECRET` | Session secret | Yes |
| `CORS_ORIGIN` | CORS allowed origin | No (default: http://localhost:3000) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | No |
| `CLOUDINARY_API_KEY` | Cloudinary API key | No |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | No |
| `SMTP_HOST` | SMTP host for emails | No |
| `SMTP_PORT` | SMTP port | No |
| `SMTP_USER` | SMTP username | No |
| `SMTP_PASS` | SMTP password | No |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with pagination and filters)
- `GET /api/products/hot` - Get hot products
- `GET /api/products/new` - Get new products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

## Database Schema

The database includes the following main collections:
- `users` - User accounts and profiles
- `products` - Product catalog
- `categories` - Product categories
- `orders` - Customer orders
- `orderitems` - Order line items
- `carts` - Shopping cart items
- `prescriptions` - Prescription uploads
- `reviews` - Product reviews

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:seed` - Seed database with sample data

## Security Features

- JWT-based authentication
- Role-based access control (Customer, Pharmacist, Admin)
- Rate limiting on all endpoints
- Input validation with Zod schemas
- CORS protection
- Helmet security headers
- Password hashing with bcrypt

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

