import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {typographies} from '../../../../assets/styles/typographies.style.asset';
import RightArrow from '../../../../assets/icons/RightArrow.icon.asset';
import rs from '../../../../assets/styles/responsiveSize.style.asset';
import {
  customPadding,
  globalStyles,
} from '../../../../assets/styles/global.style.asset';

const DetailsCard: React.FC<{
  style?: ViewStyle;
  icon?: any;
  title: string;
  text?: string;
  rightIcon?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  component?: any;
  always?: boolean;
  rightIconComponent?: any;
}> = ({
  style,
  title,
  text,
  icon,
  onPress = () => {},
  rightIcon = true,
  disabled = false,
  component,
  always = false,
  rightIconComponent = '',
}) => {
  return (
    (component || text || always) && (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        disabled={disabled}
        style={[styles.container, style]}>
        {icon && <View style={{...customPadding(8, 8, 8, 8)}}>{icon}</View>}
        <View style={styles.middleContainer}>
          <View style={[globalStyles.flexShrink1]}>
            <Text
              style={[[typographies.bodyMediumBold, globalStyles.flexShrink1]]}>
              {title}
            </Text>
            {component ? (
              component
            ) : (
              <Text style={typographies.bodySmall} numberOfLines={4}>
                {text}
              </Text>
            )}
          </View>
          {rightIcon && (
            <View style={{...customPadding(8, 8, 8, 8)}}>
              {rightIconComponent ? (
                rightIconComponent
              ) : (
                <RightArrow height={rs(24)} width={rs(24)} />
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    gap: 8,
    ...customPadding(12, 12, 12, 12),
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    flexGrow: 1,
    flex: 1,
  },
});
