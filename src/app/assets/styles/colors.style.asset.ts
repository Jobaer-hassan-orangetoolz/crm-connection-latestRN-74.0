import {config} from '../../../config';
const appColors = {
  ...config.appColors,
};
const baseColors = {
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
  whiteOpacity: '#FF573300',
  gray0: '#1B1D20',
  gray1: '#323436',
  gray2: '#494A4D',
  gray3: '#5F6163',
  gray4: '#767779',
  gray5: '#98999B',
  gray6: '#AFB0B1',
  gray7: '#DDDDDE',
  gray8: '#E8E8E9',
  gray9: '#F4F4F4',
  gray10: '#FAFAFB',
  success1: '#3B8756',
  success2: '#CEFDD6',
  success3: '#F7FFF5',
  error1: '#E8191C',
  error2: '#FFECEA',
  error3: '#FFFBFF',
  info1: '#EFCC41',
  gray2Opacity2: '#32343633',
};
const propertiesColor = {
  button: {
    primary: appColors.primary,
    primaryText: baseColors.white,
    secondary: baseColors.gray1,
    secondaryText: baseColors.white,
    disable: baseColors.gray9,
    disableText: baseColors.gray10,
    warn: baseColors.error1,
    warnText: baseColors.white,
  },
  bottomTab: {
    activeColor: appColors.primary,
    inactive: baseColors.black,
  },
  tab: {
    activeTab: appColors.primary,
    activeText: baseColors.black,
    inactiveTab: baseColors.transparent,
    inactiveText: baseColors.gray0,
  },
  icon: {
    color: appColors.primary,
    altColor: baseColors.white,
  },
  splash: {
    // bg: '#1847D6',
    bg: appColors.splashBg,
    text: appColors.splashText,
  },
  contact: {
    background: baseColors.gray9,
    border: baseColors.gray8,
    text: baseColors.gray4,
  },
  drawer: {
    bg: appColors.primary,
    text: baseColors.white,
    select: baseColors.gray0,
    selectedText: baseColors.white,
    icon: baseColors.white,
    selectedIcon: baseColors.white,
    divider: baseColors.gray0,
    ...appColors.drawer,
  },
};
export const colors = {
  ...appColors,
  ...baseColors,
  ...propertiesColor,
};
