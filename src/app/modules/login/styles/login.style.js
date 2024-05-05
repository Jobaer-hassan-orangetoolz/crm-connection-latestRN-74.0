import {StyleSheet} from 'react-native';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.white,
    ...customPadding(20, 24, 12, 24),
    borderTopLeftRadius: rs(12),
    borderTopRightRadius: rs(12),
  },
  headingText: {
    ...customPadding(12, 24, 24, 0),
  },
  gap16: {gap: 16},
  conditionText: {
    paddingVertical: rs(8),
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textAlign: {
    textAlign: 'center',
    color: colors.gray4,
  },
});
