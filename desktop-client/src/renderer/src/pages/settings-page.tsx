import { Box, Card, Divider, Group, SimpleGrid, Stack, Switch, Text, ThemeIcon } from '@mantine/core';
import {
  IconBell,
  IconDeviceDesktop,
  IconInfoCircle,
  IconLanguage,
  IconPalette,
  IconShieldCheck,
  IconUser
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/auth-context';
import { LanguageSwitcher } from '../components/language-switcher';
import { PageHeader } from '../components/page-header';
import { ThemeModeSwitcher } from '../components/theme-mode-switcher';

export const SettingsPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Stack gap="xl">
      <PageHeader title={t('settings.title')} badge="Ferma-TN" subtitle={t('settings.appearanceHelp')} />

      <SimpleGrid cols={{ base: 1, xl: 2 }} spacing="lg">
        <Card className="settings-section" padding="xl" radius="xl" withBorder>
          <Group gap="sm" mb="lg">
            <Box className="section-icon ferma">
              <IconUser size={18} color="#66bb6a" />
            </Box>
            <Text fw={700} c="var(--app-text-primary)">{t('settings.profileSection')}</Text>
          </Group>

          <Stack gap="md">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">{t('auth.name')}</Text>
              <Text size="sm" fw={500} c="var(--app-text-primary)">{user?.name ?? '-'}</Text>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">{t('auth.email')}</Text>
              <Text size="sm" fw={500} c="var(--app-text-primary)">{user?.email ?? '-'}</Text>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">{t('auth.farmName')}</Text>
              <Text size="sm" fw={500} c="var(--app-text-primary)">{user?.farmName ?? '-'}</Text>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">{t('auth.phone')}</Text>
              <Text size="sm" fw={500} c="var(--app-text-primary)">{user?.phone ?? '-'}</Text>
            </Group>
          </Stack>
        </Card>

        <Card className="settings-section" padding="xl" radius="xl" withBorder>
          <Group gap="sm" mb="lg">
            <Box className="section-icon gold">
              <IconLanguage size={18} color="#f59e0b" />
            </Box>
            <Text fw={700} c="var(--app-text-primary)">{t('common.language')}</Text>
          </Group>

          <Stack gap="md">
            <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
              {t('settings.languageHelp')}
            </Text>
            <LanguageSwitcher />
          </Stack>
        </Card>

        <Card className="settings-section" padding="xl" radius="xl" withBorder>
          <Group gap="sm" mb="lg">
            <Box className="section-icon teal">
              <IconPalette size={18} color="#0f766e" />
            </Box>
            <Text fw={700} c="var(--app-text-primary)">{t('settings.appearanceSection')}</Text>
          </Group>

          <Stack gap="md">
            <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
              {t('settings.appearanceHelp')}
            </Text>
            <ThemeModeSwitcher />
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">{t('settings.themeSelection')}</Text>
              <Text size="sm" fw={600} c="var(--app-text-primary)">
                {t('settings.themeCurrent')}
              </Text>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Group gap="sm">
                <IconBell size={16} color="#90a4ae" />
                <Text size="sm" c="dimmed">{t('settings.notifications')}</Text>
              </Group>
              <Switch defaultChecked color="ferma" />
            </Group>
          </Stack>
        </Card>

        <Card className="settings-section" padding="xl" radius="xl" withBorder>
          <Group gap="sm" mb="lg">
            <Box className="section-icon sky">
              <IconInfoCircle size={18} color="#2563eb" />
            </Box>
            <Text fw={700} c="var(--app-text-primary)">{t('settings.aboutSection')}</Text>
          </Group>

          <Stack gap="md">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">{t('settings.version')}</Text>
              <Text size="sm" fw={600} c="var(--app-text-primary)">v0.1.0</Text>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">{t('settings.platform')}</Text>
              <Group gap={6}>
                <IconDeviceDesktop size={14} color="#90a4ae" />
                <Text size="sm" c="var(--app-text-primary)">{t('settings.platformValue')}</Text>
              </Group>
            </Group>
            <Divider color="rgba(76, 175, 80, 0.08)" />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">{t('settings.license')}</Text>
              <Group gap={6}>
                <IconShieldCheck size={14} color="#66bb6a" />
                <Text size="sm" c="var(--app-text-primary)">{t('settings.licenseValue')}</Text>
              </Group>
            </Group>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  );
};
