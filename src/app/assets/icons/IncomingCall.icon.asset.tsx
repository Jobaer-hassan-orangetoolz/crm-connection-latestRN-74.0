import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const IncomingCallIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray6,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.6365 2.8637C19.988 3.21517 19.988 3.78502 19.6365 4.13649L5.63649 18.1365C5.28502 18.488 4.71517 18.488 4.3637 18.1365C4.01223 17.785 4.01223 17.2152 4.3637 16.8637L18.3637 2.8637C18.7152 2.51223 19.285 2.51223 19.6365 2.8637Z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.0001 6.3301C5.49715 6.3301 5.9001 6.73304 5.9001 7.2301V16.6001H15.2701C15.7672 16.6001 16.1701 17.003 16.1701 17.5001C16.1701 17.9972 15.7672 18.4001 15.2701 18.4001H5.0001C4.50304 18.4001 4.1001 17.9972 4.1001 17.5001V7.2301C4.1001 6.73304 4.50304 6.3301 5.0001 6.3301Z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.6001 22.0001C2.6001 21.503 3.00304 21.1001 3.5001 21.1001H20.5001C20.9972 21.1001 21.4001 21.503 21.4001 22.0001C21.4001 22.4972 20.9972 22.9001 20.5001 22.9001H3.5001C3.00304 22.9001 2.6001 22.4972 2.6001 22.0001Z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default IncomingCallIcon;
