import React, {useRef} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {inputLeftIconStyles as styles} from './styles/inputLeftIcon.styles';
import {inputWithIconProps} from './inputInterface';
import {colors} from '../../../assets/styles/colors.style.asset';

const InputWithIcon: React.FC<inputWithIconProps> = ({
  rightHandler,
  leftIcon,
  rightIcon,
  placeholder = '',
  onChangeText,
  defaultValue = '',
  name,
  validationRules = undefined,
  inputProps = {},
  style = {},
}) => {
  const containerRef = useRef<any>(null);
  const handleOnChange = (text: string) => {
    if (name && name?.trim() !== '') {
      onChangeText(text, name, validationRules);
    } else {
      onChangeText(text, undefined, validationRules);
    }
  };
  const handleOnFocus = () => {
    containerRef.current.setNativeProps({
      style: {...styles.activeContainer},
    });
  };
  const handleOnBlur = () => {
    containerRef.current.setNativeProps({
      style: {...styles.container},
    });
  };
  return (
    <View style={[styles.container, style]} ref={containerRef}>
      {leftIcon && <View>{leftIcon}</View>}
      <TextInput
        style={styles.input}
        numberOfLines={1}
        onChangeText={handleOnChange}
        placeholder={placeholder}
        placeholderTextColor={colors.gray4}
        defaultValue={defaultValue?.toString()}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...inputProps}
      />
      {rightIcon && (
        <TouchableOpacity activeOpacity={0.5} onPress={rightHandler}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputWithIcon;
