import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const BounceIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.989 2.989C4.365 1.612 6.41 1.1 9 1.1h6c2.589 0 4.635.512 6.012 1.889C22.388 4.365 22.9 6.41 22.9 9v6c0 2.589-.512 4.635-1.888 6.012C19.635 22.388 17.589 22.9 15 22.9H9c-2.589 0-4.635-.512-6.011-1.888C1.612 19.635 1.1 17.589 1.1 15V9c0-2.589.512-4.635 1.889-6.011zM4.26 4.26c-.873.874-1.36 2.328-1.36 4.74v6c0 2.41.487 3.864 1.36 4.738.874.873 2.328 1.361 4.74 1.361h6c2.41 0 3.864-.488 4.738-1.361.873-.874 1.361-2.328 1.361-4.739V9c0-2.411-.488-3.865-1.361-4.739-.874-.873-2.328-1.36-4.739-1.36H9c-2.411 0-3.865.487-4.739 1.36z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.364 5.874a.9.9 0 011.272 0l3 3a.9.9 0 11-1.272 1.272L12 7.784l-2.364 2.363a.9.9 0 11-1.272-1.272l3-3z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 5.61a.9.9 0 01.9.9v8a.9.9 0 01-1.8 0v-8a.9.9 0 01.9-.9zM5.146 16.225a.9.9 0 011.14-.569 18.05 18.05 0 0011.429 0 .9.9 0 11.57 1.708 19.849 19.849 0 01-12.57 0 .9.9 0 01-.569-1.14z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default BounceIcon;
