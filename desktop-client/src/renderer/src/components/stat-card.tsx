import { Card, Group, Text, ThemeIcon, Tooltip } from '@mantine/core';
import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  color: string;
  hint?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatCard = ({ label, value, icon, color, hint }: StatCardProps) => (
  <Tooltip label={hint} disabled={!hint} position="bottom" withArrow>
    <Card className="stat-card" data-color={color} padding="lg" radius="xl" withBorder>
      <Group justify="space-between" align="flex-start" wrap="nowrap" style={{ height: '100%' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text
            size="xs"
            c="dimmed"
            fw={500}
            tt="uppercase"
            lineClamp={2}
            style={{ letterSpacing: '0.06em', color: 'var(--app-text-muted)' }}
          >
            {label}
          </Text>
          <Text fw={800} size="1.85rem" mt={8} className="page-title-gradient">
            {value}
          </Text>
          {hint ? (
            <Text size="xs" c="dimmed" mt={6} className="soft-text" lineClamp={2} style={{ opacity: 0.78 }}>
              {hint}
            </Text>
          ) : null}
        </div>
        <ThemeIcon
          size={52}
          radius="xl"
          color={color}
          variant="light"
          style={{
            boxShadow: `0 4px 16px rgba(76, 175, 80, 0.15)`,
            border: '1px solid rgba(76, 175, 80, 0.12)'
          }}
        >
          {icon}
        </ThemeIcon>
      </Group>
    </Card>
  </Tooltip>
);
