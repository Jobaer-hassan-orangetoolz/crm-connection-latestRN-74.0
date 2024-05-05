import React, {useRef} from 'react';
import {TextInput, View} from 'react-native';
import {inputLeftIconStyles as styles} from './styles/inputLeftIcon.styles';
import {multilineProps} from './inputInterface';
import {colors} from '../../../assets/styles/colors.style.asset';

const MultiLineInput: React.FC<multilineProps> = ({
  placeholder = '',
  onChangeText,
  defaultValue = '',
  name,
  validationRules = undefined,
  inputProps = {},
  placeholderTextColor = colors.gray2,
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
      <TextInput
        style={[styles.input, styles.multi]}
        numberOfLines={5}
        onChangeText={handleOnChange}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        defaultValue={defaultValue?.toString()}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        multiline={true}
        {...inputProps}
      />
    </View>
  );
};

export default MultiLineInput;
