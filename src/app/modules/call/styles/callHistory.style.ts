import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';

export const callHistoryStyles = StyleSheet.create({
  header: {borderBottomWidth: 1, borderBottomColor: colors.gray8},
  flatlistContainer: {gap: 4, ...customPadding(12, 0, 12, 0)},
  eachCall: {...customPadding(8, 20, 8, 20), flexDirection: 'row', gap: 13},
  icon: {alignItems: 'center', justifyContent: 'center'},
  dateText: {...typographies.bodySmall, color: colors.gray4},
  titleWrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    flexGrow: 1,
  },
});
