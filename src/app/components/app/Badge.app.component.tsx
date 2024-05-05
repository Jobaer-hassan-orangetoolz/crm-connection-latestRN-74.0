import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../assets/styles/colors.style.asset';
import {customPadding} from '../../assets/styles/global.style.asset';
import {typographies} from '../../assets/styles/typographies.style.asset';
import CheckCircleIcon from '../../assets/icons/CheckCircle.icon.asset';
interface badge {
  text: string;
  style?: object;
  onPress?: () => void;
  textStyle?: object;
  classes?: 'primary' | 'secondary';
  check?: boolean;
}
const Badge: React.FC<badge> = ({
  text = '',
  style = {},
  onPress = () => {},
  textStyle = {},
  classes = 'primary',
  check = false,
}) => {
  const styles = badgeStyles;
  return (
    <TouchableOpacity
      style={[styles.container, styles[check ? 'check' : classes], style]}
      onPress={onPress}
      activeOpacity={0.5}>
      {check && (
        <CheckCircleIcon width={12} height={12} fill={colors.primary} />
      )}
      <Text
        style={[
          typographies.bodySmall,
          styles.text,
          styles[`${check ? 'check' : classes}Text`],
          textStyle,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Badge;

const badgeStyles = StyleSheet.create({
  container: {
    ...customPadding(4, 12, 4, 12),
    borderRadius: 100,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'flex-start',
  },
  check: {
    borderWidth: 1,
    backgroundColor: colors.transparent,
    borderColor: colors.primary,
    flexDirection: 'row',
    gap: 4,
  },
  primary: {
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  primaryText: {
    color: colors.white,
  },
  checkText: {color: colors.primary, ...typographies.labelLarge},
  secondary: {
    borderWidth: 1,
    backgroundColor: colors.gray9,
    borderColor: colors.gray8,
  },
  secondaryText: {
    color: colors.gray4,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
