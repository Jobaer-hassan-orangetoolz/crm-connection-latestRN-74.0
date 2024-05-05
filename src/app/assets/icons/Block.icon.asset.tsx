import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const BlockIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 12C1 5.928 5.928 1 12 1s11 4.928 11 11-4.928 11-11 11S1 18.072 1 12zm11-9c-4.968 0-9 4.032-9 9 0 2.098.72 4.03 1.925 5.56L17.56 4.926A8.96 8.96 0 0012 3zm6.986 3.328L6.328 18.986A8.96 8.96 0 0012 21c4.968 0 9-4.032 9-9a8.96 8.96 0 00-2.014-5.672z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default BlockIcon;
