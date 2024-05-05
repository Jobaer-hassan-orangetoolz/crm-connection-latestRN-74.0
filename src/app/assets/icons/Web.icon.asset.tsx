import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';

interface iconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const WebIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.1 12C1.1 5.98 5.98 1.1 12 1.1c6.02 0 10.9 4.88 10.9 10.9 0 6.02-4.88 10.9-10.9 10.9-6.02 0-10.9-4.88-10.9-10.9zM12 2.9A9.1 9.1 0 002.9 12a9.1 9.1 0 009.1 9.1 9.1 9.1 0 009.1-9.1A9.1 9.1 0 0012 2.9z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.715 2.146a.9.9 0 011.139.57 29.324 29.324 0 010 18.57.9.9 0 01-1.708-.57 27.524 27.524 0 000-17.43.9.9 0 01.57-1.14zM7.1 3a.9.9 0 01.9-.9h1a.9.9 0 01.854 1.185 27.524 27.524 0 000 17.43A.9.9 0 019 21.9H8a.9.9 0 01-.214-1.774 29.324 29.324 0 010-16.252A.9.9 0 017.1 3z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.715 9.854a27.524 27.524 0 00-17.43 0 .9.9 0 11-.57-1.708 29.324 29.324 0 0118.57 0 .9.9 0 01-.57 1.708zM2.474 14.27a.9.9 0 01.811-.124 27.524 27.524 0 0017.43 0A.9.9 0 0121.9 15v1a.9.9 0 01-1.774.214 29.325 29.325 0 01-16.252 0A.9.9 0 012.1 16v-1a.9.9 0 01.374-.73z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default WebIcon;
