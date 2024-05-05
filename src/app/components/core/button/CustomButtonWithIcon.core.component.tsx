import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {ReactElement} from 'react';
import {customButtonStyle as styles} from './styles/buttonStyles';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import Loading from '../../../assets/lottie/Loading.lottie.asset';

type buttonProps = {
  icon: ReactElement;
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
  isLoading?: boolean;
  disabled?: boolean;
  textStyle?: object | null;
  wrapperStyles?: object | null;
  classes?: 'primary' | 'secondary' | 'disable';
  iconPosition?: 'left' | 'right';
};
const CustomButtonWithIcon: React.FC<buttonProps> = ({
  text,
  icon,
  onPress = () => {},
  style,
  isLoading = false,
  disabled = false,
  textStyle = {},
  classes = 'primary',
  iconPosition = 'left',
}) => {
  const handlePress = () => {
    if (!isLoading) {
      onPress();
    }
  };
  const renderButton = () => {
    return (
      <View style={styles.iconGap}>
        {iconPosition === 'left' && icon}
        {text && (
          <Text
            style={[
              typographies.buttonLarge,
              (styles as any)[classes + 'Text'],
              textStyle,
            ]}
            numberOfLines={1}>
            {text}
          </Text>
        )}
        {iconPosition === 'right' && icon}
      </View>
    );
  };
  return (
    <TouchableOpacity
      style={[styles.container, (styles as any)[classes], style]}
      onPress={handlePress}
      disabled={isLoading || disabled}
      activeOpacity={0.5}>
      {isLoading ? <Loading styles={styles.lottie} /> : renderButton()}
    </TouchableOpacity>
  );
};

export default CustomButtonWithIcon;
