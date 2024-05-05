/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {customPadding} from '../../assets/styles/global.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';

interface ClickableTextProps {
  text: string;
  onPress: () => void;
  hasUnderline?: boolean;
  style?: any;
  wrpStyle?: ViewStyle;
  disabled?: boolean;
}
const ClickableText: React.FC<ClickableTextProps> = ({
  text = '',
  onPress = () => {},
  hasUnderline = false,
  style = {},
  wrpStyle = {},
  disabled = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        wrpStyle,
        typographies.bodySmallBold,
        {display: disabled ? 'none' : 'flex', color: colors.gray2},
      ]}>
      <Text style={[styles.text, hasUnderline ? styles.underline : {}, style]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default ClickableText;

const styles = StyleSheet.create({
  container: {alignSelf: 'flex-start'},
  text: {
    alignSelf: 'flex-start',
    ...customPadding(0, 5, 0, 5),
  },
  underline: {textDecorationLine: 'underline'},
});
