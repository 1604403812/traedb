import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

export const morandiTheme: ThemeConfig = {
  token: {
    colorPrimary: '#8B8685',
    colorSuccess: '#8B9A8B',
    colorWarning: '#A89B8B',
    colorError: '#9B8B8B',
    colorInfo: '#8E9AA8',
    colorBgContainer: '#FAFAF9',
    colorBgElevated: '#FFFFFF',
    colorBgLayout: '#F5F5F4',
    colorBgSpotlight: '#E7E5E4',
    colorBorder: '#D6D3D1',
    colorBorderSecondary: '#E7E5E4',
    colorText: '#1C1917',
    colorTextSecondary: '#78716C',
    colorTextTertiary: '#A8A29E',
    colorTextQuaternary: '#A8A29E',
    borderRadius: 12,
    borderRadiusLG: 20,
    borderRadiusSM: 8,
    fontFamily: "'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 15,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 17,
    fontSizeHeading5: 15,
    lineHeight: 1.6,
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32,
    motion: true,
    wireframe: false,
  },
  components: {
    Button: {
      borderRadius: 12,
      controlHeight: 40,
      paddingInline: 24,
      fontWeight: 500,
      defaultShadow: 'none',
      primaryShadow: '0 4px 16px rgba(139, 134, 133, 0.25)',
    },
    Card: {
      borderRadiusLG: 20,
      paddingLG: 24,
      colorBgContainer: '#FFFFFF',
    },
    Input: {
      borderRadius: 12,
      controlHeight: 44,
      paddingInline: 16,
      colorBgContainer: '#FFFFFF',
    },
    InputNumber: {
      borderRadius: 12,
      controlHeight: 44,
    },
    Select: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Modal: {
      borderRadiusLG: 20,
      paddingMD: 24,
    },
    Drawer: {
      borderRadiusLG: 20,
    },
    Menu: {
      borderRadius: 12,
      itemBorderRadius: 12,
      itemSelectedBg: 'rgba(139, 134, 133, 0.1)',
      itemSelectedColor: '#8B8685',
      itemHoverBg: 'rgba(139, 134, 133, 0.05)',
    },
    Tabs: {
      inkBarColor: '#8B8685',
      itemSelectedColor: '#8B8685',
      itemHoverColor: '#7A7574',
    },
    Tag: {
      borderRadiusSM: 8,
    },
    Badge: {
      borderRadiusSM: 8,
    },
    Progress: {
      defaultColor: '#8B9A8B',
    },
    Rate: {
      starColor: '#C4B5A0',
    },
    Empty: {
      colorText: '#A8A29E',
      colorTextDescription: '#78716C',
    },
    Pagination: {
      itemActiveBg: '#8B8685',
    },
    Table: {
      headerBg: '#F5F5F4',
      rowHoverBg: 'rgba(139, 134, 133, 0.04)',
    },
    Tooltip: {
      colorBgSpotlight: '#1C1917',
      borderRadius: 8,
    },
    Message: {
      borderRadius: 12,
    },
    Notification: {
      borderRadius: 16,
    },
  },
};

export const moduleColors = {
  audio: {
    primary: '#9B8E8A',
    light: '#D4C8C4',
    bg: 'rgba(155, 142, 138, 0.08)',
  },
  novel: {
    primary: '#8A9A8B',
    light: '#C8D4C8',
    bg: 'rgba(138, 154, 139, 0.08)',
  },
  wiki: {
    primary: '#8E9AA8',
    light: '#C4CDD4',
    bg: 'rgba(142, 154, 168, 0.08)',
  },
  bead: {
    primary: '#AA9B8E',
    light: '#D4C8BC',
    bg: 'rgba(170, 155, 142, 0.08)',
  },
  drive: {
    primary: '#8B9AA8',
    light: '#C8D0D8',
    bg: 'rgba(139, 154, 168, 0.08)',
  },
} as const;

export type ModuleType = keyof typeof moduleColors;

export const getModuleColor = (module: ModuleType) => {
  return moduleColors[module];
};
