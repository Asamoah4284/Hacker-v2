// API Configuration
const API_BASE_URL = 'https://backend-v2-ajyu.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/public/products`,
  ARTISANS: `${API_BASE_URL}/public/artisans`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  DASHBOARD: `${API_BASE_URL}/app/dashboard`,
  ORDERS: `${API_BASE_URL}/app/orders`,
  USERS: `${API_BASE_URL}/public/users`,
};

// API Functions
export const apiService = {
  // fetch all orders

  async getOrders(userId) {
    try {
      const response = await fetch(`${API_ENDPOINTS.ORDERS}?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching orders: ', error);
      throw error;
    }
  },

  // Fetch all products
  async getProducts() {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Fetch products with pagination
  async getProductsWithPagination(page = 1, limit = 10) {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.PRODUCTS}?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products with pagination:', error);
      throw error;
    }
  },

  // Fetch all users
  async getUsers() {
    try {
      const response = await fetch(API_ENDPOINTS.USERS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Fetch all artisans
  async getArtisans() {
    try {
      const response = await fetch(API_ENDPOINTS.ARTISANS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching artisans:', error);
      throw error;
    }
  },

  // Fetch artisans with pagination
  async getArtisansWithPagination(page = 1, limit = 10) {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.ARTISANS}?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching artisans with pagination:', error);
      throw error;
    }
  },

  // Fetch a single artisan by ID
  async getArtisanById(id) {
    try {
      const response = await fetch(`${API_ENDPOINTS.ARTISANS}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching artisan by ID:', error);
      throw error;
    }
  },

  // Login user
  async login(email, password) {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // Register user
  async register(userData) {
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Signup Error Data:', errorData);
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log('Signup Response:', data);
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },

  // Fetch dashboard data
  async getDashboardData(token) {
    try {
      const response = await fetch(API_ENDPOINTS.DASHBOARD, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  // Create referral link
  async createReferralLink(token, refereeEmail, artisanId) {
    try {
      console.log('Creating referral link with:', { refereeEmail, artisanId });
      
      const response = await fetch(API_ENDPOINTS.REFERRALS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          refereeEmail,
          artisanId,
        }),
      });

      console.log('Referral API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Referral API error response:', errorData);
        throw new Error(
          `Referral creation failed: ${response.status} - ${errorData}`
        );
      }

      const data = await response.json();
      console.log('Referral created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating referral link:', error);
      throw error;
    }
  },
};

export default apiService;
