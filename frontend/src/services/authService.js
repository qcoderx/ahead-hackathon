import api, { USE_MOCK_DATA } from "./api";

// Mock user data
const MOCK_USERS = {
  provider: {
    email: "provider@mamasafe.com",
    password: "password123",
    user: {
      id: "1",
      name: "Dr. Sarah Connor",
      email: "provider@mamasafe.com",
      role: "provider",
      department: "Maternity Ward",
    },
    token: "mock-provider-token-12345",
  },
  patient: {
    phone: "08012345678",
    pin: "1234",
    user: {
      id: "2",
      name: "Ayomide Williams",
      phone: "08012345678",
      role: "patient",
      patientId: "MS-12345",
    },
    token: "mock-patient-token-67890",
  },
};

/**
 * Authentication Service
 * Handles login, logout, and session management
 * Uses mock data when backend is not available
 */
const authService = {
  /**
   * Provider login
   * @param {string} email - Provider email
   * @param {string} password - Provider password
   * @returns {Promise<Object>} User data and token
   */
  async providerLogin(email, password) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock validation
      if (
        email === MOCK_USERS.provider.email &&
        password === MOCK_USERS.provider.password
      ) {
        const { user, token } = MOCK_USERS.provider;
        api.setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        return { user, token };
      } else {
        throw new Error("Invalid email or password");
      }
    }

    // Real API call
    const response = await api.post("/auth/provider/login", {
      email,
      password,
    });
    api.setToken(response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    return response;
  },

  /**
   * Patient login
   * @param {string} phone - Patient phone number
   * @param {string} pin - Patient PIN
   * @returns {Promise<Object>} User data and token
   */
  async patientLogin(phone, pin) {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock validation
      if (
        phone === MOCK_USERS.patient.phone &&
        pin === MOCK_USERS.patient.pin
      ) {
        const { user, token } = MOCK_USERS.patient;
        api.setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        return { user, token };
      } else {
        throw new Error("Invalid phone number or PIN");
      }
    }

    // Real API call
    const response = await api.post("/auth/patient/login", { phone, pin });
    api.setToken(response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    return response;
  },

  /**
   * Logout
   * Clears token and user data
   */
  async logout() {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      api.clearToken();
      localStorage.removeItem("user");
      return { success: true };
    }

    // Real API call
    await api.post("/auth/logout");
    api.clearToken();
    localStorage.removeItem("user");
    return { success: true };
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} Current user or null
   */
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated
   */
  isAuthenticated() {
    return !!api.getToken() && !!this.getCurrentUser();
  },

  /**
   * Get current user from API (verify token)
   * @returns {Promise<Object>} Current user data
   */
  async getMe() {
    if (USE_MOCK_DATA) {
      const user = this.getCurrentUser();
      if (!user) throw new Error("Not authenticated");
      return user;
    }

    // Real API call
    const response = await api.get("/auth/me");
    localStorage.setItem("user", JSON.stringify(response.user));
    return response.user;
  },
};

export default authService;
