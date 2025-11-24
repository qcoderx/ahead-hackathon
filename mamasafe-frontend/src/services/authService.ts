import api from "./api";

/**
 * Authentication Service
 * Handles login, logout, and session management
 */

const authService = {
  /**
   * Provider login
   * @param {string} email - Provider email
   * @param {string} password - Provider password
   * @returns {Promise<Object>} User data and token
   */
  async providerLogin(email: string, password: string) {
    const response = await api.post("/auth/login", {
      username: email,
      password,
      grant_type: "password",
    });
    api.setToken(response.access_token);
    localStorage.setItem("user", JSON.stringify(response.user || {}));
    return response;
  },

  /**
   * Patient login
   * @param {string} phone - Patient phone number
   * @param {string} pin - Patient PIN
   * @returns {Promise<Object>} User data and token
   */
  async patientLogin(phone: string, pin: string) {
    const response = await api.post("/patient/login", { patient_id: phone });
    api.setToken(response.access_token || "");
    localStorage.setItem("user", JSON.stringify(response.user || {}));
    return response;
  },

  /**
   * Logout
   * Clears token and user data
   */
  async logout() {
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
    const response = await api.get("/auth/me");
    localStorage.setItem("user", JSON.stringify(response.user));
    return response.user;
  },
};

export default authService;
