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
  IconArrowDownRight,
  IconArrowUpRight,
  IconCurrencyDollar,
  IconPlus,
  IconReceipt,
  IconTractor,
  IconTrendingDown,
  IconTrendingUp
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { operationCategories, type OperationRecord } from '../../../shared/contracts';
import { PageHeader } from '../components/page-header';
import { apiFetch } from '../lib/api';
import { getErrorMessage } from '../lib/errors';
import { formatCompactNumber, formatCurrency } from '../lib/format';

export const OperationsPage = () => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const locale = i18n.resolvedLanguage === 'fr' ? 'fr-TN' : i18n.resolvedLanguage === 'en' ? 'en-TN' : 'ar-TN';

  const form = useForm({
    initialValues: {
      name: '',
      category: 'feeding',
      direction: 'expense',
      date: '',
      amount: '',
      quantity: '',
      unit: '',
      counterpart: '',
      notes: ''
    }
  });

  const operationsQuery = useQuery({
    queryKey: ['operations'],
    queryFn: () => apiFetch<OperationRecord[]>('/api/operations')
  });

  const createMutation = useMutation({
    mutationFn: (values: typeof form.values) =>
      apiFetch<OperationRecord>('/api/operations', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          amount: values.amount ? Number(values.amount) : undefined,
          quantity: values.quantity ? Number(values.quantity) : undefined
        })
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['operations'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
      form.reset();
      close();
    },
    onError: (error) => {
      notifications.show({ color: 'red', message: getErrorMessage(error) });
    }
  });

  const operations = operationsQuery.data ?? [];
  const revenue = operations
    .filter((op) => op.direction === 'income')
    .reduce((total, op) => total + (op.amount ?? 0), 0);
  const expenses = operations
    .filter((op) => op.direction === 'expense')
    .reduce((total, op) => total + (op.amount ?? 0), 0);
  const netResult = revenue - expenses;

  return (
    <Stack gap="xl">
      <PageHeader
        title={t('operations.title')}
        badge="Ferma-TN"
        action={
          <Button
            color="ferma"
            radius="xl"
            leftSection={<IconPlus size={16} />}
            onClick={open}
            style={{ boxShadow: '0 4px 20px rgba(76, 175, 80, 0.25)' }}
          >
            {t('operations.add')}
          </Button>
        }
      />

      {/* Financial Summary Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        <Card className="summary-card green" padding="lg" radius="xl" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" fw={500} tt="uppercase" style={{ letterSpacing: '0.06em' }}>
                {t('dashboard.monthlyRevenue')}
              </Text>
              <Text
                fw={800}
                size="1.6rem"
                mt={4}
                style={{
                  background: 'linear-gradient(135deg, #e8f5e9, #66bb6a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {formatCurrency(revenue, locale)}
              </Text>
            </div>
            <ThemeIcon
              size={48}
              radius="xl"
              color="ferma"
              variant="light"
              style={{ border: '1px solid rgba(76, 175, 80, 0.2)' }}
            >
              <IconTrendingUp size={22} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card className="summary-card red" padding="lg" radius="xl" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" fw={500} tt="uppercase" style={{ letterSpacing: '0.06em' }}>
                {t('dashboard.monthlyExpenses')}
              </Text>
              <Text
                fw={800}
                size="1.6rem"
                mt={4}
                style={{
                  background: 'linear-gradient(135deg, #ffcdd2, #ef5350)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {formatCurrency(expenses, locale)}
              </Text>
            </div>
            <ThemeIcon
              size={48}
              radius="xl"
              color="red"
              variant="light"
              style={{ border: '1px solid rgba(239, 83, 80, 0.2)' }}
            >
              <IconTrendingDown size={22} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card className="summary-card gold" padding="lg" radius="xl" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" fw={500} tt="uppercase" style={{ letterSpacing: '0.06em' }}>
                {t('dashboard.monthlyNet')}
              </Text>
              <Text
                fw={800}
                size="1.6rem"
                mt={4}
                style={{ color: netResult >= 0 ? '#66bb6a' : '#ef5350' }}
              >
                {netResult >= 0 ? '+' : ''}{formatCurrency(netResult, locale)}
              </Text>
            </div>
            <ThemeIcon
              size={48}
              radius="xl"
              variant="light"
              style={{
                background: netResult >= 0 ? 'rgba(76, 175, 80, 0.12)' : 'rgba(239, 83, 80, 0.12)',
                border: `1px solid ${netResult >= 0 ? 'rgba(76, 175, 80, 0.2)' : 'rgba(239, 83, 80, 0.2)'}`,
                color: netResult >= 0 ? '#66bb6a' : '#ef5350'
              }}
            >
              <IconCurrencyDollar size={22} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card className="summary-card emerald" padding="lg" radius="xl" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" fw={500} tt="uppercase" style={{ letterSpacing: '0.06em' }}>
                {t('dashboard.operationsThisMonth')}
              </Text>
              <Text
                fw={800}
                size="1.6rem"
                mt={4}
                style={{
                  background: 'linear-gradient(135deg, #e0f2f1, #4db6ac)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {formatCompactNumber(operations.length, locale)}
              </Text>
            </div>
            <ThemeIcon
              size={48}
              radius="xl"
              color="teal"
              variant="light"
              style={{ border: '1px solid rgba(0, 150, 136, 0.2)' }}
            >
              <IconReceipt size={22} />
            </ThemeIcon>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Operations Table */}
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
                background: 'rgba(255, 193, 7, 0.1)',
                border: '1px solid rgba(255, 193, 7, 0.2)'
              }}
            >
              <IconTractor size={18} color="#ffd54f" />
            </Box>
            <Text fw={700} c="#e8f5e9">{t('operations.title')}</Text>
          </Group>
          <Badge variant="light" color="gold" size="sm">{operations.length}</Badge>
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t('operations.name')}</Table.Th>
              <Table.Th>{t('operations.category')}</Table.Th>
              <Table.Th>{t('operations.direction')}</Table.Th>
              <Table.Th>{t('operations.date')}</Table.Th>
              <Table.Th>{t('operations.amount')}</Table.Th>
              <Table.Th>{t('operations.quantity')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {operations.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Stack align="center" py="xl" gap="sm">
                    <ThemeIcon size={48} radius="xl" variant="light" color="gold">
                      <IconTractor size={24} />
                    </ThemeIcon>
                    <Text c="dimmed" size="sm">{t('common.empty')}</Text>
                  </Stack>
                </Table.Td>
              </Table.Tr>
            ) : (
              operations.map((operation) => (
                <Table.Tr key={operation.id}>
                  <Table.Td>
                    <Text size="sm" fw={500}>{operation.name}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="light"
                      color="ferma"
                      size="sm"
                      style={{
                        background: 'rgba(76, 175, 80, 0.08)',
                        border: '1px solid rgba(76, 175, 80, 0.12)'
                      }}
                    >
                      {t(`operationCategory.${operation.category}`)}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="light"
                      size="sm"
                      leftSection={
                        operation.direction === 'income'
                          ? <IconArrowUpRight size={12} />
                          : <IconArrowDownRight size={12} />
                      }
                      style={{
                        background: operation.direction === 'income'
                          ? 'rgba(76, 175, 80, 0.1)'
                          : 'rgba(239, 83, 80, 0.1)',
                        border: `1px solid ${operation.direction === 'income'
                          ? 'rgba(76, 175, 80, 0.2)'
                          : 'rgba(239, 83, 80, 0.2)'}`,
                        color: operation.direction === 'income' ? '#66bb6a' : '#ef5350'
                      }}
                    >
                      {t(`financialDirection.${operation.direction}`)}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">
                      {new Date(operation.date).toLocaleDateString(locale)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text
                      size="sm"
                      fw={600}
                      c={operation.direction === 'income' ? '#66bb6a' : '#ef5350'}
                    >
                      {operation.direction === 'income' ? '+' : '-'}{formatCurrency(operation.amount ?? 0, locale)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">
                      {operation.quantity ? `${operation.quantity} ${operation.unit ?? ''}`.trim() : '-'}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Card>

      {/* Add Operation Modal */}
      <Modal opened={opened} onClose={close} title={t('operations.add')} centered radius="xl" size="lg">
        <form onSubmit={form.onSubmit((values) => createMutation.mutate(values))}>
          <Stack>
            <TextInput label={t('operations.name')} required {...form.getInputProps('name')} radius="lg" />
            <SimpleGrid cols={2}>
              <Select
                label={t('operations.category')}
                data={operationCategories.map((value) => ({
                  value,
                  label: t(`operationCategory.${value}`)
                }))}
                {...form.getInputProps('category')}
                radius="lg"
              />
              <Select
                label={t('operations.direction')}
                data={['expense', 'income'].map((value) => ({
                  value,
                  label: t(`financialDirection.${value}`)
                }))}
                {...form.getInputProps('direction')}
                radius="lg"
              />
            </SimpleGrid>
            <SimpleGrid cols={2}>
              <TextInput label={t('operations.date')} type="date" required {...form.getInputProps('date')} radius="lg" />
              <TextInput label={t('operations.amount')} type="number" {...form.getInputProps('amount')} radius="lg" />
            </SimpleGrid>
            <SimpleGrid cols={3}>
              <TextInput label={t('operations.quantity')} type="number" {...form.getInputProps('quantity')} radius="lg" />
              <TextInput label={t('operations.unit')} {...form.getInputProps('unit')} radius="lg" />
              <TextInput label={t('operations.counterpart')} {...form.getInputProps('counterpart')} radius="lg" />
            </SimpleGrid>
            <Textarea label={t('operations.notes')} minRows={3} {...form.getInputProps('notes')} radius="lg" />
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
