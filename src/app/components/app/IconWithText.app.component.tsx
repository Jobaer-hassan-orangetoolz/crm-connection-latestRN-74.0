import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import rs from '../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
interface iconWithText {
  Icon: any;
  text: string;
  style?: ViewStyle;
  classes?: 'primary' | 'disabled' | 'border';
  onPress: () => void;
  border?: string;
  bg?: string;
  iconColor?: string;
}
const IconWithText: React.FC<iconWithText> = ({
  Icon = <></>,
  text = '',
  style = {},
  classes = 'primary',
  onPress = () => {},
  border = '',
  bg = '',
  iconColor = '',
}) => {
  const iconStyles = styles(border, bg);
  return (
    <TouchableOpacity
      style={[iconStyles.container, style]}
      disabled={classes === 'disabled' ? true : false}
      onPress={onPress}>
      <View style={[iconStyles.iconContainer, (iconStyles as any)[classes]]}>
        <Icon fill={iconColor || mainIconColor[classes]} />
      </View>
      <Text
        style={[
          typographies.bodySmallBold,
          (iconStyles as any)[`${classes}Text`],
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default IconWithText;

const styles = (border?: string, bg?: string) =>
  StyleSheet.create({
    container: {
      gap: 8,
      alignItems: 'center',
    },
    iconContainer: {
      height: rs(56),
      width: rs(56),
      justifyContent: 'center',
      borderRadius: 100,
      alignItems: 'center',
    },
    primary: {
      backgroundColor: bg || colors.primary,
    },
    border: {
      borderWidth: 2,
      borderColor: border || colors.primary,
    },
    disabled: {
      backgroundColor: colors.secondary,
    },
    primaryText: {
      color: colors.gray4,
    },
    disabledText: {
      color: colors.gray6,
    },
    borderText: {
      color: colors.gray4,
    },
  });

const mainIconColor = {
  primary: colors.white,
  disabled: colors.gray6,
  border: colors.primary,
};
