import { Badge, Card, Group, SegmentedControl, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import {
  IconDroplet,
  IconLeaf,
  IconMapPin,
  IconPlant2,
  IconShieldHalfFilled
} from '@tabler/icons-react';
import { useMemo, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

type SimulationMode = 'irrigation' | 'health' | 'harvest';
type ZoneStatus = 'good' | 'attention' | 'urgent';

interface ZoneDefinition {
  id: 'olive' | 'greenhouse' | 'livestock' | 'water' | 'packhouse';
  icon: typeof IconLeaf;
  top: string;
  left: string;
  width: string;
  height: string;
  background: string;
  edge: string;
  metrics: Record<SimulationMode, string>;
  status: Record<SimulationMode, ZoneStatus>;
}

const zoneStatusColor: Record<ZoneStatus, string> = {
  good: '#4f8b4c',
  attention: '#c9902f',
  urgent: '#d45b43'
};

const zones: ZoneDefinition[] = [
  {
    id: 'olive',
    icon: IconLeaf,
    top: '11%',
    left: '6%',
    width: '24%',
    height: '22%',
    background: 'linear-gradient(135deg, #709e49, #48773d)',
    edge: '#3e6135',
    metrics: { irrigation: '18 mm', health: '3 alerts', harvest: '620 kg' },
    status: { irrigation: 'good', health: 'attention', harvest: 'good' }
  },
  {
    id: 'greenhouse',
    icon: IconPlant2,
    top: '14%',
    left: '38%',
    width: '24%',
    height: '22%',
    background: 'linear-gradient(135deg, #5bb3a0, #2b756f)',
    edge: '#265e58',
    metrics: { irrigation: '72%', health: 'Stable', harvest: 'Ready soon' },
    status: { irrigation: 'attention', health: 'good', harvest: 'attention' }
  },
  {
    id: 'livestock',
    icon: IconShieldHalfFilled,
    top: '50%',
    left: '10%',
    width: '24%',
    height: '22%',
    background: 'linear-gradient(135deg, #c59a65, #8d6640)',
    edge: '#705233',
    metrics: { irrigation: 'Water 2h', health: 'Vaccines 4', harvest: 'Milk peak' },
    status: { irrigation: 'good', health: 'urgent', harvest: 'good' }
  },
  {
    id: 'water',
    icon: IconDroplet,
    top: '50%',
    left: '40%',
    width: '24%',
    height: '22%',
    background: 'linear-gradient(135deg, #6fb8ef, #3b72b6)',
    edge: '#315b8c',
    metrics: { irrigation: '63%', health: 'Clean', harvest: 'Reservoir ok' },
    status: { irrigation: 'good', health: 'good', harvest: 'good' }
  },
  {
    id: 'packhouse',
    icon: IconMapPin,
    top: '17%',
    left: '70%',
    width: '22%',
    height: '24%',
    background: 'linear-gradient(135deg, #d1ab6a, #9e7442)',
    edge: '#7a5932',
    metrics: { irrigation: 'Logistics', health: 'Check temp', harvest: '2 trucks' },
    status: { irrigation: 'attention', health: 'attention', harvest: 'good' }
  }
];

const summaryByMode: Record<
  SimulationMode,
  Array<{ labelKey: string; value: string; tone: 'water' | 'zones' | 'ready' | 'health' }>
> = {
  irrigation: [
    { labelKey: 'dashboard.mapSummary.water', value: '63%', tone: 'water' },
    { labelKey: 'dashboard.mapSummary.zones', value: '5', tone: 'zones' },
    { labelKey: 'dashboard.mapSummary.ready', value: '3', tone: 'ready' },
    { labelKey: 'dashboard.mapSummary.health', value: '1', tone: 'health' }
  ],
  health: [
    { labelKey: 'dashboard.mapSummary.health', value: '4', tone: 'health' },
    { labelKey: 'dashboard.mapSummary.zones', value: '5', tone: 'zones' },
    { labelKey: 'dashboard.mapSummary.ready', value: '3', tone: 'ready' },
    { labelKey: 'dashboard.mapSummary.water', value: '63%', tone: 'water' }
  ],
  harvest: [
    { labelKey: 'dashboard.mapSummary.ready', value: '2 trucks', tone: 'ready' },
    { labelKey: 'dashboard.mapSummary.zones', value: '5', tone: 'zones' },
    { labelKey: 'dashboard.mapSummary.water', value: '63%', tone: 'water' },
    { labelKey: 'dashboard.mapSummary.health', value: '4', tone: 'health' }
  ]
};

export const FarmMapSimulation = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<SimulationMode>('irrigation');
  const [activeZoneId, setActiveZoneId] = useState<ZoneDefinition['id']>('olive');
  const [tilt, setTilt] = useState({ x: 14, y: -10 });

  const activeZone = useMemo(() => zones.find((zone) => zone.id === activeZoneId) ?? zones[0], [activeZoneId]);
  const ActiveIcon = activeZone.icon;

  const boardStyle = {
    '--map-tilt-x': `${tilt.x}deg`,
    '--map-tilt-y': `${tilt.y}deg`
  } as CSSProperties;

  return (
    <Card className="chart-card" padding="lg" radius="xl" withBorder>
      <Group justify="space-between" align="flex-start" mb="lg">
        <Stack gap={4}>
          <Group gap="sm">
            <Badge color="gold" variant="light">{t('dashboard.mapBadge')}</Badge>
            <Badge color="ferma" variant="light">{t(`dashboard.mapModes.${mode}`)}</Badge>
            <Badge variant="outline">3D</Badge>
          </Group>
          <Text fw={700} size="lg" className="section-heading">
            {t('dashboard.mapTitle')}
          </Text>
          <Text size="sm" className="farm-map-note">
            {t('dashboard.mapSubtitle')}
          </Text>
        </Stack>
      </Group>

      <div className="farm-map-shell">
        <div className="farm-map-stage">
          <div className="farm-map-hud">
            <span className="farm-map-hud-pill">{t('dashboard.mapFocus')}</span>
            <span className="farm-map-hud-pill">{t(`dashboard.mapModes.${mode}`)}</span>
          </div>

          <div
            className="farm-map-board-shell"
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const px = (event.clientX - rect.left) / rect.width;
              const py = (event.clientY - rect.top) / rect.height;
              setTilt({
                x: 11 + (0.5 - py) * 8,
                y: (px - 0.5) * 12
              });
            }}
            onMouseLeave={() => {
              setTilt({ x: 14, y: -10 });
            }}
          >
            <div className="farm-map-board" style={boardStyle}>
              <div className="farm-map-ground" />
              <div className="farm-map-road horizontal" />
              <div className="farm-map-road vertical" />
              <div className="farm-map-water-shine" />

              {zones.map((zone) => {
                const status = zone.status[mode];
                const ZoneIcon = zone.icon;

                return (
                  <UnstyledButton
                    key={zone.id}
                    className="farm-zone-3d"
                    data-active={zone.id === activeZone.id}
                    onClick={() => setActiveZoneId(zone.id)}
                    style={
                      {
                        top: zone.top,
                        left: zone.left,
                        width: zone.width,
                        height: zone.height,
                        '--zone-top': zone.background,
                        '--zone-edge': zone.edge,
                        '--zone-status': zoneStatusColor[status]
                      } as CSSProperties
                    }
                  >
                    <span className="farm-zone-3d-shadow" />
                    <span className="farm-zone-3d-face" />
                    <span className="farm-zone-3d-side front" />
                    <span className="farm-zone-3d-side right" />
                    <span className="farm-zone-3d-content">
                      <span className="farm-zone-3d-head">
                        <ThemeIcon variant="white" color="dark" size={32} radius="xl">
                          <ZoneIcon size={16} />
                        </ThemeIcon>
                        <span className="farm-zone-3d-status-dot" />
                      </span>
                      <span className="farm-zone-3d-body">
                        <span className="farm-zone-label">{t(`dashboard.mapZones.${zone.id}`)}</span>
                        <span className="farm-zone-3d-sub">{t(`dashboard.mapStatus.${status}`)}</span>
                      </span>
                      <span className="farm-zone-3d-meta">{zone.metrics[mode]}</span>
                    </span>
                  </UnstyledButton>
                );
              })}
            </div>
          </div>
        </div>

        <div className="farm-map-side">
          <div className="farm-map-mode-card">
            <div className="farm-map-card-head">
              <div>
                <Text size="xs" fw={700} className="farm-map-eyebrow">
                  {t('dashboard.mapFocus')}
                </Text>
                <Text fw={700} className="section-heading">
                  {t('dashboard.mapTitle')}
                </Text>
              </div>
              <Badge variant="light" color="ferma">
                3D
              </Badge>
            </div>
            <SegmentedControl
              value={mode}
              onChange={(value) => setMode(value as SimulationMode)}
              fullWidth
              radius="xl"
              data={[
                { value: 'irrigation', label: t('dashboard.mapModes.irrigation') },
                { value: 'health', label: t('dashboard.mapModes.health') },
                { value: 'harvest', label: t('dashboard.mapModes.harvest') }
              ]}
            />
          </div>

          <div className="farm-map-info-card">
            <div className="farm-map-card-head">
              <Group gap="sm" wrap="nowrap">
                <ThemeIcon color="ferma" variant="light" radius="xl" size={42}>
                  <ActiveIcon size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" fw={700} className="farm-map-eyebrow">
                    {t(`dashboard.mapModes.${mode}`)}
                  </Text>
                  <Text fw={800} className="section-heading">
                    {t(`dashboard.mapZones.${activeZone.id}`)}
                  </Text>
                </div>
              </Group>
            </div>
            <div className="farm-map-detail-metric">
              <Text size="xs" fw={700} className="farm-map-eyebrow">
                {t('dashboard.mapFocus')}
              </Text>
              <Text fw={800} className="section-heading" size="1.4rem">
                {activeZone.metrics[mode]}
              </Text>
            </div>
            <Text size="sm" className="farm-map-note">
              {t(`dashboard.mapRecommendations.${activeZone.id}.${mode}`, {
                metric: activeZone.metrics[mode]
              })}
            </Text>
          </div>

          <div className="farm-map-kpis">
            {summaryByMode[mode].map((entry) => (
              <div key={entry.labelKey} className="farm-map-kpi" data-tone={entry.tone}>
                <div className="farm-map-kpi-top">
                  <div className="farm-map-kpi-dot" />
                  <div className="farm-map-kpi-label">{t(entry.labelKey)}</div>
                </div>
                <div className="farm-map-kpi-value">{entry.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
