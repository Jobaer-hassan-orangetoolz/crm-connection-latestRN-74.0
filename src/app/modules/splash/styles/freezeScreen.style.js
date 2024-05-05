import {StyleSheet} from 'react-native';
import {
  customPadding,
  customBorderRadius,
} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {fonts} from '../../../assets/styles/fonts.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {
  activityHeight,
  getHexaOpacityColorCode,
} from '../../../utilities/helper.utility';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../assets/js/core.data';
import {typographies} from '../../../assets/styles/typographies.style.asset';

export const freezeScreenStyles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: getHexaOpacityColorCode(colors.gray0, 0.5),
    zIndex: 1,
  },
  bodyWrp: {...customPadding(20, 20, 0, 20)},
  bottomWrp: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    ...customPadding(20, 20, activityHeight(), 20),
    ...customBorderRadius(12, 12),
    zIndex: 2,
    elevation: 5,
    gap: 12,
  },
  noInfo: {
    height: 300,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomHeader: {gap: 8},
  des: {...typographies.bodyMedium, color: colors.gray4},
  desLink: {...typographies.bodyMedium, color: colors.primary},
  linkView: {paddingTop: 20},
});
