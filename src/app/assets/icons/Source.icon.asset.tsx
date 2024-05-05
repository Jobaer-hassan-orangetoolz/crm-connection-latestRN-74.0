import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const SourceIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.916 1.2H5.4c-1.626 0-2.9 1.332-2.9 3v2.3c0 .472.15.977.341 1.406.194.432.472.877.814 1.222l3.763 3.961c.131.17.28.428.396.72.125.313.186.595.186.791v5.3c0 2.357 2.618 3.607 4.472 2.467l.015-.01 1.39-.893c.433-.266.753-.69.959-1.086.211-.406.364-.899.364-1.378v-4.3c0-.261.068-.592.204-.91.136-.324.313-.565.472-.698l.02-.018 4.3-3.8a.946.946 0 00.04-.038c.343-.342.65-.814.87-1.301.221-.485.394-1.065.394-1.635V4.1c0-1.597-1.303-2.9-2.9-2.9h-7.684zM9.307 3H5.4c-.574 0-1.1.468-1.1 1.2v2.3c0 .128.05.373.184.67.13.288.298.539.452.694l.016.016.79.832L9.308 3zm-2.284 7.06L11.43 3H18.6c.603 0 1.1.497 1.1 1.1v2.2c0 .23-.077.55-.232.89a2.827 2.827 0 01-.488.756l-4.267 3.772c-.435.366-.755.87-.966 1.368A4.23 4.23 0 0013.4 14.7V19c0 .121-.047.329-.161.547-.117.225-.243.346-.302.381a.942.942 0 00-.024.015l-1.391.894c-.745.453-1.722-.097-1.722-.937v-5.3c0-.504-.14-1.022-.314-1.46a4.882 4.882 0 00-.683-1.202.904.904 0 00-.05-.058l-1.73-1.82z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default SourceIcon;