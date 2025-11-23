import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for API calls with loading, error, and data states
 * @param {Function} apiFunction - The API function to call
 * @param {boolean} immediate - Whether to call immediately on mount
 * @returns {Object} { data, loading, error, execute, reset }
 */
export const useApi = (apiFunction, immediate = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(...params);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message || "An error occurred");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return { data, loading, error, execute, reset };
};

export default useApi;
