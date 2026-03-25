import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Modal,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea,
  ThemeIcon
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconBone,
  IconBug,
  IconCat,
  IconDeer,
  IconEgg,
  IconFeather,
  IconHorseToy,
  IconLeaf,
  IconPaw,
  IconPlus,
  IconShieldHalfFilled,
  IconTag
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { livestockTypes, type LivestockRecord } from '../../../shared/contracts';
import { PageHeader } from '../components/page-header';
import { apiFetch } from '../lib/api';
import { getErrorMessage } from '../lib/errors';
import { formatCompactNumber } from '../lib/format';
import type { ReactNode } from 'react';

const animalIcons: Record<string, ReactNode> = {
  cattle: <IconBone size={14} />,
  sheep: <IconPaw size={14} />,
  goats: <IconDeer size={14} />,
  poultry: <IconFeather size={14} />,
  camels: <IconHorseToy size={14} />,
  horses: <IconHorseToy size={14} />,
  rabbits: <IconCat size={14} />,
  bees: <IconBug size={14} />
};

export const LivestockPage = () => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const locale = i18n.resolvedLanguage === 'fr' ? 'fr-TN' : i18n.resolvedLanguage === 'en' ? 'en-TN' : 'ar-TN';

  const form = useForm({
    initialValues: {
      tagId: '',
      type: 'sheep',
      breed: '',
      birthDate: '',
      status: 'healthy',
      location: '',
      notes: ''
    }
  });

  const livestockQuery = useQuery({
    queryKey: ['livestock'],
    queryFn: () => apiFetch<LivestockRecord[]>('/api/livestock')
  });

  const createMutation = useMutation({
    mutationFn: (values: typeof form.values) =>
      apiFetch<LivestockRecord>('/api/livestock', {
        method: 'POST',
        body: JSON.stringify(values)
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['livestock'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
      form.reset();
      close();
      notifications.show({ color: 'ferma', message: t('livestock.add') });
    },
    onError: (error) => {
      notifications.show({ color: 'red', message: getErrorMessage(error) });
    }
  });

  const livestock = livestockQuery.data ?? [];
  const monitoringCount = livestock.filter((item) => item.status === 'monitoring').length;
  const livestockSummary = livestockTypes
    .map((type) => ({
      type,
      count: livestock.filter((item) => item.type === type).length
    }))
    .filter((entry) => entry.count > 0);

  const statusColors: Record<string, { bg: string; border: string; text: string }> = {
    healthy: { bg: 'rgba(76, 175, 80, 0.1)', border: 'rgba(76, 175, 80, 0.25)', text: '#66bb6a' },
    monitoring: { bg: 'rgba(255, 193, 7, 0.1)', border: 'rgba(255, 193, 7, 0.25)', text: '#ffd54f' },
    sold: { bg: 'rgba(120, 144, 156, 0.1)', border: 'rgba(120, 144, 156, 0.25)', text: '#90a4ae' }
  };

  return (
    <Stack gap="xl">
      <PageHeader
        title={t('livestock.title')}
        badge="Ferma-TN"
        action={
          <Button
            color="ferma"
            radius="xl"
            leftSection={<IconPlus size={16} />}
            onClick={open}
            style={{ boxShadow: '0 4px 20px rgba(76, 175, 80, 0.25)' }}
          >
            {t('livestock.add')}
          </Button>
        }
      />

      {/* Summary Cards */}
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        <Card className="summary-card green" padding="lg" radius="xl" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" fw={500} tt="uppercase" style={{ letterSpacing: '0.06em' }}>
                {t('dashboard.livestockCount')}
              </Text>
              <Text
                fw={800}
                size="2rem"
                mt={4}
                style={{
                  background: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {formatCompactNumber(livestock.length, locale)}
              </Text>
            </div>
            <ThemeIcon
              size={48}
              radius="xl"
              color="ferma"
              variant="light"
              style={{ border: '1px solid rgba(76, 175, 80, 0.2)' }}
            >
              <IconLeaf size={22} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card className="summary-card gold" padding="lg" radius="xl" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" fw={500} tt="uppercase" style={{ letterSpacing: '0.06em' }}>
                {t('dashboard.animalsUnderMonitoring')}
              </Text>
              <Text
                fw={800}
                size="2rem"
                mt={4}
                style={{
                  background: 'linear-gradient(135deg, #fff8e1, #ffd54f)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {formatCompactNumber(monitoringCount, locale)}
              </Text>
            </div>
            <ThemeIcon
              size={48}
              radius="xl"
              color="yellow"
              variant="light"
              style={{ border: '1px solid rgba(255, 193, 7, 0.2)' }}
            >
              <IconShieldHalfFilled size={22} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card className="summary-card emerald" padding="lg" radius="xl" withBorder>
          <Group justify="space-between" align="flex-start">
            <div>
              <Text size="xs" c="dimmed" fw={500} tt="uppercase" mb="sm" style={{ letterSpacing: '0.06em' }}>
                {t('dashboard.herdBalance')}
              </Text>
              <Group gap={6} wrap="wrap">
                {livestockSummary.length === 0 ? (
                  <Text c="dimmed" size="sm">{t('common.empty')}</Text>
                ) : (
                  livestockSummary.map((entry) => (
                    <Badge
                      key={entry.type}
                      variant="light"
                      color="ferma"
                      size="md"
                      leftSection={animalIcons[entry.type] ?? <IconPaw size={14} />}
                      style={{
                        background: 'rgba(76, 175, 80, 0.1)',
                        border: '1px solid rgba(76, 175, 80, 0.15)'
                      }}
                    >
                      {t(`livestockType.${entry.type}`)} {entry.count}
                    </Badge>
                  ))
                )}
              </Group>
            </div>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Livestock Table */}
      <Card className="chart-card" padding="lg" radius="xl" withBorder>
        <Group justify="space-between" mb="lg">
          <Group gap="sm">
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
              <IconTag size={18} color="#66bb6a" />
            </Box>
            <Text fw={700} c="#e8f5e9">{t('livestock.title')}</Text>
          </Group>
          <Badge variant="light" color="ferma" size="sm">{livestock.length}</Badge>
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t('livestock.tagId')}</Table.Th>
              <Table.Th>{t('livestock.type')}</Table.Th>
              <Table.Th>{t('livestock.breed')}</Table.Th>
              <Table.Th>{t('livestock.status')}</Table.Th>
              <Table.Th>{t('livestock.location')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {livestock.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Stack align="center" py="xl" gap="sm">
                    <ThemeIcon size={48} radius="xl" variant="light" color="ferma">
                      <IconLeaf size={24} />
                    </ThemeIcon>
                    <Text c="dimmed" size="sm">{t('common.empty')}</Text>
                  </Stack>
                </Table.Td>
              </Table.Tr>
            ) : (
              livestock.map((item) => {
                const sc = statusColors[item.status] ?? statusColors.healthy;
                return (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Text size="sm" fw={600}>{item.tagId}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ThemeIcon size={22} radius="md" variant="light" color="ferma" style={{ border: 'none' }}>
                          {animalIcons[item.type] ?? <IconPaw size={12} />}
                        </ThemeIcon>
                        <Text size="sm">{t(`livestockType.${item.type}`)}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{item.breed}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        variant="light"
                        size="sm"
                        style={{
                          background: sc.bg,
                          border: `1px solid ${sc.border}`,
                          color: sc.text
                        }}
                      >
                        {t(`livestockStatus.${item.status}`)}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed">{item.location ?? '-'}</Text>
                    </Table.Td>
                  </Table.Tr>
                );
              })
            )}
          </Table.Tbody>
        </Table>
      </Card>

      {/* Add Modal */}
      <Modal opened={opened} onClose={close} title={t('livestock.add')} centered radius="xl" size="lg">
        <form onSubmit={form.onSubmit((values) => createMutation.mutate(values))}>
          <Stack>
            <SimpleGrid cols={2}>
              <TextInput label={t('livestock.tagId')} required {...form.getInputProps('tagId')} radius="lg" />
              <Select
                label={t('livestock.type')}
                data={livestockTypes.map((value) => ({
                  value,
                  label: t(`livestockType.${value}`)
                }))}
                {...form.getInputProps('type')}
                radius="lg"
              />
            </SimpleGrid>
            <SimpleGrid cols={2}>
              <TextInput label={t('livestock.breed')} required {...form.getInputProps('breed')} radius="lg" />
              <TextInput label={t('livestock.birthDate')} type="date" {...form.getInputProps('birthDate')} radius="lg" />
            </SimpleGrid>
            <SimpleGrid cols={2}>
              <Select
                label={t('livestock.status')}
                data={['healthy', 'monitoring', 'sold'].map((value) => ({
                  value,
                  label: t(`livestockStatus.${value}`)
                }))}
                {...form.getInputProps('status')}
                radius="lg"
              />
              <TextInput label={t('livestock.location')} {...form.getInputProps('location')} radius="lg" />
            </SimpleGrid>
            <Textarea label={t('livestock.notes')} minRows={3} {...form.getInputProps('notes')} radius="lg" />
            <Group justify="flex-end" mt="sm">
              <Button variant="subtle" color="gray" onClick={close} radius="xl">
                Cancel
              </Button>
              <Button
                type="submit"
                color="ferma"
                loading={createMutation.isPending}
                radius="xl"
                leftSection={<IconPlus size={16} />}
                style={{ boxShadow: '0 4px 20px rgba(76, 175, 80, 0.25)' }}
              >
                {t('common.create')}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};
