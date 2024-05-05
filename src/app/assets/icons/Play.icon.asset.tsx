import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const PlayIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.101 5.325a.184.184 0 00-.1-.031.212.212 0 00-.1.03.212.212 0 00-.077.071.185.185 0 00-.024.102v13.006c0 .053.012.082.024.102.015.024.04.051.077.072.036.02.072.029.1.03a.184.184 0 00.1-.031l11.056-6.503a.185.185 0 00.074-.072.212.212 0 00.024-.1.211.211 0 00-.024-.102.184.184 0 00-.074-.071L6.1 5.325zm11.969 4.951c1.314.774 1.314 2.675 0 3.448L7.014 20.227C5.681 21.011 4 20.05 4 18.503V5.497C4 3.95 5.68 2.989 7.014 3.773l11.056 6.503z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default PlayIcon;
