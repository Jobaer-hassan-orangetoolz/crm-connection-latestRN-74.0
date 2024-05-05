import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const MoreIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.white,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 12a2 2 0 012-2h.012a2 2 0 110 4H5a2 2 0 01-2-2zm6.992 0a2 2 0 012-2h.015a2 2 0 110 4h-.015a2 2 0 01-2-2zm6.993 0a2 2 0 012-2H19a2 2 0 110 4h-.015a2 2 0 01-2-2z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default MoreIcon;
