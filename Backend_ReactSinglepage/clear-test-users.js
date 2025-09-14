import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// User Schema (simplified)
const userSchema = new mongoose.Schema({
  email: String,
  phone: String,
  firstName: String,
  lastName: String,
  password: String,
  role: String,
  isActive: Boolean,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function clearTestUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find and delete test users
    const testEmails = [
      'tai43464@gmail.com',
      'test@example.com',
      'testuser@example.com',
      'demo@example.com'
    ];

    const testPhones = [
      '0942808839',
      '0942808840',
      '0942808841',
      '0942808842',
      '0942808843',
      '0942808844',
      '0942808845',
      '0942808846'
    ];

    // Delete by email
    for (const email of testEmails) {
      const result = await User.deleteMany({ email });
      if (result.deletedCount > 0) {
        console.log(`🗑️ Deleted user with email: ${email}`);
      }
    }

    // Delete by phone
    for (const phone of testPhones) {
      const result = await User.deleteMany({ phone });
      if (result.deletedCount > 0) {
        console.log(`🗑️ Deleted user with phone: ${phone}`);
      }
    }

    // Show remaining users
    const remainingUsers = await User.find({}, 'email phone firstName lastName');
    console.log('\n📋 Remaining users:');
    remainingUsers.forEach(user => {
      console.log(`- ${user.email} | ${user.phone} | ${user.firstName} ${user.lastName}`);
    });

    console.log('\n🎉 Cleanup completed!');
    console.log('💡 Now you can register with any of the cleared emails/phones');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run cleanup
clearTestUsers();
