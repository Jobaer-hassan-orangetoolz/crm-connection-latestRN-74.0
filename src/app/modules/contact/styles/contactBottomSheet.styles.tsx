import {StyleSheet} from 'react-native';
import {
  customMargin,
  customPadding,
} from '../../../assets/styles/global.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';

export const contactBottomSheetStyles = StyleSheet.create({
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...customMargin(20, 0, 20),
  },
  headerContainer: {flexDirection: 'row', gap: 16},
  blockCont: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    ...customPadding(8, 16, 8, 16),
    borderRadius: 10,
    backgroundColor: colors.error2,
  },
  moreActionIconCont: {
    height: rs(44),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    ...customPadding(0, 20, 0, 20),
  },
});
