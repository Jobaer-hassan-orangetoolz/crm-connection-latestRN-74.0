import React, {useRef} from 'react';
import {TextInput, View} from 'react-native';
import {inputLeftIconStyles as styles} from './styles/inputLeftIcon.styles';
import {inputLeftIconProps} from './inputInterface';
import {colors} from '../../../assets/styles/colors.style.asset';

const InputLeftIcon: React.FC<inputLeftIconProps> = ({
  icon,
  placeholder = '',
  onChangeText,
  defaultValue = '',
  name,
  validationRules = undefined,
  inputProps = {},
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
    <View style={styles.container} ref={containerRef}>
      {icon && <View>{icon}</View>}
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
    </View>
  );
};

export default InputLeftIcon;
