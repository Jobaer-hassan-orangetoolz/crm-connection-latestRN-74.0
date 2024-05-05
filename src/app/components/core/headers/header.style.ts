import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';

export const headerStyles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showBorder: {borderBottomWidth: 1, borderBottomColor: colors.gray8},
  noBorder: {borderBottomWidth: 0},
  title: {
    ...typographies.bodyLargeBold,
    flexGrow: 1,
    flexShrink: 1,
  },
  headerTitle: {
    ...typographies.bodyLargeBold,
    flexShrink: 1,
    ...customPadding(0, 20),
  },
  rightActive: {
    ...customPadding(8, 16, 8, 16),
    ...typographies.buttonMedium,
    backgroundColor: colors.primary,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
  rightDisable: {
    ...customPadding(8, 16, 8, 16),
    ...typographies.buttonMedium,
    backgroundColor: colors.gray9,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    color: colors.gray6,
  },
  onlyIconHeaderContainer: {
    height: rs(60),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...customPadding(0, 20, 0, 20),
  },
  flex: {alignItems: 'center', gap: 16, flexDirection: 'row', flexShrink: 1},
  border: {borderBottomWidth: 1, borderBottomColor: colors.gray8},
});
