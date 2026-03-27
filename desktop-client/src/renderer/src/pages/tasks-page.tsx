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
  IconChecklist,
  IconCircleCheck,
  IconClock,
  IconDroplet,
  IconFirstAidKit,
  IconGrain,
  IconHammer,
  IconPlant,
  IconPlus,
  IconProgressCheck,
  IconSparkles,
  IconToolsKitchen2
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { TaskRecord } from '../../../shared/contracts';
import { PageHeader } from '../components/page-header';
import { apiFetch } from '../lib/api';
import { getErrorMessage } from '../lib/errors';
import type { ReactNode } from 'react';

const priorityConfig: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  high: { bg: 'rgba(212, 91, 67, 0.12)', border: 'rgba(212, 91, 67, 0.26)', text: '#d45b43', dot: '#d45b43' },
  medium: { bg: 'rgba(201, 144, 47, 0.12)', border: 'rgba(201, 144, 47, 0.28)', text: '#c9902f', dot: '#c9902f' },
  low: { bg: 'rgba(79, 139, 76, 0.12)', border: 'rgba(79, 139, 76, 0.24)', text: '#4f8b4c', dot: '#4f8b4c' }
};

const categoryIcons: Record<string, ReactNode> = {
  feeding: <IconGrain size={14} />,
  watering: <IconDroplet size={14} />,
  cleaning: <IconSparkles size={14} />,
  health: <IconFirstAidKit size={14} />,
  maintenance: <IconHammer size={14} />,
  harvest: <IconPlant size={14} />
};

