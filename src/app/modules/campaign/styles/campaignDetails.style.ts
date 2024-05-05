import {StyleSheet} from 'react-native';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';

export const campaignDetailsStyles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  middleContainer: {
    flexDirection: 'row',
    gap: 28,
    flexWrap: 'wrap',
    ...customPadding(20, 24, 20, 24),
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  width: {maxWidth: '45%', flexGrow: 1},
});
