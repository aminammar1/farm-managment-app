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
          className="title-badge"
        >
          {badge}
        </Badge>
      ) : null}
      <Title order={2} className="page-title-gradient" style={{ fontSize: '1.75rem', lineHeight: 1.1 }}>
        {title}
      </Title>
      {subtitle ? (
        <Text c="dimmed" maw={720} size="sm" className="soft-text" lineClamp={2} style={{ opacity: 0.88 }}>
          {subtitle}
        </Text>
      ) : null}
    </Stack>
    {action}
  </Group>
);
