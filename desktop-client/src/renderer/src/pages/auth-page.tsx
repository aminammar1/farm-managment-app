import { Button, Group, Image, PasswordInput, SegmentedControl, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { LanguageCode } from '../../../shared/contracts';
import authIllustration from '../assets/auth-illustration.png';
import fermaLogo from '../assets/ferma-logo.png';
import { useAuth } from '../auth/auth-context';
import { LanguageSwitcher } from '../components/language-switcher';
import { getErrorMessage } from '../lib/errors';

type AuthMode = 'login' | 'register';

export const AuthPage = () => {
  const { t, i18n } = useTranslation();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      farmName: '',
      locale: (i18n.resolvedLanguage ?? 'ar') as LanguageCode
    }
  });

  useEffect(() => {
    form.setFieldValue('locale', (i18n.resolvedLanguage ?? 'ar') as LanguageCode);
  }, [i18n.resolvedLanguage]);

  const handleSubmit = form.onSubmit(async (values) => {
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(values.email, values.password);
      } else {
        await register(values);
      }
    } catch (error) {
      notifications.show({
        color: 'red',
        title: t('auth.title'),
        message: getErrorMessage(error)
      });
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <div className="auth-shell">
      <div className="auth-left-panel">
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 520, width: '100%' }}>
          <Group justify="space-between" align="center" mb="xl">
            <div className="auth-brand-badge">
              <Image src={fermaLogo} w={24} h={24} radius="sm" />
              <span>Ferma-TN</span>
            </div>
            <LanguageSwitcher />
          </Group>

          <Title order={1} className="auth-title">
            {t('auth.title')}
          </Title>

          <Text mt="md" className="auth-subtitle">
            {t('auth.subtitle')}
          </Text>

          <div className="auth-form-card auth-form-card-clean">
            <form onSubmit={handleSubmit}>
              <Stack gap="lg">
                <SegmentedControl
                  className="auth-tabs"
                  value={mode}
                  onChange={(value) => setMode(value as AuthMode)}
                  fullWidth
                  radius="xl"
                  data={[
                    { label: t('auth.login'), value: 'login' },
                    { label: t('auth.register'), value: 'register' }
                  ]}
                />

                <div className="auth-panel-header">
                  <Text fw={700} size="lg" className="section-heading">
                    {mode === 'login' ? t('auth.login') : t('auth.register')}
                  </Text>
                </div>

                {mode === 'register' ? (
                  <Stack gap="md">
                    <TextInput
                      label={t('auth.name')}
                      placeholder="Ahmed Ben Salah"
                      {...form.getInputProps('name')}
                      required
                      radius="lg"
                    />
                    <TextInput
                      label={t('auth.phone')}
                      placeholder="+216 XX XXX XXX"
                      {...form.getInputProps('phone')}
                      radius="lg"
                    />
                    <TextInput
                      label={t('auth.farmName')}
                      placeholder="Ferme El Baraka"
                      {...form.getInputProps('farmName')}
                      radius="lg"
                    />
                  </Stack>
                ) : null}

                <TextInput
                  label={t('auth.email')}
                  placeholder="farmer@ferma.tn"
                  {...form.getInputProps('email')}
                  required
                  radius="lg"
                />
                <PasswordInput
                  label={t('auth.password')}
                  placeholder="********"
                  {...form.getInputProps('password')}
                  required
                  radius="lg"
                />

                <Button
                  type="submit"
                  size="lg"
                  color="ferma"
                  loading={submitting}
                  radius="xl"
                  fullWidth
                  style={{
                    boxShadow: '0 8px 32px rgba(76, 175, 80, 0.25)',
                    fontWeight: 700,
                    letterSpacing: '0.02em'
                  }}
                >
                  {mode === 'login' ? t('auth.submitLogin') : t('auth.submitRegister')}
                </Button>
              </Stack>
            </form>
          </div>

          <Text mt="xl" size="xs" className="auth-footer-text">
            © 2026 Ferma-TN - {t('app.subtitle')}
          </Text>
        </div>
      </div>

      <div className="auth-right-panel">
        <img src={authIllustration} alt="Tunisian farm landscape" />
      </div>
    </div>
  );
};
