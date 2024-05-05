import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const CheckCircleIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10zm-5.044-2.122a1 1 0 10-1.412-1.416l-4.963 4.954-2.124-2.123a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414 0l5.67-5.66z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default CheckCircleIcon;
