import {StyleSheet} from 'react-native';
import {
  customPadding,
  customMargin,
} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rs(20),
  },
  headingText: {
    ...customPadding(12, 0, 12, 0),
    color: colors.gray0,
  },
  bodyWrapper: {
    flex: 1,
  },
  actionTab: {
    flexDirection: 'row',
    gap: rs(8),
    ...customPadding(16, 20, 16, 20),
  },
});
