import {StyleSheet} from 'react-native';
import {customPadding} from '../../../assets/styles/global.style.asset';

export const addItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...customPadding(16, 20, 16, 20),
    alignItems: 'center',
  },
  itemContainer: {
    ...customPadding(8, 20, 8, 20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
