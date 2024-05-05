import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const RadioInActive: React.FC<iconProps> = ({
  width = 20,
  height = 20,
  fill = colors.gray6,
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_1350_7825)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0002 17.5002C14.1423 17.5002 17.5002 14.1423 17.5002 10.0002C17.5002 5.85803 14.1423 2.50016 10.0002 2.50016C5.85803 2.50016 2.50016 5.85803 2.50016 10.0002C2.50016 14.1423 5.85803 17.5002 10.0002 17.5002ZM10.0002 19.1668C15.0628 19.1668 19.1668 15.0628 19.1668 10.0002C19.1668 4.93755 15.0628 0.833496 10.0002 0.833496C4.93755 0.833496 0.833496 4.93755 0.833496 10.0002C0.833496 15.0628 4.93755 19.1668 10.0002 19.1668Z"
        fill={fill}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1350_7825">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default RadioInActive;
