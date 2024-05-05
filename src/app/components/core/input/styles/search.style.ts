import {StyleSheet} from 'react-native';
import {customPadding} from '../../../../assets/styles/global.style.asset';
import {colors} from '../../../../assets/styles/colors.style.asset';
import {typographies} from '../../../../assets/styles/typographies.style.asset';

export const searchStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...customPadding(5, 20, 5, 20),
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  input: {
    flexGrow: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    ...typographies.bodyMedium,
  },
  crossIconWrp: {display: 'flex'},
  crossIconWrpNone: {display: 'none'},
});
