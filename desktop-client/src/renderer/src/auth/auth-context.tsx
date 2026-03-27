import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { AuthResponse, AuthUser, LanguageCode } from '../../../shared/contracts';
import { i18n } from '../i18n';
import { apiFetch } from '../lib/api';
import { clearAuthToken, getAuthToken, setAuthToken } from '../lib/storage';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  farmName?: string;
  locale: LanguageCode;
}

interface AuthContextValue {
  user: AuthUser | null;
  isReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setIsReady(true);
      return;
    }

    void apiFetch<AuthUser>('/api/auth/me')
      .then((nextUser) => {
        setUser(nextUser);
        void i18n.changeLanguage(nextUser.locale);
      })
      .catch(() => {
        clearAuthToken();
        setUser(null);
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  const applyAuthResponse = (response: AuthResponse) => {
    setAuthToken(response.token);
    queryClient.clear();
    setUser(response.user);
    void i18n.changeLanguage(response.user.locale);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      login: async (email, password) => {
        const response = await apiFetch<AuthResponse>('/api/auth/login', {
          auth: false,
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        applyAuthResponse(response);
      },
      register: async (payload) => {
        const response = await apiFetch<AuthResponse>('/api/auth/register', {
          auth: false,
          method: 'POST',
          body: JSON.stringify(payload)
        });
        applyAuthResponse(response);
      },
      logout: () => {
        clearAuthToken();
        queryClient.clear();
        setUser(null);
      }
    }),
    [isReady, queryClient, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