export const TasksPage = () => {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const locale = i18n.resolvedLanguage === 'fr' ? 'fr-TN' : i18n.resolvedLanguage === 'en' ? 'en-TN' : 'ar-TN';

  const form = useForm({
    initialValues: {
      title: '',
      category: 'feeding',
      priority: 'medium',
      dueDate: '',
      notes: ''
    }
  });

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: () => apiFetch<TaskRecord[]>('/api/tasks')
  });

  const createMutation = useMutation({
    mutationFn: (values: typeof form.values) =>
      apiFetch<TaskRecord>('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(values)
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
      form.reset();
      close();
    },
    onError: (error) => {
      notifications.show({ color: 'red', message: getErrorMessage(error) });
    }
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskRecord['status'] }) =>
      apiFetch<TaskRecord>(`/api/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      await queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    }
  });

  const tasks = tasksQuery.data ?? [];
  const pendingCount = tasks.filter((tk) => tk.status === 'pending').length;
  const progressCount = tasks.filter((tk) => tk.status === 'inProgress').length;
  const doneCount = tasks.filter((tk) => tk.status === 'done').length;

  return (
    <Stack gap="xl">
      <PageHeader
        title={t('tasks.title')}
        badge="Ferma-TN"
        action={
          <Button
            color="ferma"
            radius="xl"
            leftSection={<IconPlus size={16} />}
            onClick={open}
            style={{ boxShadow: '0 4px 20px rgba(76, 175, 80, 0.25)' }}
          >
            {t('tasks.add')}
          </Button>
        }
      />

      {/* Task Status Summary */}
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {[
          { label: 'taskStatus.pending', count: pendingCount, color: '#90a4ae', Icon: IconClock, cssClass: '' },
          { label: 'taskStatus.inProgress', count: progressCount, color: '#ffd54f', Icon: IconProgressCheck, cssClass: 'gold' },
          { label: 'taskStatus.done', count: doneCount, color: '#66bb6a', Icon: IconCircleCheck, cssClass: 'green' }
        ].map((item, index) => (
          <Card key={index} className={`summary-card ${item.cssClass}`} padding="lg" radius="xl" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" fw={500} tt="uppercase" style={{ letterSpacing: '0.06em' }}>
                  {t(item.label)}
                </Text>
                <Text fw={800} size="2rem" mt={4} style={{ color: item.color }}>
                  {item.count}
                </Text>
              </div>
              <ThemeIcon
                size={48}
                radius="xl"
                variant="light"
                style={{
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}30`,
                  color: item.color
                }}
              >
                <item.Icon size={22} />
              </ThemeIcon>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      {/* Tasks Table */}
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
                background: 'rgba(139, 195, 74, 0.1)',
                border: '1px solid rgba(139, 195, 74, 0.2)'
              }}
            >
              <IconChecklist size={18} color="#aed581" />
            </Box>
            <Text fw={700} className="section-heading">{t('tasks.title')}</Text>
          </Group>
          <Badge variant="light" color="ferma" size="sm">{tasks.length}</Badge>
        </Group>

        <div className="table-shell">
          <Table.ScrollContainer minWidth={760}>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{t('tasks.task')}</Table.Th>
                  <Table.Th>{t('tasks.category')}</Table.Th>
                  <Table.Th>{t('tasks.priority')}</Table.Th>
                  <Table.Th>{t('tasks.status')}</Table.Th>
                  <Table.Th>{t('tasks.dueDate')}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {tasks.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={5}>
                      <Stack align="center" py="xl" gap="sm">
                        <ThemeIcon size={48} radius="xl" variant="light" color="ferma">
                          <IconChecklist size={24} />
                        </ThemeIcon>
                        <Text c="dimmed" size="sm">{t('common.empty')}</Text>
                      </Stack>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  tasks.map((task) => {
                    const pc = priorityConfig[task.priority] ?? priorityConfig.medium;
                    return (
                      <Table.Tr key={task.id}>
                        <Table.Td>
                          <Group gap="xs">
                            <Box
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: pc.dot,
                                flexShrink: 0
                              }}
                            />
                            <Text size="sm" fw={500}>{task.title}</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Badge
                            variant="light"
                            color="ferma"
                            size="sm"
                            leftSection={categoryIcons[task.category] ?? <IconChecklist size={14} />}
                            style={{
                              background: 'rgba(76, 175, 80, 0.08)',
                              border: '1px solid rgba(76, 175, 80, 0.12)'
                            }}
                          >
                            {t(`taskCategory.${task.category}`)}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Badge
                            variant="light"
                            size="sm"
                            style={{
                              background: pc.bg,
                              border: `1px solid ${pc.border}`,
                              color: pc.text
                            }}
                          >
                            {t(`taskPriority.${task.priority}`)}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Select
                            value={task.status}
                            data={['pending', 'inProgress', 'done'].map((value) => ({
                              value,
                              label: t(`taskStatus.${value}`)
                            }))}
                            onChange={(value) => {
                              if (value) {
                                statusMutation.mutate({ id: task.id, status: value as TaskRecord['status'] });
                              }
                            }}
                            allowDeselect={false}
                            size="xs"
                            radius="lg"
                            styles={{
                              input: {
                                background: 'var(--app-bg-panel-strong)',
                                borderColor: 'var(--app-border)',
                                color: 'var(--app-text-primary)',
                                fontSize: '0.8rem'
                              }
                            }}
                          />
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" c="dimmed">
                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString(locale) : '-'}
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </div>
      </Card>

      {/* Add Task Modal */}
      <Modal opened={opened} onClose={close} title={t('tasks.add')} centered radius="xl" size="lg" classNames={{ content: 'task-editor-modal' }}>
        <form onSubmit={form.onSubmit((values) => createMutation.mutate(values))}>
          <Stack>
            <TextInput label={t('tasks.task')} required {...form.getInputProps('title')} radius="lg" />
            <SimpleGrid cols={2}>
              <Select
                label={t('tasks.category')}
                data={['feeding', 'watering', 'cleaning', 'health', 'maintenance', 'harvest'].map((value) => ({
                  value,
                  label: t(`taskCategory.${value}`)
                }))}
                {...form.getInputProps('category')}
                radius="lg"
                classNames={{ input: 'task-form-input', dropdown: 'task-form-dropdown', option: 'task-form-option' }}
              />
              <Select
                label={t('tasks.priority')}
                data={['low', 'medium', 'high'].map((value) => ({
                  value,
                  label: t(`taskPriority.${value}`)
                }))}
                {...form.getInputProps('priority')}
                radius="lg"
                classNames={{ input: 'task-form-input', dropdown: 'task-form-dropdown', option: 'task-form-option' }}
              />
            </SimpleGrid>
            <TextInput label={t('tasks.dueDate')} type="date" {...form.getInputProps('dueDate')} radius="lg" classNames={{ input: 'task-form-input' }} />
            <Textarea label={t('tasks.notes')} minRows={3} {...form.getInputProps('notes')} radius="lg" classNames={{ input: 'task-form-input' }} />
            <Group justify="flex-end" mt="sm">
              <Button variant="default" onClick={close} radius="xl" className="form-secondary-btn">
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
