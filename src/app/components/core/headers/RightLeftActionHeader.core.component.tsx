import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {headerStyles as styles} from './header.style';
import {rightLeftActionProps} from './interface';
import CrossIcon from '../../../assets/icons/Cross.icon.asset';
import {useCustomNavigation} from '../../../packages/navigation.package';
import SearchIcon from '../../../assets/icons/Search.icon.asset';
import BadgeButton from '../button/BadgeButton.core.component';

const RightLeftActionHeader: React.FC<rightLeftActionProps> = ({
  border = 'showBorder',
  containerStyles = {},
  leftIcon = <CrossIcon height={28} width={28} />,
  leftIconHandler,
  right = <SearchIcon height={28} width={28} />,
  rightHandler = () => {},
  title = '',
  rightHandlerDisable = true,
  isAnimating = false,
}) => {
  const navigation = useCustomNavigation();
  const onPressRightIcon = () => {
    if (leftIconHandler) {
      leftIconHandler();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={[styles.container, styles[border], containerStyles]}>
      {leftIcon && (
        <TouchableOpacity onPress={onPressRightIcon}>
          {leftIcon}
        </TouchableOpacity>
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {typeof right === 'string' ? (
        <BadgeButton
          text={right}
          handler={rightHandler}
          isAnimating={isAnimating}
          rightHandlerDisable={rightHandlerDisable}
          textStyle={
            rightHandlerDisable ? styles.rightDisable : styles.rightActive
          }
        />
      ) : (
        <TouchableOpacity onPress={rightHandler} activeOpacity={0.3}>
          {right}
        </TouchableOpacity>
      )}
    </View>
  );
};
export default RightLeftActionHeader;
