import {StyleSheet} from 'react-native';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {
  customMargin,
  customPadding,
} from '../../../assets/styles/global.style.asset';

export const profileStyles = StyleSheet.create({
  imageContainer: {
    top: 20,
    zIndex: 1,
    alignSelf: 'center',
  },
  image: {
    height: rs(120),
    width: rs(120),
    borderWidth: 6,
    borderColor: colors.white,
    borderRadius: 500,
  },
  container: {
    backgroundColor: colors.white,
    ...customMargin(-40, 20, 20, 20),
    position: 'relative',
    borderRadius: 12,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    zIndex: 3,
    right: 5,
    width: rs(32),
    height: rs(32),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  updateProfileContainer: {
    ...customPadding(12, 20, 4, 20),
    flex: 1,
    justifyContent: 'space-between',
  },
  appointmentContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    gap: 32,
    ...customMargin(8, 0, 8),
  },
});
