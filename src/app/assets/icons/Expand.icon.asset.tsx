import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const ExpandIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.white,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 3.25V9.79219C22 10.1237 21.8683 10.4417 21.6339 10.6761C21.3995 10.9105 21.0815 11.0422 20.75 11.0422C20.4185 11.0422 20.1005 10.9105 19.8661 10.6761C19.6317 10.4417 19.5 10.1237 19.5 9.79219V6.26777L14.8463 10.9214C14.6116 11.1544 14.2941 11.2848 13.9634 11.2842C13.6328 11.2835 13.3158 11.1519 13.082 10.9181C12.8481 10.6842 12.7165 10.3673 12.7158 10.0366C12.7152 9.70591 12.8456 9.38844 13.0786 9.15371L17.7323 4.5H14.2078C13.8763 4.5 13.5583 4.3683 13.3239 4.13388C13.0895 3.89946 12.9578 3.58152 12.9578 3.25C12.9578 2.91848 13.0895 2.60054 13.3239 2.36612C13.5583 2.1317 13.8763 2 14.2078 2H20.75C21.0815 2 21.3995 2.1317 21.6339 2.36612C21.8683 2.60054 22 2.91848 22 3.25ZM2 20.75C2 21.0815 2.1317 21.3995 2.36612 21.6339C2.60054 21.8683 2.91848 22 3.25 22H9.79219C10.1237 22 10.4417 21.8683 10.6761 21.6339C10.9105 21.3995 11.0422 21.0815 11.0422 20.75C11.0422 20.4185 10.9105 20.1005 10.6761 19.8661C10.4417 19.6317 10.1237 19.5 9.79219 19.5H6.26781L10.9214 14.8463C11.1559 14.6119 11.2876 14.294 11.2876 13.9624C11.2876 13.6309 11.1559 13.313 10.9214 13.0786C10.687 12.8441 10.3691 12.7124 10.0376 12.7124C9.70604 12.7124 9.38809 12.8441 9.15367 13.0786L4.5 17.7323V14.2079C4.5 13.8763 4.3683 13.5584 4.13388 13.324C3.89946 13.0895 3.58152 12.9579 3.25 12.9579C2.91848 12.9579 2.60054 13.0895 2.36612 13.324C2.1317 13.5584 2 13.8763 2 14.2079L2 20.75Z"
      fill="#000"
      fillOpacity={1}
    />
  </Svg>
);
export default ExpandIcon;