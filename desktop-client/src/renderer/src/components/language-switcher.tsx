import { Badge, Group, Menu, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconCheck, IconChevronDown, IconLanguage } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { LanguageCode } from '../../../shared/contracts';

interface LanguageSwitcherProps {
  compact?: boolean;
}

const languageMeta: Record<LanguageCode, { short: string; native: string }> = {
  ar: { short: 'AR', native: 'العربية' },
  fr: { short: 'FR', native: 'Francais' },
  en: { short: 'EN', native: 'English' }
};

export const LanguageSwitcher = ({ compact = false }: LanguageSwitcherProps) => {
  const { i18n, t } = useTranslation();
  const languages: LanguageCode[] = ['ar', 'fr', 'en'];
  const currentLanguage = (i18n.resolvedLanguage ?? 'ar') as LanguageCode;
  const current = languageMeta[currentLanguage];

  return (
    <Menu width={compact ? 220 : 260} position="bottom-end" withinPortal shadow="lg" offset={10}>
      <Menu.Target>
        <UnstyledButton className={compact ? 'language-switcher-button compact' : 'language-switcher-button'}>
          <Group gap={compact ? 8 : 10} wrap="nowrap">
            <span className="language-switcher-icon">
              <IconLanguage size={16} />
            </span>
            <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
              <Text size="xs" className="language-switcher-label">
                {t('common.language')}
              </Text>
              <Text fw={700} size="sm" truncate>
                {compact ? current.short : current.native}
              </Text>
            </Stack>
            <IconChevronDown size={16} className="language-switcher-chevron" />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown className="language-switcher-dropdown">
        <Menu.Label>{t('common.language')}</Menu.Label>
        {languages.map((language) => {
          const isActive = currentLanguage === language;
          return (
            <Menu.Item
              key={language}
              onClick={() => {
                void i18n.changeLanguage(language);
              }}
              leftSection={
                <Badge
                  variant={isActive ? 'filled' : 'light'}
                  color={isActive ? 'ferma' : 'gray'}
                  radius="sm"
                  size="sm"
                >
                  {languageMeta[language].short}
                </Badge>
              }
              rightSection={isActive ? <IconCheck size={16} /> : null}
            >
              <Group justify="space-between" gap="xs" wrap="nowrap">
                <Text fw={600}>{languageMeta[language].native}</Text>
                <Text size="xs" c="dimmed">
                  {t(`language.${language}`)}
                </Text>
              </Group>
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};
