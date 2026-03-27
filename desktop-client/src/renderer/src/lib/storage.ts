const tokenKey = 'farmdesk.token';
const colorSchemeKey = 'farmdesk.color-scheme';

export const getAuthToken = (): string | null => localStorage.getItem(tokenKey);

export const setAuthToken = (token: string): void => {
  localStorage.setItem(tokenKey, token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem(tokenKey);
};

export type StoredColorScheme = 'light' | 'dark';

export const getStoredColorScheme = (): StoredColorScheme => {
  const value = localStorage.getItem(colorSchemeKey);
  return value === 'light' ? 'light' : 'dark';
};

export const setStoredColorScheme = (value: StoredColorScheme): void => {
  localStorage.setItem(colorSchemeKey, value);
};
