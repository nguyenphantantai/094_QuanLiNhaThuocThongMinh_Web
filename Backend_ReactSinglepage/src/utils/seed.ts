import { connectDB } from '../config/database.js';
import { Category, Product, User } from '../models/schema.js';
import bcrypt from 'bcryptjs';

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log('🗑️ Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Thuốc',
        icon: 'Pill',
        slug: 'thuoc',
        description: 'Các loại thuốc kê đơn và không kê đơn',
      },
      {
        name: 'Thực phẩm bảo vệ sức khỏe',
        icon: 'Sparkles',
        slug: 'thuc-pham-bao-ve-suc-khoe',
        description: 'Vitamin, khoáng chất và thực phẩm chức năng',
      },
      {
        name: 'Chăm sóc cá nhân',
        icon: 'Heart',
        slug: 'cham-soc-ca-nhan',
        description: 'Sản phẩm chăm sóc sức khỏe cá nhân',
      },
      {
        name: 'Chăm sóc sắc đẹp',
        icon: 'Sparkles',
        slug: 'cham-soc-sac-dep',
        description: 'Mỹ phẩm và sản phẩm làm đẹp',
      },
      {
        name: 'Thiết bị y tế',
        icon: 'Syringe',
        slug: 'thiet-bi-y-te',
        description: 'Các thiết bị y tế và dụng cụ chăm sóc sức khỏe',
      },
    ]);

    console.log('📂 Created categories');

    // Create sample products
    const products = await Product.insertMany([
      {
        name: 'Paracetamol 500mg',
        description: 'Thuốc giảm đau, hạ sốt hiệu quả',
        price: 25000,
        originalPrice: 30000,
        discountPercentage: 17,
        imageUrl: 'https://via.placeholder.com/300x300?text=Paracetamol',
        categoryId: categories[0]._id,
        brand: 'Traphaco',
        unit: 'Hộp 10 viên',
        inStock: true,
        stockQuantity: 100,
        isHot: true,
        isNew: false,
        isPrescription: false,
      },
      {
        name: 'Vitamin C 1000mg',
        description: 'Tăng cường sức đề kháng, chống oxy hóa',
        price: 150000,
        originalPrice: 180000,
        discountPercentage: 17,
        imageUrl: 'https://via.placeholder.com/300x300?text=Vitamin+C',
        categoryId: categories[1]._id,
        brand: 'Nature Made',
        unit: 'Hộp 100 viên',
        inStock: true,
        stockQuantity: 50,
        isHot: true,
        isNew: true,
        isPrescription: false,
      },
      {
        name: 'Kem chống nắng SPF 50+',
        description: 'Bảo vệ da khỏi tia UV, chống lão hóa',
        price: 350000,
        originalPrice: 400000,
        discountPercentage: 13,
        imageUrl: 'https://via.placeholder.com/300x300?text=Sunscreen',
        categoryId: categories[3]._id,
        brand: 'La Roche-Posay',
        unit: 'Tuýp 50ml',
        inStock: true,
        stockQuantity: 30,
        isHot: false,
        isNew: true,
        isPrescription: false,
      },
      {
        name: 'Nhiệt kế điện tử',
        description: 'Đo nhiệt độ cơ thể chính xác, dễ sử dụng',
        price: 120000,
        originalPrice: 150000,
        discountPercentage: 20,
        imageUrl: 'https://via.placeholder.com/300x300?text=Thermometer',
        categoryId: categories[4]._id,
        brand: 'Omron',
        unit: 'Cái',
        inStock: true,
        stockQuantity: 25,
        isHot: false,
        isNew: false,
        isPrescription: false,
      },
      {
        name: 'Probiotics cho trẻ em',
        description: 'Hỗ trợ tiêu hóa, tăng cường miễn dịch',
        price: 280000,
        originalPrice: 320000,
        discountPercentage: 13,
        imageUrl: 'https://via.placeholder.com/300x300?text=Probiotics',
        categoryId: categories[1]._id,
        brand: 'BioGaia',
        unit: 'Hộp 30 gói',
        inStock: true,
        stockQuantity: 40,
        isHot: true,
        isNew: false,
        isPrescription: false,
      },
    ]);

    console.log('💊 Created products');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = await User.create({
      email: 'admin@pharmacy.com',
      phone: '0123456789',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Pharmacy',
      role: 'admin',
      isVerified: true,
    });

    // Create sample customer
    const customerPassword = await bcrypt.hash('customer123', 12);
    const customer = await User.create({
      email: 'customer@example.com',
      phone: '0987654321',
      password: customerPassword,
      firstName: 'Nguyễn',
      lastName: 'Văn A',
      role: 'customer',
      isVerified: true,
    });

    console.log('👥 Created users');

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📋 Sample data created:');
    console.log(`- ${categories.length} categories`);
    console.log(`- ${products.length} products`);
    console.log(`- 2 users (admin & customer)`);
    console.log('\n🔑 Login credentials:');
    console.log('Admin: admin@pharmacy.com / admin123');
    console.log('Customer: customer@example.com / customer123');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

seedData();



