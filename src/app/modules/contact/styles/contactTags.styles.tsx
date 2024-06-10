import {StyleSheet} from 'react-native';
import {customPadding} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';

export const contactTagsStyles = StyleSheet.create({
  container: {
    ...customPadding(8),
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  gap_8: {gap: rs(8)},
  taskContainer: {backgroundColor: colors.white, flexGrow: 1},
  flexGrow: {flexGrow: 1},
});
