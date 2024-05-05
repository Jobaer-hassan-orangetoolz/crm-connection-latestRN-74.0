import {StyleSheet} from 'react-native';
import rs from '../../../../assets/styles/responsiveSize.style.asset';
import {customPadding} from '../../../../assets/styles/global.style.asset';
import {colors} from '../../../../assets/styles/colors.style.asset';

export const customButtonStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: rs(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    width: 'auto',
    flexGrow: 1,
    maxHeight: rs(56),
    ...customPadding(16, 20, 16, 20),
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  disable: {
    backgroundColor: colors.gray9,
  },
  error: {
    backgroundColor: colors.error1,
  },
  primaryText: {
    color: colors.white,
  },
  errorText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.gray0,
  },
  disableText: {
    color: colors.gray6,
  },
  lottie: {
    height: rs(100),
    width: '100%',
    alignSelf: 'center',
  },
  iconGap: {flexDirection: 'row', gap: 10},
});
