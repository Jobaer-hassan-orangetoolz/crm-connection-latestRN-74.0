import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const OutGoingIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.4 22a.9.9 0 00-.9-.9h-17a.9.9 0 100 1.8h17a.9.9 0 00.9-.9zM19.636 2.864a.9.9 0 00-1.273 0l-14 14a.9.9 0 001.273 1.273l14-14a.9.9 0 000-1.273z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.9 3.5a.9.9 0 00-.9-.9H8.73a.9.9 0 100 1.8h9.37v9.37a.9.9 0 001.8 0V3.5z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default OutGoingIcon;
