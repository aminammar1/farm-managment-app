import '@fontsource/cairo/400.css';
import '@fontsource/cairo/600.css';
import '@fontsource/cairo/700.css';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './styles.css';
import { DirectionProvider, Loader, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider, useAuth } from './auth/auth-context';
import { AppShellLayout } from './layout/app-shell-layout';
import { AuthPage } from './pages/auth-page';
import { DashboardPage } from './pages/dashboard-page';
import { LivestockPage } from './pages/livestock-page';
import { OperationsPage } from './pages/operations-page';
import { SettingsPage } from './pages/settings-page';
import { TasksPage } from './pages/tasks-page';
import { getDirection } from './i18n';
import { appTheme } from './theme';

const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const { user, isReady } = useAuth();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.resolvedLanguage ?? 'ar';
    document.documentElement.lang = language;
    document.documentElement.dir = getDirection(language);
    document.title = t('app.title');
  }, [i18n.resolvedLanguage, t, i18n]);

  if (!isReady) {
    return <Loader />;
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <DirectionProvider initialDirection={getDirection(i18n.resolvedLanguage ?? 'ar')}>
      <Routes>
        <Route element={<AppShellLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/livestock" element={<LivestockPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </DirectionProvider>
  );
};

export const App = () => {
  const theme = useMemo(() => appTheme, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <AuthProvider>
          <HashRouter>
            <ProtectedRoutes />
          </HashRouter>
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
