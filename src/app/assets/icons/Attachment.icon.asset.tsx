import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {iconProps} from './interface';

const AttachmentIcon: React.FC<iconProps> = ({
  width = 26,
  height = 26,
  fill = '#1B1D20',
}) => (
  <Svg width={width} height={height} viewBox="0 0 26 26" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.095 2.478a3.36 3.36 0 00-2.376.985l-9.956 9.956a5.529 5.529 0 107.818 7.818l9.956-9.956a.975.975 0 111.379 1.38l-9.956 9.955A7.479 7.479 0 013.384 12.04l9.956-9.956a5.31 5.31 0 017.51 7.51l-9.967 9.956a3.143 3.143 0 01-4.444-4.445l9.198-9.187a.975.975 0 111.378 1.38l-9.197 9.186a1.194 1.194 0 00.843 2.037c.317 0 .62-.126.844-.35l9.966-9.956a3.362 3.362 0 00-2.376-5.737z"
      fill={fill}
    />
  </Svg>
);
export default AttachmentIcon;
