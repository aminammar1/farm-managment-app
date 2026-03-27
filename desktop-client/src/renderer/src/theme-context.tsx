import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getStoredColorScheme, setStoredColorScheme, type StoredColorScheme } from './lib/storage';

interface ThemeContextValue {
  colorScheme: StoredColorScheme;
  setColorScheme: (value: StoredColorScheme) => void;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorSchemeState] = useState<StoredColorScheme>(() => getStoredColorScheme());

  useEffect(() => {
    setStoredColorScheme(colorScheme);
    document.documentElement.dataset.appColorScheme = colorScheme;
  }, [colorScheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colorScheme,
      setColorScheme: (value) => {
        setColorSchemeState(value);
      },
      toggleColorScheme: () => {
        setColorSchemeState((current) => (current === 'dark' ? 'light' : 'dark'));
      }
    }),
    [colorScheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeContextProvider');
  }

  return context;
};
