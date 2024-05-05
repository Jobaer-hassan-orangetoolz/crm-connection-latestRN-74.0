import React from 'react';
import Svg, {Circle, ClipPath, Defs, G, Rect} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const CircleSmall: React.FC<iconProps> = ({
  width = 4,
  height = 4,
  fill = colors.gray4,
}) => (
  <Svg width={width} height={height} viewBox="0 0 4 4" fill="none">
    <G clipPath="url(#clip0_1331_625)">
      <Circle cx={1.99984} cy={1.99984} r={1.33333} fill={fill} />
    </G>
    <Defs>
      <ClipPath id="clip0_1331_625">
        <Rect width={4} height={4} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CircleSmall;
