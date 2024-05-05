import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';

interface iconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const DownAngleIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.white,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.07256 9.84432C6.40278 9.47281 6.97165 9.43935 7.34315 9.76958L12.5 14.3534L17.6568 9.76958C18.0283 9.43935 18.5972 9.47281 18.9274 9.84432C19.2576 10.2158 19.2241 10.7847 18.8526 11.1149L13.0979 16.2302C12.7569 16.5334 12.243 16.5334 11.902 16.2302L6.1473 11.1149C5.77579 10.7847 5.74233 10.2158 6.07256 9.84432Z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default DownAngleIcon;
