import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const MenuIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.8999 4.9999C1.8999 4.39239 2.39239 3.8999 2.9999 3.8999H20.9999C21.6074 3.8999 22.0999 4.39239 22.0999 4.9999C22.0999 5.60742 21.6074 6.0999 20.9999 6.0999H2.9999C2.39239 6.0999 1.8999 5.60742 1.8999 4.9999Z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.8999 11.9999C1.8999 11.3924 2.39239 10.8999 2.9999 10.8999H20.9999C21.6074 10.8999 22.0999 11.3924 22.0999 11.9999C22.0999 12.6074 21.6074 13.0999 20.9999 13.0999H2.9999C2.39239 13.0999 1.8999 12.6074 1.8999 11.9999Z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.8999 18.9999C1.8999 18.3924 2.39239 17.8999 2.9999 17.8999H20.9999C21.6074 17.8999 22.0999 18.3924 22.0999 18.9999C22.0999 19.6074 21.6074 20.0999 20.9999 20.0999H2.9999C2.39239 20.0999 1.8999 19.6074 1.8999 18.9999Z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default MenuIcon;
