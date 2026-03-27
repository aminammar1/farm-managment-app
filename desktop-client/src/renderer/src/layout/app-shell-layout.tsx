import {
  AppShell,
  Avatar,
  Badge,
  Box,
  Burger,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Indicator,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChecklist,
  IconChevronRight,
  IconDroplet,
  IconHome2,
  IconLeaf,
  IconLogout,
  IconSettings,
  IconSun,
  IconTractor
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';
import fermaLogo from '../assets/ferma-logo.png';
import { useAuth } from '../auth/auth-context';
import { LanguageSwitcher } from '../components/language-switcher';
import { ThemeModeSwitcher } from '../components/theme-mode-switcher';

export const AppShellLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/', label: t('navigation.dashboard'), icon: IconHome2, color: '#66bb6a' },
    { to: '/livestock', label: t('navigation.livestock'), icon: IconLeaf, color: '#4caf50' },
    { to: '/tasks', label: t('navigation.tasks'), icon: IconChecklist, color: '#8bc34a' },
    { to: '/operations', label: t('navigation.operations'), icon: IconTractor, color: '#ffc107' },
    { to: '/settings', label: t('navigation.settings'), icon: IconSettings, color: '#78909c' }
  ];

  const dateStr = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AppShell
      header={{ height: 76 }}
      navbar={{ width: 320, breakpoint: 'md', collapsed: { mobile: !opened } }}
      padding={{ base: 'md', md: 'lg', xl: 'xl' }}
      className="app-frame"
    >
      <AppShell.Header className="shell-header">
        <Group h="100%" px="lg" justify="space-between">
          <Group gap="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color="#66bb6a" />
            <Group gap="sm">
              <Image src={fermaLogo} w={40} h={40} radius="md" />
              <Stack gap={0}>
                <Text fw={800} size="md" c="var(--app-text-primary)">
                  Ferma-TN
                </Text>
                <Text size="xs" c="dimmed" className="shell-date-text">
                  {dateStr}
                </Text>
              </Stack>
            </Group>
          </Group>

          <Group gap="sm" wrap="nowrap">
            <Group gap={10} className="shell-weather-pill" visibleFrom="sm">
              <IconSun size={14} color="#f59e0b" />
              <Text size="xs" c="dimmed">28°C</Text>
              <IconDroplet size={14} color="#3b82f6" />
              <Text size="xs" c="dimmed">42%</Text>
            </Group>
            <ThemeModeSwitcher compact />
            <LanguageSwitcher compact />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar className="shell-navbar" p="md">
        <AppShell.Section>
          <Card className="user-profile-card" padding="md" radius="xl" mb="lg" withBorder>
            <Group gap="sm">
              <Indicator inline color="ferma" offset={7} size={10} withBorder>
                <Avatar
                  color="ferma"
                  radius="xl"
                  size="lg"
                  style={{
                    border: '2px solid rgba(76, 175, 80, 0.3)',
                    boxShadow: '0 0 20px rgba(76, 175, 80, 0.15)'
                  }}
                >
                  {user?.name?.slice(0, 1).toUpperCase() ?? 'F'}
                </Avatar>
              </Indicator>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text fw={700} size="sm" c="var(--app-text-primary)" truncate>
                  {user?.farmName ?? user?.name}
                </Text>
                <Text size="xs" c="dimmed" truncate style={{ opacity: 0.72 }}>
                  {user?.email}
                </Text>
              </div>
              <Badge
                color="ferma"
                variant="light"
                size="xs"
                style={{
                  background: 'rgba(76, 175, 80, 0.12)',
                  border: '1px solid rgba(76, 175, 80, 0.2)'
                }}
              >
                PRO
              </Badge>
            </Group>
          </Card>
        </AppShell.Section>

        <AppShell.Section>
          <Text
            size="xs"
            fw={700}
            c="dimmed"
            tt="uppercase"
            mb="sm"
            px="sm"
            style={{ letterSpacing: '0.08em', opacity: 0.55 }}
          >
            {t('navigation.dashboard')}
          </Text>
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea} scrollbarSize={4}>
          <Stack gap={4}>
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  component={Link}
                  to={link.to}
                  label={
                    <Text size="sm" fw={isActive ? 700 : 500}>
                      {link.label}
                    </Text>
                  }
                  leftSection={
                    <Box
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isActive ? 'rgba(76, 175, 80, 0.15)' : 'rgba(76, 175, 80, 0.05)',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <link.icon size={18} color={isActive ? link.color : 'var(--app-text-muted)'} />
                    </Box>
                  }
                  rightSection={isActive ? <IconChevronRight size={14} color="#66bb6a" /> : null}
                  active={isActive}
                  className="nav-link-item"
                  style={{
                    borderRadius: 14,
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.12), rgba(76, 175, 80, 0.06))'
                      : 'transparent',
                    border: isActive ? '1px solid rgba(76, 175, 80, 0.15)' : '1px solid transparent'
                  }}
                />
              );
            })}
          </Stack>
        </AppShell.Section>

        <AppShell.Section pt="md">
          <Divider color="rgba(76,175,80,0.1)" mb="md" />
          <Tooltip label={t('common.logout')} position="right" withArrow>
            <Button
              variant="subtle"
              color="red"
              fullWidth
              leftSection={<IconLogout size={16} />}
              onClick={logout}
              style={{
                borderRadius: 14,
                color: 'rgba(239, 83, 80, 0.8)',
                transition: 'all 0.25s ease'
              }}
            >
              {t('common.logout')}
            </Button>
          </Tooltip>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <div className="content-shell">
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};
