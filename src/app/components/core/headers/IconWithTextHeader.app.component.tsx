import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useCustomNavigation} from '../../../packages/navigation.package';
import LeftArrowIcon from '../../../assets/icons/LeftArrow.icon.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {onlyIconHeaderInterface} from './interface';
import {headerStyles} from './header.style';

const IconWithTextHeader: React.FC<onlyIconHeaderInterface> = ({
  leftIcon = <LeftArrowIcon height={28} width={28} />,
  rightComponent = <></>,
  controlLeftIcon,
  text = '',
  style = {},
  border = false,
}) => {
  const navigation = useCustomNavigation();
  const onPress = () => {
    controlLeftIcon ? controlLeftIcon() : navigation.goBack();
  };
  const styles = headerStyles;
  return (
    <View
      style={[styles.onlyIconHeaderContainer, border && styles.border, style]}>
      <View style={styles.flex}>
        <TouchableOpacity
          style={{...customPadding(5, 5, 5, 0)}}
          onPress={onPress}>
          {leftIcon}
        </TouchableOpacity>
        {text && (
          <Text style={styles.headerTitle} numberOfLines={1}>
            {text}
          </Text>
        )}
      </View>
      {rightComponent}
    </View>
  );
};

export default IconWithTextHeader;
