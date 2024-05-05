import React, {useEffect, useRef} from 'react';
import {Animated, ViewStyle} from 'react-native';
import {nativeDriver} from '../../assets/styles/properties.asset';
import {colors} from '../../assets/styles/colors.style.asset';

interface baseSkeletonProps {
  width?: number | 'auto' | `${number}%`;
  height?: number | 'auto' | `${number}%`;
  borderRadius?: number;
  bgColor?: string;
  style?: ViewStyle;
}

const BaseSkeleton: React.FC<baseSkeletonProps> = ({
  width = 50,
  height = 30,
  borderRadius = 0,
  bgColor,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: nativeDriver(),
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: nativeDriver(),
          duration: 800,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          opacity: opacity.current,
          height: height,
          width: width,
          backgroundColor: bgColor ? bgColor : colors.gray6,
          borderRadius: borderRadius,
        },
        style as ViewStyle,
      ]}
    />
  );
};

export default BaseSkeleton;
