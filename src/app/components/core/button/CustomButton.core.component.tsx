import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {customButtonStyle as styles} from './styles/buttonStyles';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import Loading from '../../../assets/lottie/Loading.lottie.asset';

type buttonProps = {
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
  isLoading?: boolean;
  disabled?: boolean;
  textStyle?: object | null;
  wrapperStyles?: object | null;
  classes?: 'primary' | 'secondary' | 'disable' | 'error';
};
const CustomButton: React.FC<buttonProps> = ({
  text,
  onPress = () => {},
  style,
  isLoading = false,
  disabled = false,
  textStyle = {},
  classes = 'primary',
}) => {
  const handlePress = () => {
    if (!isLoading) {
      onPress();
    }
  };
  const renderButton = () => {
    return (
      text && (
        <Text
          style={[
            typographies.buttonLarge,
            (styles as any)[classes + 'Text'],
            textStyle,
          ]}
          numberOfLines={1}>
          {text}
        </Text>
      )
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

export default CustomButton;
