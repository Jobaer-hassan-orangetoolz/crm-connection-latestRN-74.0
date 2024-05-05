import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {colors} from '../styles/colors.style.asset';
import {iconProps} from './interface';

const CheckboxActive: React.FC<iconProps> = ({
  width = 20,
  height = 20,
  fill = colors.black,
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_1350_7627)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7502 19.1668H7.25016C2.66683 19.1668 0.833496 17.3335 0.833496 12.7502V7.25016C0.833496 2.66683 2.66683 0.833496 7.25016 0.833496H12.7502C17.3335 0.833496 19.1668 2.66683 19.1668 7.25016V12.7502C19.1668 17.3335 17.3335 19.1668 12.7502 19.1668ZM14.4788 7.98988C14.8013 7.66798 14.8017 7.14562 14.4798 6.82315C14.158 6.50069 13.6356 6.50022 13.3131 6.82212L8.69899 11.4281L6.68767 9.4168C6.36549 9.09462 5.84313 9.09462 5.52094 9.4168C5.19876 9.73899 5.19876 10.2613 5.52094 10.5835L8.11511 13.1777C8.43709 13.4997 8.95906 13.4999 9.28132 13.1782L14.4788 7.98988Z"
        fill={fill}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1350_7627">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CheckboxActive;
