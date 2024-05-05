import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';

export const taskStyle = StyleSheet.create({
  tabBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray8,
  },
  addNewBtnContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  goBackBtn: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  mainBtn: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...customPadding(12, 20, 12, 20),
    alignItems: 'center',
  },
});
