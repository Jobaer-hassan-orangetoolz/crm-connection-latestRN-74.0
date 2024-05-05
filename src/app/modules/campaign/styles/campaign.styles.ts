import {StyleSheet} from 'react-native';
import {customPadding} from '../../../assets/styles/global.style.asset';

export const campaignStyles = StyleSheet.create({
  headerContainer: {
    ...customPadding(12, 15, 12, 15),
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flex: {
    flex: 0,
  },
  folderContainer: {flexDirection: 'row', gap: 4, alignItems: 'center'},
});
