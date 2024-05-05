import {StyleSheet} from 'react-native';
import {customPadding} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {fonts} from '../../../assets/styles/fonts.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';

export const styles = StyleSheet.create({
  container: {
    ...customPadding(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rs(-15),
  },
  text: {
    marginTop: rs(10),
    fontFamily: fonts.onest400,
    fontSize: rs(14),
    lineHeight: rs(18),
    color: colors.splash.text,
  },
  lottieContainer: {
    height: rs(70),
    width: rs(70),
    top: 10,
    marginLeft: -20,
  },
  lottie: {height: '100%', width: '100%', alignSelf: 'center'},
});
