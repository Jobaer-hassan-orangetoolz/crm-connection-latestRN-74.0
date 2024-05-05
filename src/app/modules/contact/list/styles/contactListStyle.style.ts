import {StyleSheet} from 'react-native';
import rs from '../../../../assets/styles/responsiveSize.style.asset';
import {
  customPadding,
  customMargin,
} from '../../../../assets/styles/global.style.asset';
export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rs(20),
  },
  headingText: {
    ...customPadding(12, 0, 12, 0),
  },
  searchBox: {...customMargin(8, 0, 20, 0)},
  bodyWrapper: {},
});
