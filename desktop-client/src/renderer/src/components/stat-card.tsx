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
      <Group justify="space-between" align="flex-start">
        <div>
          <Text size="xs" c="dimmed" fw={500} tt="uppercase" style={{ letterSpacing: '0.06em' }}>
            {label}
          </Text>
          <Text
            fw={800}
            size="1.85rem"
            mt={8}
            style={{
              background: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {value}
          </Text>
          {hint ? (
            <Text size="xs" c="dimmed" mt={6} style={{ opacity: 0.65 }}>
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
