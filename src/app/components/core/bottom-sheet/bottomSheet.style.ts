import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../assets/js/core.data';
import {colors} from '../../../assets/styles/colors.style.asset';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    // top: 0,
    // check again
    bottom: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    zIndex: 999,
  },
  backdrop: {backgroundColor: '#131517b3', flex: 1},
  backdropHandler: {flex: 1},
  viewContainer: {
    height: 'auto',
    maxHeight: '70%',
    minHeight: '30%',
    backgroundColor: colors.white,
    borderTopStartRadius: 14,
    borderTopEndRadius: 14,
    paddingTop: 14,
  },
});
export default styles;
