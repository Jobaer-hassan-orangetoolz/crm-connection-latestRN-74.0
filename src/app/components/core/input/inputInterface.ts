import {TextInputProps, ViewStyle} from 'react-native';

export interface headerSearchInterface {
  onChange: (text: string) => void;
  defaultValue?: string;
  cancelHandler?: () => void;
  border?: 'showBorder' | 'noBorder';
}

export interface inputLeftIconProps {
  icon?: any;
  placeholder?: string;
  onChangeText: (
    value: any,
    name?: any,
    validationRules?: boolean | any | undefined,
  ) => void;
  defaultValue?: any;
  name?: string | any | undefined;
  validationRules?: () => boolean | undefined | any;
  inputProps?: object;
}

export interface multilineProps {
  placeholder?: string;
  onChangeText: (
    value: any,
    name?: any,
    validationRules?: boolean | any | undefined,
  ) => void;
  defaultValue?: any;
  name?: string | any | undefined;
  validationRules?: () => boolean | undefined | any;
  inputProps?: object;
  placeholderTextColor?: string;
}

export interface inputWithIconProps {
  leftIcon?: any;
  rightIcon?: any;
  rightHandler?: () => void;
  placeholder?: string;
  onChangeText: (
    value: any,
    name?: any,
    validationRules?: boolean | any | undefined,
  ) => void;
  defaultValue?: any;
  name?: string | any | undefined;
  validationRules?: () => boolean | undefined | any;
  inputProps?: object;
  style?: ViewStyle;
}

export interface multilineInputProps {
  placeholder?: string;
  onChangeText: (
    value: any,
    name?: any,
    validationRules?: boolean | any | undefined,
  ) => void;
  defaultValue?: any;
  name?: any;
  numberOfLines?: number;
  validationRules?: () => boolean | undefined | any;
  inputProps?: object;
  height?: number;
  textAlignVertical?: TextInputProps['textAlignVertical'];
}
