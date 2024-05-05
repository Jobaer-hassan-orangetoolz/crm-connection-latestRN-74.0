import React, {useRef, useState} from 'react';
import {
  KeyboardType,
  Pressable,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {inputStyles} from './styles/input.styles';
import {placeholders} from '../../../assets/js/placeholders.message';
import {colors} from '../../../assets/styles/colors.style.asset';
import LockIcon from '../../../assets/icons/Lock.icon.asset';
import EyeOffIcon from '../../../assets/icons/EyeOff.icon.asset';
import EyeOnIcon from '../../../assets/icons/EyeOn.icon.asset';
import {inputLeftIconStyles as styles} from './styles/inputLeftIcon.styles';

type PasswordInputProps = {
  style?: ViewStyle;
  keyboardType?: KeyboardType;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  onChangeText?: (text: string, name?: string) => void;
  editable?: boolean;
  borderColor?: string;
  defaultValue?: string;
  bgColor?: string;
  inputRef?: React.RefObject<TextInput>;
  name?: string;
  onSubmitEditing?: () => void;
  returnKeyType?: TextInputProps['returnKeyType'];
};
const PasswordInput: React.FC<PasswordInputProps> = ({
  style = {},
  keyboardType = 'default',
  placeholder = placeholders.default,
  maxLength = 256,
  value,
  onChangeText = () => {},
  borderColor = colors.gray8,
  defaultValue = '',
  bgColor = colors.secondary,
  inputRef,
  name = '',
  onSubmitEditing = () => {},
  returnKeyType = 'done',
}: PasswordInputProps) => {
  const customInputStyle = inputStyles(true, true, borderColor, bgColor);
  const [isShowPass, setIsShowPass] = useState(false);
  const containerRef = useRef<any>(null);
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
  const handleOnChange = (text: string) => {
    if (name && name?.trim() !== '') {
      onChangeText(text, name);
    } else {
      onChangeText(text);
    }
  };
  const toggleShowPass = () => {
    setIsShowPass(!isShowPass);
  };
  return (
    <View style={[customInputStyle.inputCont, style]} ref={containerRef}>
      <View>{<LockIcon width={20} height={20} />}</View>
      <TextInput
        style={[customInputStyle.input]}
        cursorColor={colors.primary}
        placeholderTextColor={colors.gray4}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        value={value?.toString()}
        onChangeText={handleOnChange}
        defaultValue={defaultValue?.toString()}
        ref={inputRef}
        selectionColor={colors.primary}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        secureTextEntry={!isShowPass}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <View style={[customInputStyle.leftIcon]}>
        <Pressable onPress={toggleShowPass}>
          {isShowPass === true ? (
            <EyeOffIcon width={20} height={20} />
          ) : (
            <EyeOnIcon width={20} height={20} />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default PasswordInput;
