import { useState, useCallback } from 'react';

const ADMIN_EMAIL = 'gauravsaswade2009@gmail.com';
const ADMIN_PASSWORD = 'p1love2g';
const AUTH_KEY = 'samparc_admin_auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem(AUTH_KEY) === 'true'
  );

  const login = useCallback((email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
