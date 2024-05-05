import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const OutlineCheckCircleIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.1 12C1.1 6.003 6.003 1.1 12 1.1c5.997 0 10.9 4.903 10.9 10.9 0 5.997-4.903 10.9-10.9 10.9-5.997 0-10.9-4.903-10.9-10.9zM12 2.9c-5.003 0-9.1 4.097-9.1 9.1 0 5.003 4.097 9.1 9.1 9.1 5.003 0 9.1-4.097 9.1-9.1 0-5.003-4.097-9.1-9.1-9.1z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.887 8.534a.9.9 0 01-.001 1.273l-5.67 5.66a.9.9 0 01-1.272 0l-2.83-2.83a.9.9 0 011.272-1.273l2.195 2.194 5.033-5.025a.9.9 0 011.273.001z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default OutlineCheckCircleIcon;
