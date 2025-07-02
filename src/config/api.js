// API Configuration
const API_BASE_URL = 'https://citsa-hackathon-2.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/public/products`,
  ARTISANS: `${API_BASE_URL}/public/artisans`,
  LOGIN: `${API_BASE_URL}/auth/login`,
};

// API Functions
export const apiService = {
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
      const response = await fetch(`${API_ENDPOINTS.PRODUCTS}?page=${page}&limit=${limit}`);
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
      const response = await fetch(`${API_ENDPOINTS.ARTISANS}?page=${page}&limit=${limit}`);
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
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
};

export default apiService; 