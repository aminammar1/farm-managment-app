import {
  Badge,
  Box,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  ThemeIcon
} from '@mantine/core';
import {
  IconBell,
  IconDeviceDesktop,
  IconInfoCircle,
  IconLanguage,
  IconMoon,
  IconPalette,
  IconShieldCheck,
  IconUser
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/language-switcher';
import { PageHeader } from '../components/page-header';
import { useAuth } from '../auth/auth-context';

export const SettingsPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Stack gap="xl">
      <PageHeader title={t('settings.title')} badge="Ferma-TN" />

      <SimpleGrid cols={{ base: 1, md: 2 }}>
        {/* Profile Section */}
        <Card className="settings-section" padding="xl" radius="xl" withBorder>
          <Group gap="sm" mb="lg">
            <Box
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.2)'
              }}
            >
              <IconUser size={18} color="#66bb6a" />
            </Box>
            <Text fw={700} c="#e8f5e9">Profile</Text>
          </Group>

          <Stack gap="md">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Name</Text>
              <Text size="sm" fw={500} c="#e8f5e9">{user?.name ?? '-'}</Text>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Email</Text>
              <Text size="sm" fw={500} c="#e8f5e9">{user?.email ?? '-'}</Text>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Farm</Text>
              <Text size="sm" fw={500} c="#e8f5e9">{user?.farmName ?? '-'}</Text>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Phone</Text>
              <Text size="sm" fw={500} c="#e8f5e9">{user?.phone ?? '-'}</Text>
            </Group>
          </Stack>
        </Card>

        {/* Language Section */}
        <Card className="settings-section" padding="xl" radius="xl" withBorder>
          <Group gap="sm" mb="lg">
            <Box
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 193, 7, 0.1)',
                border: '1px solid rgba(255, 193, 7, 0.2)'
              }}
            >
              <IconLanguage size={18} color="#ffd54f" />
            </Box>
            <Text fw={700} c="#e8f5e9">Language</Text>
          </Group>

          <Stack gap="md">
            <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
              {t('settings.languageHelp')}
            </Text>
            <LanguageSwitcher />
          </Stack>
        </Card>

        {/* Appearance Section */}
        <Card className="settings-section" padding="xl" radius="xl" withBorder>
          <Group gap="sm" mb="lg">
            <Box
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 150, 136, 0.1)',
                border: '1px solid rgba(0, 150, 136, 0.2)'
              }}
            >
              <IconPalette size={18} color="#4db6ac" />
            </Box>
            <Text fw={700} c="#e8f5e9">Appearance</Text>
          </Group>

          <Stack gap="md">
            <Group justify="space-between">
              <Group gap="sm">
                <IconMoon size={16} color="#90a4ae" />
                <Text size="sm" c="dimmed">Dark mode</Text>
              </Group>
              <Switch defaultChecked color="ferma" />
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Group gap="sm">
                <IconBell size={16} color="#90a4ae" />
                <Text size="sm" c="dimmed">Notifications</Text>
              </Group>
              <Switch defaultChecked color="ferma" />
            </Group>
          </Stack>
        </Card>

        {/* About Section */}
        <Card className="settings-section" padding="xl" radius="xl" withBorder>
          <Group gap="sm" mb="lg">
            <Box
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(33, 150, 243, 0.1)',
                border: '1px solid rgba(33, 150, 243, 0.2)'
              }}
            >
              <IconInfoCircle size={18} color="#64b5f6" />
            </Box>
            <Text fw={700} c="#e8f5e9">About Ferma-TN</Text>
          </Group>

          <Stack gap="md">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Version</Text>
              <Badge
                variant="light"
                color="ferma"
                size="sm"
                style={{
                  background: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.15)'
                }}
              >
                v0.1.0
              </Badge>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Platform</Text>
              <Group gap={6}>
                <IconDeviceDesktop size={14} color="#90a4ae" />
                <Text size="sm" c="#e8f5e9">Desktop (Electron)</Text>
              </Group>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">License</Text>
              <Group gap={6}>
                <IconShieldCheck size={14} color="#66bb6a" />
                <Text size="sm" c="#e8f5e9">PRO</Text>
              </Group>
            </Group>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  );
};
