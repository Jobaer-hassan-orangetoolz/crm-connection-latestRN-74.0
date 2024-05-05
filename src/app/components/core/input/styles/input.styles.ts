import {ReactElement} from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../../../assets/styles/colors.style.asset';
import {fonts} from '../../../../assets/styles/fonts.style.asset';

export const inputStyles: (
  rightIcon?: ReactElement | null | boolean,
  leftIcon?: ReactElement | null | boolean,
  borderColor?: string,
  bgColor?: string,
) => {inputCont: any; leftIcon: any; input: any} = (
  rightIcon,
  leftIcon,
  borderColor,
  bgColor,
) => {
  return StyleSheet.create({
    inputCont: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: borderColor,
      borderRadius: 8,
      paddingLeft: leftIcon ? 16 : 0,
      paddingRight: rightIcon ? 16 : 0,
      backgroundColor: bgColor,
      width: '100%',
      position: 'relative',
    },
    leftIcon: {
      position: 'absolute',
      right: 16,
    },
    input: {
      color: colors.gray0,
      fontSize: 16,
      fontFamily: fonts.onest400,
      paddingVertical: 12,
      paddingRight: rightIcon ? 12 : 16,
      paddingLeft: leftIcon ? 8 : 16,
      flex: 1,
      textAlignVertical: 'center',
    },
  });
};
