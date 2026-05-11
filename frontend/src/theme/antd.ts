import { theme } from 'ant-design-vue'

export function buildAntdTheme(isDark: boolean) {
  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#8B8685',
      colorSuccess: '#8B9A8B',
      colorWarning: '#A89B8B',
      colorError: '#9B8B8B',
      colorInfo: '#8E9AA8',
      colorTextBase: isDark ? '#F5F5F4' : '#1C1917',
      colorBgBase: isDark ? '#1A1918' : '#FAFAF9',
      fontFamily: "'Noto Sans SC', sans-serif",
      borderRadius: 12,
      wireframe: false,
    },
    components: {
      Layout: {
        bodyBg: 'transparent',
        headerBg: 'transparent',
        siderBg: 'transparent',
      },
      Button: {
        controlHeight: 42,
        paddingInline: 20,
        borderRadius: 12,
      },
      Card: {
        borderRadiusLG: 20,
      },
      Input: {
        controlHeight: 44,
        borderRadius: 12,
      },
      Select: {
        controlHeight: 44,
        borderRadius: 12,
      },
      Drawer: {
        colorBgElevated: isDark ? 'rgba(28, 26, 24, 0.96)' : 'rgba(255, 255, 255, 0.92)',
      },
    },
  }
}
