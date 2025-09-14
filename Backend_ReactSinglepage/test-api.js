// Test API endpoints
const API_BASE = 'http://localhost:5000';

async function testAPI() {
  console.log('Testing API endpoints...');
  
  // Test health endpoint
  try {
    const healthResponse = await fetch(`${API_BASE}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
  } catch (error) {
    console.error('❌ Health check failed:', error);
  }

  // Test products endpoint
  try {
    const productsResponse = await fetch(`${API_BASE}/api/products/hot`);
    const productsData = await productsResponse.json();
    console.log('✅ Hot products:', productsData);
  } catch (error) {
    console.error('❌ Hot products failed:', error);
  }

  // Test register endpoint
  try {
    const registerResponse = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@pharmacy.com',
        phone: '0987654321',
        password: '123456',
        firstName: 'Test',
        lastName: 'User',
      }),
    });
    const registerData = await registerResponse.json();
    console.log('✅ Register:', registerData);
  } catch (error) {
    console.error('❌ Register failed:', error);
  }

  // Test login endpoint
  try {
    const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@pharmacy.com',
        password: '123456',
      }),
    });
    const loginData = await loginResponse.json();
    console.log('✅ Login:', loginData);
  } catch (error) {
    console.error('❌ Login failed:', error);
  }
}

// Run tests
testAPI();
