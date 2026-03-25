import {
  Button,
  Image,
  PasswordInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { LanguageCode } from '../../../shared/contracts';
import { useAuth } from '../auth/auth-context';
import { LanguageSwitcher } from '../components/language-switcher';
import { getErrorMessage } from '../lib/errors';
import authIllustration from '../assets/auth-illustration.png';
import fermaLogo from '../assets/ferma-logo.png';

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
      {/* Left Panel - Form */}
      <div className="auth-left-panel">
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
          {/* Brand */}
          <div className="auth-brand-badge">
            <Image src={fermaLogo} w={24} h={24} radius="sm" />
            <span>Ferma-TN</span>
          </div>

          {/* Title */}
          <Title
            order={1}
            style={{
              fontSize: '2.4rem',
              lineHeight: 1.2,
              background: 'linear-gradient(135deg, #e8f5e9 30%, #66bb6a 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {t('auth.title')}
          </Title>

          <Text
            mt="md"
            style={{
              color: 'rgba(200, 230, 201, 0.6)',
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: 440
            }}
          >
            {t('auth.subtitle')}
          </Text>

          {/* Language Switcher */}
          <div style={{ marginTop: 24 }}>
            <LanguageSwitcher />
          </div>

          {/* Form Card */}
          <div className="auth-form-card">
            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <SegmentedControl
                  value={mode}
                  onChange={(value) => setMode(value as AuthMode)}
                  data={[
                    { label: t('auth.login'), value: 'login' },
                    { label: t('auth.register'), value: 'register' }
                  ]}
                  fullWidth
                  radius="xl"
                />

                {mode === 'register' ? (
                  <>
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
                  </>
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
                  placeholder="••••••••"
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
                  mt="sm"
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

          {/* Footer */}
          <Text mt="xl" size="xs" style={{ color: 'rgba(165, 214, 167, 0.3)' }}>
            © 2026 Ferma-TN — {t('app.subtitle')}
          </Text>
        </div>
      </div>

      {/* Right Panel - Illustration */}
      <div className="auth-right-panel">
        <img src={authIllustration} alt="Tunisian farm landscape" />
      </div>
    </div>
  );
};
