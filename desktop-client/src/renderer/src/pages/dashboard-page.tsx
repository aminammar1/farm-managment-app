import { AreaChart, BarChart } from '@mantine/charts';
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  List,
  Paper,
  RingProgress,
  SimpleGrid,
  Stack,
  Table,
  Text,
  ThemeIcon
} from '@mantine/core';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCalendarEvent,
  IconChecklist,
  IconClipboardCheck,
  IconCoins,
  IconCurrencyDollar,
  IconLeaf,
  IconMapPin,
  IconPlant2,
  IconShieldHalfFilled,
  IconTractor,
  IconTrendingDown,
  IconTrendingUp
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { DashboardSummary } from '../../../shared/contracts';
import farmHero from '../assets/farm-hero-banner.png';
import { FarmMapSimulation } from '../components/farm-map-simulation';
import { PageHeader } from '../components/page-header';
import { StatCard } from '../components/stat-card';
import { apiFetch } from '../lib/api';
import { formatCompactNumber, formatCurrency, formatMonthLabel } from '../lib/format';

export const DashboardPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: () => apiFetch<DashboardSummary>('/api/dashboard/summary')
  });

  if (isLoading || !data) {
    return (
      <Stack align="center" justify="center" h="60vh" gap="lg">
        <Box
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: '3px solid rgba(79, 139, 76, 0.15)',
            borderTopColor: '#4f8b4c',
            animation: 'spin 1s linear infinite'
          }}
        />
        <Text c="dimmed" size="sm">{t('common.loading')}</Text>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </Stack>
    );
  }

  const locale = i18n.resolvedLanguage === 'fr' ? 'fr-TN' : i18n.resolvedLanguage === 'en' ? 'en-TN' : 'ar-TN';
  const financeChartData = data.financeTimeline.map((point) => ({
    month: formatMonthLabel(point.month, locale),
    revenue: point.revenue,
    expenses: point.expenses
  }));
  const herdChartData = data.livestockByType.map((entry) => ({
    type: t(`livestockType.${entry.type}`),
    total: entry.count
  }));
  const categoryChartData = data.operationsByCategory.slice(0, 6).map((entry) => ({
    category: t(`operationCategory.${entry.category}`),
    total: entry.total
  }));
  const taskStatusMap = Object.fromEntries(data.taskStatusSummary.map((entry) => [entry.status, entry.count]));
  const totalTasks = (taskStatusMap.pending ?? 0) + (taskStatusMap.inProgress ?? 0) + (taskStatusMap.done ?? 0);
  const completionRate = totalTasks > 0 ? Math.round(((taskStatusMap.done ?? 0) / totalTasks) * 100) : 0;
  const netIsPositive = data.monthlyNet >= 0;

  return (
    <Stack gap="xl">
      <PageHeader
        title={t('dashboard.title')}
        subtitle={t('dashboard.hero')}
        badge="Ferma-TN"
      />

      <Card className="dashboard-hero" padding="xl" radius="xl" withBorder>
        <SimpleGrid cols={{ base: 1, xl: 2 }} spacing="xl">
          <Stack gap="lg" style={{ position: 'relative', zIndex: 1 }}>
            <div>
              <Group gap="sm" mb="md">
                <Badge color="ferma" variant="light" size="lg" leftSection={<IconLeaf size={14} />} className="title-badge">
                  Ferma-TN
                </Badge>
                <Badge color="gold" variant="light" size="lg" leftSection={<IconMapPin size={14} />}>
                  Tunisia
                </Badge>
              </Group>

              <Text fw={800} style={{ fontSize: '2.1rem', lineHeight: 1.12 }} className="page-title-gradient">
                {t('dashboard.heroTitle')}
              </Text>
              <Text mt="md" maw={580} size="md" className="hero-description" lineClamp={3} style={{ lineHeight: 1.75 }}>
                {t('dashboard.heroDescription')}
              </Text>
            </div>

            <Group gap="sm" wrap="wrap">
              <Button
                color="ferma"
                radius="xl"
                size="md"
                leftSection={<IconLeaf size={16} />}
                style={{ boxShadow: '0 4px 18px rgba(79, 139, 76, 0.2)' }}
              >
                {formatCompactNumber(data.livestockCount, locale)} {t('dashboard.livestockCount')}
              </Button>
              <Button
                variant="light"
                radius="xl"
                size="md"
                leftSection={<IconCoins size={16} />}
                className={netIsPositive ? 'metric-positive' : 'metric-negative'}
                style={{
                  background: netIsPositive ? 'rgba(79, 139, 76, 0.1)' : 'rgba(212, 91, 67, 0.1)',
                  border: `1px solid ${netIsPositive ? 'rgba(79, 139, 76, 0.22)' : 'rgba(212, 91, 67, 0.2)'}`
                }}
              >
                {formatCurrency(data.monthlyNet, locale)}
              </Button>
            </Group>

            <List
              spacing="sm"
              icon={
                <ThemeIcon color="ferma" radius="xl" size={24} variant="light">
                  <IconArrowUpRight size={14} />
                </ThemeIcon>
              }
              className="soft-text"
            >
              <List.Item>{t('dashboard.heroPointRevenue')}</List.Item>
              <List.Item>{t('dashboard.heroPointLivestock')}</List.Item>
              <List.Item>{t('dashboard.heroPointPlanning')}</List.Item>
            </List>
          </Stack>

          <div className="dashboard-hero-image">
            <Image src={farmHero} alt="Tunisian farm landscape" radius="xl" />
          </div>
        </SimpleGrid>
      </Card>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 5 }} spacing="lg">
        <div className="animate-in animate-in-delay-1">
          <StatCard
            label={t('dashboard.livestockCount')}
            value={formatCompactNumber(data.livestockCount, locale)}
            icon={<IconLeaf size={22} />}
            color="ferma"
            hint={t('dashboard.herdBalance')}
          />
        </div>
        <div className="animate-in animate-in-delay-2">
          <StatCard
            label={t('dashboard.pendingTasks')}
            value={formatCompactNumber(data.pendingTasks, locale)}
            icon={<IconChecklist size={22} />}
            color="gold"
            hint={`${taskStatusMap.inProgress ?? 0} ${t('taskStatus.inProgress')}`}
          />
        </div>
        <div className="animate-in animate-in-delay-3">
          <StatCard
            label={t('dashboard.monthlyRevenue')}
            value={formatCurrency(data.monthlyRevenue, locale)}
            icon={<IconTrendingUp size={22} />}
            color="teal"
            hint={`${formatCompactNumber(data.operationsThisMonth, locale)} ${t('dashboard.operationsThisMonth')}`}
          />
        </div>
        <div className="animate-in animate-in-delay-4">
          <StatCard
            label={t('dashboard.monthlyExpenses')}
            value={formatCurrency(data.monthlyExpenses, locale)}
            icon={<IconTrendingDown size={22} />}
            color="red"
            hint={t('operations.directionExpense')}
          />
        </div>
        <div className="animate-in animate-in-delay-4">
          <StatCard
            label={t('dashboard.animalsUnderMonitoring')}
            value={formatCompactNumber(data.animalsUnderMonitoring, locale)}
            icon={<IconShieldHalfFilled size={22} />}
            color="yellow"
            hint={`${formatCompactNumber(data.completedTasks, locale)} ${t('dashboard.completedTasks')}`}
          />
        </div>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
        {[
          { icon: IconLeaf, label: t('livestock.add'), color: '#4f8b4c', to: '/livestock' },
          { icon: IconChecklist, label: t('tasks.add'), color: '#7b9e43', to: '/tasks' },
          { icon: IconTractor, label: t('operations.add'), color: '#c9902f', to: '/operations' },
          { icon: IconCalendarEvent, label: t('dashboard.upcomingTasks'), color: '#2f8b79', to: '/tasks' }
        ].map((action) => (
          <Paper
            key={action.label}
            className="quick-action-btn"
            p="md"
            radius="xl"
            role="button"
            tabIndex={0}
            onClick={() => navigate(action.to)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigate(action.to);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <Group gap="sm" justify="space-between" wrap="nowrap">
              <Group gap="sm" wrap="nowrap">
                <ThemeIcon
                  size={36}
                  radius="xl"
                  variant="light"
                  style={{
                    background: `${action.color}18`,
                    border: `1px solid ${action.color}30`,
                    color: action.color
                  }}
                >
                  <action.icon size={18} />
                </ThemeIcon>
                <Text size="sm" fw={600} className="section-heading quick-action-label">
                  {action.label}
                </Text>
              </Group>
              <ThemeIcon
                size={30}
                radius="xl"
                variant="light"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--app-border)',
                  color: 'var(--app-text-secondary)'
                }}
              >
                <IconArrowRight size={16} />
              </ThemeIcon>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, xl: 3 }} spacing="lg">
        <Card className="chart-card" padding="lg" radius="xl" withBorder>
          <div className="chart-card-header">
            <Box className="chart-icon ferma">
              <IconTrendingUp size={18} color="#4f8b4c" />
            </Box>
            <Text fw={700} className="section-heading">{t('dashboard.financeTrend')}</Text>
          </div>
          <AreaChart
            h={260}
            data={financeChartData}
            dataKey="month"
            curveType="bump"
            series={[
              { name: 'revenue', color: 'ferma.5', label: t('dashboard.monthlyRevenue') },
              { name: 'expenses', color: 'gold.5', label: t('dashboard.monthlyExpenses') }
            ]}
            withLegend
            gridProps={{ strokeDasharray: '3 3' }}
          />
        </Card>

        <Card className="chart-card" padding="lg" radius="xl" withBorder>
          <div className="chart-card-header">
            <Box className="chart-icon ferma">
              <IconPlant2 size={18} color="#7b9e43" />
            </Box>
            <Text fw={700} className="section-heading">{t('dashboard.herdBalance')}</Text>
          </div>
          <BarChart
            h={260}
            data={herdChartData}
            dataKey="type"
            series={[{ name: 'total', color: 'ferma.5', label: t('dashboard.livestockCount') }]}
            tickLine="xy"
            gridProps={{ strokeDasharray: '3 3' }}
          />
        </Card>

        <Card className="chart-card" padding="lg" radius="xl" withBorder>
          <div className="chart-card-header">
            <Box className="chart-icon gold">
              <IconClipboardCheck size={18} color="#c9902f" />
            </Box>
            <Text fw={700} className="section-heading">{t('dashboard.taskStatusSummary')}</Text>
          </div>

          <Group justify="center" mt="md">
            <RingProgress
              size={180}
              thickness={16}
              roundCaps
              sections={[
                { value: completionRate, color: '#4f8b4c' },
                { value: 100 - completionRate, color: 'rgba(79, 139, 76, 0.14)' }
              ]}
              label={
                <Stack align="center" gap={0}>
                  <Text fw={800} size="xl" className="section-heading">{completionRate}%</Text>
                  <Text size="xs" c="dimmed">{t('taskStatus.done')}</Text>
                </Stack>
              }
            />
          </Group>

          <SimpleGrid cols={3} mt="lg">
            {data.taskStatusSummary.map((entry, index) => (
              <Stack key={entry.status} align="center" gap={4}>
                <Text fw={700} size="lg" className="section-heading">{entry.count}</Text>
                <Text size="xs" c="dimmed">{t(`taskStatus.${entry.status}`)}</Text>
                <Box
                  h={3}
                  w="100%"
                  style={{
                    borderRadius: 2,
                    background: ['#4f8b4c', '#c9902f', '#7a8e88'][index % 3]
                  }}
                />
              </Stack>
            ))}
          </SimpleGrid>
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, xl: 2 }} spacing="lg">
        <Card className="chart-card" padding="lg" radius="xl" withBorder>
          <div className="chart-card-header">
            <Box className="chart-icon teal">
              <IconTractor size={18} color="#2f8b79" />
            </Box>
            <Text fw={700} className="section-heading">{t('dashboard.operationsByCategory')}</Text>
          </div>
          <BarChart
            h={260}
            data={categoryChartData}
            dataKey="category"
            series={[{ name: 'total', color: 'emerald.4', label: t('dashboard.operationsThisMonth') }]}
            gridProps={{ strokeDasharray: '3 3' }}
          />
        </Card>

        <Card className="chart-card" padding="lg" radius="xl" withBorder>
          <Group justify="space-between" mb="lg">
            <div className="chart-card-header" style={{ marginBottom: 0 }}>
              <Box className="chart-icon ferma">
                <IconCalendarEvent size={18} color="#4f8b4c" />
              </Box>
              <Text fw={700} className="section-heading">{t('dashboard.upcomingTasks')}</Text>
            </div>
            <Badge variant="light" color="ferma" size="sm">
              {data.upcomingTasks.length}
            </Badge>
          </Group>

          {data.upcomingTasks.length === 0 ? (
            <Stack align="center" py="xl" gap="sm">
              <ThemeIcon size={48} radius="xl" variant="light" color="ferma">
                <IconChecklist size={24} />
              </ThemeIcon>
              <Text c="dimmed" size="sm">{t('common.empty')}</Text>
            </Stack>
          ) : (
            <Stack gap="sm">
              {data.upcomingTasks.slice(0, 5).map((task) => (
                <Paper
                  key={task.id}
                  p="sm"
                  radius="lg"
                  style={{
                    background: 'rgba(79, 139, 76, 0.06)',
                    border: '1px solid rgba(79, 139, 76, 0.1)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Group justify="space-between">
                    <Group gap="sm">
                      <Box
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: task.priority === 'high' ? '#d45b43' : task.priority === 'medium' ? '#c9902f' : '#4f8b4c'
                        }}
                      />
                      <Text size="sm" fw={500} className="section-heading">{task.title}</Text>
                    </Group>
                    <Group gap="xs">
                      <Badge
                        size="xs"
                        variant="light"
                        color={task.status === 'done' ? 'ferma' : task.status === 'inProgress' ? 'gold' : 'gray'}
                      >
                        {t(`taskStatus.${task.status}`)}
                      </Badge>
                      {task.dueDate ? (
                        <Text size="xs" c="dimmed">
                          {new Date(task.dueDate).toLocaleDateString(locale)}
                        </Text>
                      ) : null}
                    </Group>
                  </Group>
                </Paper>
              ))}
            </Stack>
          )}
        </Card>
      </SimpleGrid>

      <FarmMapSimulation />

      <Card className="chart-card" padding="lg" radius="xl" withBorder>
        <Group justify="space-between" mb="lg">
          <div className="chart-card-header" style={{ marginBottom: 0 }}>
            <Box className="chart-icon gold">
              <IconCurrencyDollar size={18} color="#c9902f" />
            </Box>
            <Text fw={700} className="section-heading">{t('dashboard.recentOperations')}</Text>
          </div>
          <Badge variant="light" color="gold" size="sm">
            {data.recentOperations.length}
          </Badge>
        </Group>

        <div className="table-shell">
          <Table.ScrollContainer minWidth={760}>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{t('operations.name')}</Table.Th>
                  <Table.Th>{t('operations.category')}</Table.Th>
                  <Table.Th>{t('operations.direction')}</Table.Th>
                  <Table.Th>{t('operations.date')}</Table.Th>
                  <Table.Th>{t('operations.amount')}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.recentOperations.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={5}>
                      <Text c="dimmed" ta="center" py="md">{t('common.empty')}</Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  data.recentOperations.map((operation) => (
                    <Table.Tr key={operation.id}>
                      <Table.Td>
                        <Text size="sm" fw={500}>{operation.name}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color="ferma" size="sm">
                          {t(`operationCategory.${operation.category}`)}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          variant="light"
                          size="sm"
                          color={operation.direction === 'income' ? 'ferma' : 'red'}
                          style={{
                            background: operation.direction === 'income'
                              ? 'rgba(79, 139, 76, 0.1)'
                              : 'rgba(212, 91, 67, 0.1)',
                            border: `1px solid ${operation.direction === 'income'
                              ? 'rgba(79, 139, 76, 0.2)'
                              : 'rgba(212, 91, 67, 0.2)'}`
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
                          fw={700}
                          className={operation.direction === 'income' ? 'metric-positive' : 'metric-negative'}
                        >
                          {operation.direction === 'income' ? '+' : '-'}{formatCurrency(operation.amount ?? 0, locale)}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </div>
      </Card>
    </Stack>
  );
};
