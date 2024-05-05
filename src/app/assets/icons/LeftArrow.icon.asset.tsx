import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const LeftArrowIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 12a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.707 4.293a1 1 0 010 1.414L6.414 12l6.293 6.293a1 1 0 01-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default LeftArrowIcon;
