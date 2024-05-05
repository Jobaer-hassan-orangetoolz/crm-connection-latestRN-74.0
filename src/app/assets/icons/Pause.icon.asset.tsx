import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const PauseIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.5 3.003h3c.55 0 1 .45 1 1v16c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-16c0-.55.45-1 1-1zm8 0h3c.55 0 1 .45 1 1v16c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-16c0-.55.45-1 1-1z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default PauseIcon;
