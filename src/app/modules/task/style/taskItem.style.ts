import {StyleSheet} from 'react-native';
import {
  customMargin,
  customPadding,
} from '../../../assets/styles/global.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';

export const taskItemStyles = StyleSheet.create({
  container: {
    ...customPadding(20, 20, 20, 20),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBlockColor: colors.gray8,
  },
  flexShrink: {flexShrink: 1},
  topText: {
    textTransform: 'uppercase',
    ...customMargin(0, 0, 2),
    color: colors.primary,
  },
  taskHeader: {flexDirection: 'row', gap: 16},
  taskComponentCont: {
    justifyContent: 'space-between',
    flex: 1,
  },
  contactBtnCont: {
    ...customMargin(8, 0, 8),
    borderWidth: 1,
    borderColor: colors.gray8,
    ...customPadding(12, 16, 12, 16),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'space-between',
  },
  taskIconCont: {flexDirection: 'row', gap: 12, alignItems: 'center'},
});
