import {ReactElement} from 'react';
import {ViewStyle} from 'react-native';

export interface rightLeftActionProps {
  border?: 'showBorder' | 'noBorder';
  containerStyles?: object;
  leftIcon?: ReactElement;
  leftIconHandler?: () => void | undefined;
  title?: string;
  right?: ReactElement | string;
  rightHandler?: () => void;
  rightHandlerDisable?: boolean;
  isAnimating?: boolean;
}

export interface onlyIconHeaderInterface {
  leftIcon?: ReactElement;
  rightComponent?: ReactElement;
  controlLeftIcon?: () => void;
  text?: string;
  style?: ViewStyle;
  border?: boolean;
}
