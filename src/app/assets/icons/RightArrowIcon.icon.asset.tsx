import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const RightArrowIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 12a1 1 0 00-1-1H5a1 1 0 100 2h14a1 1 0 001-1z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.293 4.293a1 1 0 000 1.414L17.586 12l-6.293 6.293a1 1 0 001.414 1.414l7-7a1 1 0 000-1.414l-7-7a1 1 0 00-1.414 0z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default RightArrowIcon;
