import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const PersonalizedIcon: React.FC<iconProps> = ({
  width = 26,
  height = 26,
  fill = colors.gray0,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.1001 5.47373C2.1001 3.87211 3.39847 2.57373 5.0001 2.57373H8.0001C8.49715 2.57373 8.9001 2.97667 8.9001 3.47373C8.9001 3.97079 8.49715 4.37373 8.0001 4.37373H5.0001C4.39259 4.37373 3.9001 4.86622 3.9001 5.47373V18.5264C3.9001 19.1339 4.39258 19.6264 5.0001 19.6264H8.0001C8.49715 19.6264 8.9001 20.0293 8.9001 20.5264C8.9001 21.0234 8.49715 21.4264 8.0001 21.4264H5.0001C3.39847 21.4264 2.1001 20.128 2.1001 18.5264V5.47373Z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.9002 5.47373C21.9002 3.87211 20.6018 2.57373 19.0002 2.57373H16.0002C15.5031 2.57373 15.1002 2.97667 15.1002 3.47373C15.1002 3.97079 15.5031 4.37373 16.0002 4.37373H19.0002C19.6077 4.37373 20.1002 4.86622 20.1002 5.47373V18.5264C20.1002 19.1339 19.6077 19.6264 19.0002 19.6264H16.0002C15.5031 19.6264 15.1002 20.0293 15.1002 20.5264C15.1002 21.0234 15.5031 21.4264 16.0002 21.4264H19.0002C20.6018 21.4264 21.9002 20.128 21.9002 18.5264V5.47373Z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default PersonalizedIcon;
