import React from 'react';
import Base from './Base.lottie.asset';
import {lottieLink} from './link.lottie.asset';
import {colors} from '../styles/colors.style.asset';

const Loading = ({styles, color = colors.splash.text}) => {
  return (
    <Base
      source={lottieLink.Loading}
      style={styles}
      colorFilters={[
        {
          keypath: 'Dot4',
          color: color,
        },
        {
          keypath: 'Dot3',
          color: color,
        },
        {
          keypath: 'Dot2',
          color: color,
        },
        {
          keypath: 'Dot1',
          color: color,
        },
      ]}
    />
  );
};

export default Loading;
