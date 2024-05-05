import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const SpeakerIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 10v4c0 2 1 3 3 3h1.43c.37 0 .74.11 1.06.3l2.92 1.83c2.52 1.58 4.59.43 4.59-2.54V7.41c0-2.98-2.07-4.12-4.59-2.54L7.49 6.7c-.32.19-.69.3-1.06.3H5c-2 0-3 1-3 3z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.55 7.4a.75.75 0 011.05.15 7.41 7.41 0 010 8.9.75.75 0 11-1.2-.9 5.91 5.91 0 000-7.1.75.75 0 01.15-1.05z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.38 4.9a.75.75 0 011.05.15 11.58 11.58 0 010 13.9.75.75 0 11-1.2-.9 10.08 10.08 0 000-12.1.75.75 0 01.15-1.05z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default SpeakerIcon;
