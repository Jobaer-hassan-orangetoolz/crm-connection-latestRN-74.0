import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const AddIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.white,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.61475C12.4971 2.61475 12.9 3.01769 12.9 3.51475V11.1L20.4853 11.1C20.9824 11.1 21.3853 11.503 21.3853 12C21.3853 12.4971 20.9824 12.9 20.4853 12.9L12.9 12.9V20.4853C12.9 20.9824 12.4971 21.3853 12 21.3853C11.503 21.3853 11.1 20.9824 11.1 20.4853V12.9L3.51475 12.9C3.01769 12.9 2.61475 12.4971 2.61475 12C2.61475 11.503 3.01769 11.1 3.51475 11.1L11.1 11.1V3.51475C11.1 3.01769 11.503 2.61475 12 2.61475Z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default AddIcon;
