import { Group, SegmentedControl, Text, ThemeIcon, Tooltip, UnstyledButton } from '@mantine/core';
import { IconMoonStars, IconSunHigh } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../theme-context';

interface ThemeModeSwitcherProps {
  compact?: boolean;
}

export const ThemeModeSwitcher = ({ compact = false }: ThemeModeSwitcherProps) => {
  const { t } = useTranslation();
  const { colorScheme, setColorScheme, toggleColorScheme } = useThemeContext();

  if (compact) {
    return (
      <Tooltip
        label={colorScheme === 'dark' ? t('settings.themeLight') : t('settings.themeDark')}
        withArrow
      >
        <UnstyledButton className="theme-toggle-button" onClick={toggleColorScheme}>
          <Group gap={8} wrap="nowrap">
            <ThemeIcon radius="xl" size={34} variant="light" color={colorScheme === 'dark' ? 'gold' : 'ferma'}>
              {colorScheme === 'dark' ? <IconSunHigh size={18} /> : <IconMoonStars size={18} />}
            </ThemeIcon>
            <Text fw={700} size="sm">
              {colorScheme === 'dark' ? t('settings.themeDark') : t('settings.themeLight')}
            </Text>
          </Group>
        </UnstyledButton>
      </Tooltip>
    );
  }

  return (
    <SegmentedControl
      value={colorScheme}
      onChange={(value) => {
        setColorScheme(value as 'light' | 'dark');
      }}
      fullWidth
      radius="xl"
      data={[
        {
          value: 'light',
          label: (
            <Group gap={8} justify="center" wrap="nowrap">
              <IconSunHigh size={16} />
              <Text size="sm" fw={600}>
                {t('settings.themeLight')}
              </Text>
            </Group>
          )
        },
        {
          value: 'dark',
          label: (
            <Group gap={8} justify="center" wrap="nowrap">
              <IconMoonStars size={16} />
              <Text size="sm" fw={600}>
                {t('settings.themeDark')}
              </Text>
            </Group>
          )
        }
      ]}
    />
  );
};
