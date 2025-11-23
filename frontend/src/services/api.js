// Enhanced API client with error handling and mock fallback support
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK === "true" || true; // Default to mock until backend is ready

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Token management
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const setAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};

// Base fetch with auth and error handling
const baseFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle different status codes
    if (response.status === 401) {
      clearAuthToken();
      throw new ApiError("Unauthorized - Please login again", 401);
    }

    if (response.status === 403) {
      throw new ApiError("Forbidden - You don't have permission", 403);
    }

    if (response.status === 404) {
      throw new ApiError("Resource not found", 404);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || "Network response was not ok",
        response.status,
        errorData
      );
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network error or other fetch errors
    throw new ApiError(
      error.message || "Network error - please check your connection",
      0,
      error
    );
  }
};

export const api = {
  // GET request
  async get(endpoint, options = {}) {
    return baseFetch(endpoint, {
      method: "GET",
      ...options,
    });
  },

  // POST request
  async post(endpoint, data, options = {}) {
    return baseFetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  },

  // PUT request
  async put(endpoint, data, options = {}) {
    return baseFetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  },

  // PATCH request
  async patch(endpoint, data, options = {}) {
    return baseFetch(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options,
    });
  },

  // DELETE request
  async delete(endpoint, options = {}) {
    return baseFetch(endpoint, {
      method: "DELETE",
      ...options,
    });
  },

  // Auth helpers
  setToken: setAuthToken,
  getToken: getAuthToken,
  clearToken: clearAuthToken,
};

// Export for use in services
export { ApiError, USE_MOCK_DATA };
export default api;
