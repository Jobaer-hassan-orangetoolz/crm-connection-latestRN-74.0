import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const CheckboxInActive: React.FC<iconProps> = ({
  width = 20,
  height = 20,
  fill = colors.gray6,
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_1350_7859)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.49034 2.49034C3.63731 1.34337 5.34253 0.916504 7.49984 0.916504H12.4998C14.6571 0.916504 16.3624 1.34337 17.5093 2.49034C18.6563 3.63731 19.0832 5.34253 19.0832 7.49984V12.4998C19.0832 14.6571 18.6563 16.3624 17.5093 17.5093C16.3624 18.6563 14.6571 19.0832 12.4998 19.0832H7.49984C5.34253 19.0832 3.63731 18.6563 2.49034 17.5093C1.34337 16.3624 0.916504 14.6571 0.916504 12.4998V7.49984C0.916504 5.34253 1.34337 3.63731 2.49034 2.49034ZM3.551 3.551C2.82297 4.27903 2.4165 5.49048 2.4165 7.49984V12.4998C2.4165 14.5092 2.82297 15.7206 3.551 16.4487C4.27903 17.1767 5.49048 17.5832 7.49984 17.5832H12.4998C14.5092 17.5832 15.7206 17.1767 16.4487 16.4487C17.1767 15.7206 17.5832 14.5092 17.5832 12.4998V7.49984C17.5832 5.49048 17.1767 4.27903 16.4487 3.551C15.7206 2.82297 14.5092 2.4165 12.4998 2.4165H7.49984C5.49048 2.4165 4.27903 2.82297 3.551 3.551Z"
        fill={fill}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1350_7859">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CheckboxInActive;
