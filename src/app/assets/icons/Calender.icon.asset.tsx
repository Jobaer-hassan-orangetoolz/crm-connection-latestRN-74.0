import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const CalenderIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.white,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 1.1a.9.9 0 01.9.9v.6h6.2V2a.9.9 0 111.8 0v.643c1.5.15 2.709.69 3.572 1.62C21.491 5.36 21.9 6.863 21.9 8.5V17c0 1.638-.41 3.14-1.428 4.238-1.03 1.109-2.55 1.662-4.472 1.662H8c-1.921 0-3.442-.553-4.472-1.662C2.51 20.14 2.1 18.637 2.1 17V8.5c0-1.638.41-3.14 1.428-4.237.863-.93 2.072-1.47 3.572-1.62V2a.9.9 0 01.9-.9zm-.9 3.355c-1.065.137-1.78.523-2.253 1.032-.56.603-.893 1.499-.94 2.703h16.187c-.048-1.204-.382-2.1-.94-2.702-.474-.51-1.189-.896-2.254-1.033V5a.9.9 0 11-1.8 0v-.6H8.9V5a.9.9 0 01-1.8 0v-.545zm13 5.535H3.9V17c0 1.362.34 2.36.947 3.013.595.64 1.575 1.087 3.153 1.087h8c1.579 0 2.558-.446 3.153-1.087.607-.653.947-1.65.947-3.013V9.99z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default CalenderIcon;
