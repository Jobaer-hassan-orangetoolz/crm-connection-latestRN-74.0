import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const TagsIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.89 2.107a5.65 5.65 0 014.28 1.652l.002.001 4.54 4.52a5.68 5.68 0 010 8.022l-4.39 4.39-.002.001a5.68 5.68 0 01-8.02 0l-4.532-4.53a5.704 5.704 0 01-1.662-4.287v-.003l.24-5.002a4.764 4.764 0 014.547-4.524h.001l4.997-.24zm1.668 2.052a3.85 3.85 0 00-1.578-.254l-5.002.24h-.003A2.964 2.964 0 004.144 6.96l-.24 4.996v.002A3.904 3.904 0 005.04 14.89l4.53 4.529a3.881 3.881 0 005.478 0l4.389-4.389a3.882 3.882 0 000-5.478L14.9 5.033l-.002-.002a3.85 3.85 0 00-1.34-.873z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.33 7.322a3.4 3.4 0 114.809 4.808 3.4 3.4 0 01-4.808-4.808zm2.405.804a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM17.871 12.59a.9.9 0 010 1.272l-4 4a.9.9 0 11-1.273-1.272l4-4a.9.9 0 011.273 0z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default TagsIcon;
