const tokenKey = 'farmdesk.token';

export const getAuthToken = (): string | null => localStorage.getItem(tokenKey);

export const setAuthToken = (token: string): void => {
  localStorage.setItem(tokenKey, token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem(tokenKey);
};
