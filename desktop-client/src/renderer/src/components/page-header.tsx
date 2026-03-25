import { Badge, Group, Stack, Text, Title } from '@mantine/core';
import { IconLeaf } from '@tabler/icons-react';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  badge?: string;
}

export const PageHeader = ({ title, subtitle, action, badge }: PageHeaderProps) => (
  <Group justify="space-between" align="flex-end" mb="lg" className="animate-in">
    <Stack gap={6}>
      {badge ? (
        <Badge
          color="ferma"
          variant="light"
          size="lg"
          leftSection={<IconLeaf size={12} />}
          style={{
            background: 'rgba(76, 175, 80, 0.1)',
            border: '1px solid rgba(76, 175, 80, 0.2)'
          }}
        >
          {badge}
        </Badge>
      ) : null}
      <Title
        order={2}
        style={{
          background: 'linear-gradient(135deg, #e8f5e9 20%, #a5d6a7 80%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '1.75rem'
        }}
      >
        {title}
      </Title>
      {subtitle ? (
        <Text c="dimmed" maw={720} size="sm" style={{ opacity: 0.7 }}>
          {subtitle}
        </Text>
      ) : null}
    </Stack>
    {action}
  </Group>
);
