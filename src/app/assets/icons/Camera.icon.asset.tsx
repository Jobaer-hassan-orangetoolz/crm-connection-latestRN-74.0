import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const CameraIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.white,
}) => (
  <Svg width={width} height={height} viewBox="0 0 40 40" fill="none">
    <Path
      d="M30.5 10a2.739 2.739 0 01-2.417-1.483l-1.2-2.416c-.767-1.517-2.767-2.767-4.467-2.767H18.6c-1.717 0-3.717 1.25-4.484 2.767l-1.2 2.416c-.466.9-1.4 1.484-2.416 1.484-3.617 0-6.484 3.05-6.25 6.65l.866 13.766c.2 3.434 2.05 6.25 6.65 6.25h17.467c4.6 0 6.433-2.816 6.65-6.25l.867-13.766A6.256 6.256 0 0030.5 10zM18 12.085h5c.683 0 1.25.567 1.25 1.25a1.26 1.26 0 01-1.25 1.25h-5a1.26 1.26 0 01-1.25-1.25c0-.683.566-1.25 1.25-1.25zm2.5 18.117a5.637 5.637 0 01-5.634-5.634 5.626 5.626 0 015.634-5.633 5.626 5.626 0 015.633 5.633 5.637 5.637 0 01-5.633 5.634z"
      fill={fill}
    />
  </Svg>
);
export default CameraIcon;
