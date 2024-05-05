import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const TimeIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.white,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 5.4a7.853 7.853 0 00-7.85 7.85A7.853 7.853 0 0012 21.1a7.853 7.853 0 007.85-7.85A7.853 7.853 0 0012 5.4zm-9.65 7.85C2.35 7.923 6.673 3.6 12 3.6s9.65 4.323 9.65 9.65S17.327 22.9 12 22.9s-9.65-4.323-9.65-9.65zM12 7.1a.9.9 0 01.9.9v5a.9.9 0 11-1.8 0V8a.9.9 0 01.9-.9zM8.1 2a.9.9 0 01.9-.9h6a.9.9 0 110 1.8H9a.9.9 0 01-.9-.9z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default TimeIcon;
