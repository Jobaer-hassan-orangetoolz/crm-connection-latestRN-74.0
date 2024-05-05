import {StyleSheet} from 'react-native';
import {customPadding} from '../../../../assets/styles/global.style.asset';
import {colors} from '../../../../assets/styles/colors.style.asset';

export const addContactStyles = StyleSheet.create({
  container: {flex: 1},
  containerStyle: {gap: 20, ...customPadding(24, 20, 24, 20)},
  groupFieldWrp: {gap: 12, flexDirection: 'row'},
  groupField: {gap: 12, flexDirection: 'row'},
  hasMore: {color: colors.primary},
});
