import {StyleSheet} from 'react-native';
import {colors} from '../../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../../assets/styles/global.style.asset';
import {typographies} from '../../../../assets/styles/typographies.style.asset';
import rs from '../../../../assets/styles/responsiveSize.style.asset';

export const inputLeftIconStyles = StyleSheet.create({
  container: {
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray8,
    backgroundColor: colors.gray9,
    ...customPadding(0, 16, 0, 16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeContainer: {borderColor: colors.primary, backgroundColor: colors.white},
  errorContainer: {borderColor: colors.error1},
  input: {
    ...typographies.bodyMedium,
    color: colors.gray0,
    flexGrow: 1,
    flex: 1,
  },
  multi: {textAlignVertical: 'top', maxHeight: rs(150)},
});
