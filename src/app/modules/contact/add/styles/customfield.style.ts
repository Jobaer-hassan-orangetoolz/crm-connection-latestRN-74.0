import {StyleSheet} from 'react-native';
import {typographies} from '../../../../assets/styles/typographies.style.asset';
import {colors} from '../../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../../assets/styles/global.style.asset';

const layoutStyles = StyleSheet.create({
  container: {gap: 8, flexGrow: 1},
  textWrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  remove: {...typographies.bodySmallBold, color: colors.error1},
});

const customFieldListStyles = StyleSheet.create({
  container: {...customPadding(12, 20, 12, 20), flex: 1, gap: 10},
  lottie: {height: '100%', width: '100%', alignSelf: 'center'},
  title: {...typographies.bodyXS, color: colors.gray4},
});

const eachCustomFieldStyles = StyleSheet.create({
  container: {gap: 0, ...customPadding(12, 0, 12, 0)},
  info: {...typographies.bodySmall, color: colors.gray4},
});

export {layoutStyles, customFieldListStyles, eachCustomFieldStyles};
