import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';

export const callStyles = StyleSheet.create({
  iconContainer: {backgroundColor: colors.white},
  contactContainer: {backgroundColor: colors.gray8, flex: 1},
  inputWrp: {
    ...customPadding(10, 0, 10, 0),
    borderBottomColor: colors.gray7,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  textInput: {alignItems: 'center', textAlign: 'center'},
  listWrp: {...customPadding(16, 0, 16, 0), gap: rs(8)},
  eachContactWrp: {...customPadding(8, 20, 8, 20)},
  keyboardWrp: {
    borderTopLeftRadius: rs(20),
    borderTopRightRadius: rs(20),
    backgroundColor: colors.white,
    maxHeight: rs(400, 'h'),
    paddingBottom: rs(20),
    paddingTop: rs(20),
  },
  keyWrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexGrow: 1,
    ...customPadding(0, 16, 0, 16),
  },
  eachKey: {
    flexGrow: 1,
    flexBasis: '33%',
    padding: rs(15),
    alignItems: 'center',
  },
  callIcon: {
    backgroundColor: colors.primary,
    height: rs(64),
    width: rs(64),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
