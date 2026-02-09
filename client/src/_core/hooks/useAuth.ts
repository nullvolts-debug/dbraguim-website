import { useCallback, useMemo } from "react";

/**
 * Simplified useAuth hook for public site (no authentication needed)
 */
export function useAuth() {
  const state = useMemo(() => ({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  }), []);

  return {
    ...state,
    refresh: () => {},
    logout: useCallback(async () => {}, []),
  };
}
