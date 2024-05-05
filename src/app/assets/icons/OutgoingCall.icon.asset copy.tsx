import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const OutgoingCallIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.gray6,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.3996 22.0001C21.3996 21.503 20.9967 21.1001 20.4996 21.1001H3.49961C3.00255 21.1001 2.59961 21.503 2.59961 22.0001C2.59961 22.4972 3.00255 22.9001 3.49961 22.9001H20.4996C20.9967 22.9001 21.3996 22.4972 21.3996 22.0001Z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.636 2.8637C19.2845 2.51223 18.7147 2.51223 18.3632 2.8637L4.36321 16.8637C4.01174 17.2152 4.01174 17.785 4.36321 18.1365C4.71468 18.488 5.28453 18.488 5.63601 18.1365L19.636 4.13649C19.9875 3.78502 19.9875 3.21517 19.636 2.8637Z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.8996 3.5001C19.8996 3.00304 19.4967 2.6001 18.9996 2.6001H8.72961C8.23255 2.6001 7.82961 3.00304 7.82961 3.5001C7.82961 3.99715 8.23255 4.4001 8.72961 4.4001H18.0996V13.7701C18.0996 14.2672 18.5026 14.6701 18.9996 14.6701C19.4967 14.6701 19.8996 14.2672 19.8996 13.7701V3.5001Z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default OutgoingCallIcon;
