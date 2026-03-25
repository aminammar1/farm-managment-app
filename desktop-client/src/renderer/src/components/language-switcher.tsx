import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { LanguageCode } from '../../../shared/contracts';

const langLabels: Record<LanguageCode, string> = {
  ar: 'ع',
  fr: 'Fr',
  en: 'En'
};

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages: LanguageCode[] = ['ar', 'fr', 'en'];

  return (
    <Group gap={6}>
      {languages.map((language) => {
        const isActive = i18n.resolvedLanguage === language;
        return (
          <Tooltip key={language} label={t(`language.${language}`)} withArrow>
            <ActionIcon
              variant={isActive ? 'filled' : 'subtle'}
              color={isActive ? 'ferma' : 'gray'}
              size="lg"
              radius="xl"
              onClick={() => {
                void i18n.changeLanguage(language);
              }}
              style={{
                border: isActive ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid transparent',
                boxShadow: isActive ? '0 0 16px rgba(76, 175, 80, 0.2)' : 'none',
                transition: 'all 0.25s ease',
                fontFamily: language === 'ar' ? '"Cairo", sans-serif' : '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
            >
              <Text size="xs" fw={700} lh={1}>{langLabels[language]}</Text>
            </ActionIcon>
          </Tooltip>
        );
      })}
    </Group>
  );
};
