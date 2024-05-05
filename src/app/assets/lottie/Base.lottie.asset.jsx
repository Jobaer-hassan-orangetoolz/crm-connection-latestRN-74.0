import React from 'react';
import {CustomLottie} from '../../packages/lottie.package';

const Base = ({
  source,
  style,
  speed = 1,
  colorFilters,
  autoPlay = true,
  loop = true,
  lottieRef,
}) => {
  return (
    <CustomLottie
      source={source}
      style={style}
      colorFilters={colorFilters}
      autoPlay={autoPlay}
      loop={loop}
      ref={lottieRef}
      speed={speed}
    />
  );
};

export default Base;
