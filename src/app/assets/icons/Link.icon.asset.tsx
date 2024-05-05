import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const LinkIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.498 5.6H9a.9.9 0 010 1.8H7.5A4.61 4.61 0 002.9 12c0 2.525 2.068 4.6 4.6 4.6H9a.9.9 0 110 1.8H7.5c-3.528 0-6.4-2.884-6.4-6.4v-.002A6.41 6.41 0 017.498 5.6zm6.592.9a.9.9 0 01.9-.9h1.51c3.528 0 6.4 2.884 6.4 6.4 0 3.528-2.884 6.4-6.4 6.4h-1.51a.9.9 0 110-1.8h1.51c2.524 0 4.6-2.068 4.6-4.6 0-2.524-2.068-4.6-4.6-4.6h-1.51a.9.9 0 01-.9-.9zM7.1 12a.9.9 0 01.9-.9h8a.9.9 0 110 1.8H8a.9.9 0 01-.9-.9z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default LinkIcon;
