import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {getHexaOpacityColorCode} from '../../../utilities/helper.utility';

export const callPreviewStyles = StyleSheet.create({
  container: {
    ...customPadding(24, 0, 0, 0),
    justifyContent: 'space-between',
    flex: 1,
  },
  infoWrp: {gap: 20, alignItems: 'center'},
  flexRow: {flexDirection: 'row', ...customPadding(0, 20, 0, 20)},
  textWrp: {alignItems: 'center', gap: 20},
  textWrpAlt: {alignItems: 'flex-start', gap: 7},
  textCon: {gap: 4, alignItems: 'center'},
  textConAlt: {alignItems: 'flex-start'},
  number: {...typographies.bodyMedium, color: colors.gray4},
  statusText: {...typographies.bodyMediumBold, color: colors.primary},
  footerWrp: {
    ...customPadding(12, 0, 20, 0),
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  elevation: {elevation: 1},
  keyWrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  eachKey: {
    flexGrow: 1,
    flexBasis: '33%',
    padding: rs(20),
    alignItems: 'center',
  },
  visible: {opacity: 1},
  notVisible: {opacity: 0},
  inputWrp: {
    ...customPadding(10, 0, 10, 0),
    justifyContent: 'center',
  },
  textInput: {alignItems: 'center', textAlign: 'center'},
  actionIcon: {
    height: 64,
    width: 64,
    backgroundColor: colors.gray8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceInactive: {backgroundColor: colors.primary, opacity: 0.2},
  activeIcon: {
    backgroundColor: getHexaOpacityColorCode(colors.primary, 0.6),
  },
  callIconReject: {backgroundColor: colors.error1},
  callIconReceive: {backgroundColor: colors.success1},
  vnText: {color: colors.gray4},
});
