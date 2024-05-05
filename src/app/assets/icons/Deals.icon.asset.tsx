import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const DealsIcon: React.FC<iconProps> = ({
  width = 24,
  height = 24,
  fill = colors.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 5.1a.9.9 0 01.9.9v.44h.222c1.768 0 3.12 1.485 3.12 3.23a.9.9 0 11-1.8 0c0-.835-.628-1.43-1.32-1.43H12.9v3.118l1.423.494c.46.163.978.414 1.364.905.394.503.555 1.134.555 1.873 0 1.578-1.235 2.93-2.84 2.93H12.9V18a.9.9 0 11-1.8 0v-.44h-.208c-1.768 0-3.12-1.485-3.12-3.23a.9.9 0 111.8 0c0 .835.628 1.43 1.32 1.43h.208v-3.122l-1.409-.49c-.46-.163-.978-.413-1.363-.905-.394-.502-.556-1.134-.556-1.873 0-1.578 1.235-2.93 2.84-2.93h.488V6a.9.9 0 01.9-.9zm-.9 3.14h-.488c-.535 0-1.04.468-1.04 1.13 0 .481.103.675.172.762.077.098.218.202.546.319l.81.281V8.24zm1.8 5.023v2.497h.502c.535 0 1.04-.468 1.04-1.13 0-.481-.103-.675-.172-.762-.077-.098-.218-.202-.546-.319l-.824-.286z"
      fill={fill}
      fillOpacity={1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.1 12C1.1 5.98 5.98 1.1 12 1.1c6.02 0 10.9 4.88 10.9 10.9 0 6.02-4.88 10.9-10.9 10.9-6.02 0-10.9-4.88-10.9-10.9zM12 2.9A9.1 9.1 0 002.9 12a9.1 9.1 0 009.1 9.1 9.1 9.1 0 009.1-9.1A9.1 9.1 0 0012 2.9z"
      fill={fill}
      fillOpacity={1}
    />
  </Svg>
);
export default DealsIcon;
