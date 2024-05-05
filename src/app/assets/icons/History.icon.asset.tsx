import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const HistoryIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.black,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3C7.03228 3 3 7.03228 3 12C3 16.9677 7.03228 21 12 21C16.9677 21 21 16.9677 21 12C21 7.03228 16.9677 3 12 3ZM1 12C1 5.92772 5.92772 1 12 1C18.0723 1 23 5.92772 23 12C23 18.0723 18.0723 23 12 23C5.92772 23 1 18.0723 1 12Z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.63 6.51C12.1823 6.51 12.63 6.95772 12.63 7.51V11.61C12.63 11.7097 12.6715 11.8898 12.7862 12.0909C12.9009 12.292 13.0347 12.4193 13.1198 12.4697L13.1225 12.4713L16.2225 14.3213C16.6967 14.6043 16.8517 15.2182 16.5687 15.6925C16.2857 16.1667 15.6718 16.3217 15.1975 16.0387L12.1002 14.1903C12.0997 14.19 12.0992 14.1897 12.0986 14.1894C11.6445 13.9198 11.2889 13.5025 11.0488 13.0816C10.8085 12.6602 10.63 12.1403 10.63 11.61V7.51C10.63 6.95772 11.0777 6.51 11.63 6.51Z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default HistoryIcon;
