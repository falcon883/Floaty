import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production" ? "https://api.csfloat.com" : "/api"; // Use proxy in development
const TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 2;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log("API Request:", config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("API Error Response:", error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("API No Response:", error.request);
    } else {
      // Error setting up request
      console.error("API Request Error:", error.message);
    }
    return Promise.reject(error);
  },
);

/**
 * Delays execution for retry logic
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Makes API call with retry logic
 * @param {Function} apiCall - The API call function
 * @param {number} retries - Number of retries remaining
 * @returns {Promise}
 */
const withRetry = async (apiCall, retries = MAX_RETRIES) => {
  try {
    return await apiCall();
  } catch (error) {
    if (retries > 0 && (!error.response || error.response.status >= 500)) {
      // Retry on network errors or 5xx errors
      await delay(1000 * (MAX_RETRIES - retries + 1)); // Exponential backoff
      return withRetry(apiCall, retries - 1);
    }
    throw error;
  }
};

/**
 * Float service for API interactions
 */
export const floatService = {
  /**
   * Gets skin data from inspect link
   * @param {string} inspectLink - The inspect link
   * @returns {Promise<Object>} Response with data or error
   */
  async getSkinData(inspectLink) {
    try {
      const response = await withRetry(() =>
        apiClient.get("/", {
          params: { url: inspectLink },
        }),
      );

      if (response.data && response.data.iteminfo) {
        return {
          data: response.data.iteminfo,
          error: null,
        };
      }

      return {
        data: null,
        error: "Invalid response format from API",
      };
    } catch (error) {
      // Handle different error types
      let errorMessage = "Failed to fetch skin data. Please try again.";

      if (error.response) {
        // Server error response
        const status = error.response.status;
        const data = error.response.data;

        if (status === 429) {
          errorMessage =
            "Too many requests. Please wait a moment and try again.";
        } else if (status === 400) {
          errorMessage = data.error || "Invalid inspect link.";
        } else if (status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (data && data.error) {
          errorMessage = data.error;
        }
      } else if (error.request) {
        // Network error
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else if (error.code === "ECONNABORTED") {
        // Timeout
        errorMessage = "Request timeout. Please try again.";
      }

      return {
        data: null,
        error: errorMessage,
      };
    }
  },

  /**
   * Checks if the API is available
   * @returns {Promise<boolean>}
   */
  async checkHealth() {
    try {
      await apiClient.get("/health", { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default floatService;
