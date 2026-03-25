import { createTheme } from '@mantine/core';

export const appTheme = createTheme({
  primaryColor: 'ferma',
  fontFamily: '"Cairo", sans-serif',
  defaultRadius: 'lg',
  headings: {
    fontFamily: '"Cairo", sans-serif'
  },
  colors: {
    ferma: [
      '#e8f5e9',
      '#c8e6c9',
      '#a5d6a7',
      '#81c784',
      '#66bb6a',
      '#4caf50',
      '#43a047',
      '#388e3c',
      '#2e7d32',
      '#1b5e20'
    ],
    emerald: [
      '#e0f2f1',
      '#b2dfdb',
      '#80cbc4',
      '#4db6ac',
      '#26a69a',
      '#009688',
      '#00897b',
      '#00796b',
      '#00695c',
      '#004d40'
    ],
    gold: [
      '#fff8e1',
      '#ffecb3',
      '#ffe082',
      '#ffd54f',
      '#ffca28',
      '#ffc107',
      '#ffb300',
      '#ffa000',
      '#ff8f00',
      '#ff6f00'
    ],
    earth: [
      '#efebe9',
      '#d7ccc8',
      '#bcaaa4',
      '#a1887f',
      '#8d6e63',
      '#795548',
      '#6d4c41',
      '#5d4037',
      '#4e342e',
      '#3e2723'
    ],
    olive: [
      '#f1f8e9',
      '#dcedc8',
      '#c5e1a5',
      '#aed581',
      '#9ccc65',
      '#8bc34a',
      '#7cb342',
      '#689f38',
      '#558b2f',
      '#33691e'
    ],
    sky: [
      '#e3f2fd',
      '#bbdefb',
      '#90caf9',
      '#64b5f6',
      '#42a5f5',
      '#2196f3',
      '#1e88e5',
      '#1976d2',
      '#1565c0',
      '#0d47a1'
    ]
  },
  other: {
    background:
      'linear-gradient(135deg, #0a1f14 0%, #0d2818 25%, #122d1c 50%, #0a2015 75%, #071a10 100%)',
    shell:
      'linear-gradient(180deg, rgba(15,40,25,0.98) 0%, rgba(10,32,20,0.96) 100%)',
    cardBg: 'rgba(20, 50, 35, 0.65)',
    cardBorder: 'rgba(76, 175, 80, 0.15)',
    glowGreen: 'rgba(76, 175, 80, 0.25)',
    glowGold: 'rgba(255, 193, 7, 0.15)',
    textPrimary: '#e8f5e9',
    textSecondary: 'rgba(200, 230, 201, 0.7)',
    textMuted: 'rgba(165, 214, 167, 0.5)'
  }
});
