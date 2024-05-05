import {Platform} from 'react-native';

export const fonts = {
  onest400: 'Onest-Regular',
  onest600: 'Onest-SemiBold',
};

export const fws = {
  font400: Platform.OS === 'android' ? '400' : 400,
  font600: Platform.OS === 'android' ? '600' : 600,
};
