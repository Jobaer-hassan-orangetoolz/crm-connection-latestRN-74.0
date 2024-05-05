import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const RightArrow: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.345 18.082a.9.9 0 01-.075-1.27l4.584-5.157L9.27 6.498a.9.9 0 111.345-1.196l5.115 5.755a.9.9 0 010 1.196l-5.115 5.754a.9.9 0 01-1.27.075z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default RightArrow;
