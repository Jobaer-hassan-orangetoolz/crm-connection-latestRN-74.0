/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {Svg, Circle, Text, TSpan} from 'react-native-svg';
import {colors} from '../../assets/styles/colors.style.asset';
import {conversionRate} from '../../utilities/helper.utility';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ConversationRateAnimatedCircle = ({data, size = 248}) => {
  const radius = size / 2;
  const strokeWidth = 12;

  const rate = conversionRate(data);

  return (
    <View style={styles.container}>
      <Svg
        height={size}
        width={size}
        viewBox={`-${strokeWidth / 2} -${strokeWidth / 2} ${
          size + strokeWidth
        } ${size + strokeWidth}`}>
        <CustomCircleAnimation
          radius={radius}
          strokeWidth={strokeWidth}
          item={{
            color: colors.gray8,
            value: 100,
          }}
          index={0}
          from={0}
        />
        <CustomCircleAnimation
          radius={radius}
          strokeWidth={strokeWidth}
          item={{
            color: '#cbd9ff',
            value: rate,
          }}
          index={0}
          from={0}
        />
        <Text x={radius} y={radius + 8} fontSize={24} textAnchor="middle">
          <TSpan>{parseInt(rate, 10)}%</TSpan>
        </Text>
      </Svg>
    </View>
  );
};

const CustomCircleAnimation = ({
  radius,
  strokeWidth,
  item,
  from = 0,
  index = 0,
}) => {
  const circumference = 2 * Math.PI * radius;

  const ref = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animation();
  }, []);

  const calculateDashArray = value => {
    const dashLength = (value / 100) * circumference;
    return `${dashLength} ${circumference - dashLength}`;
  };

  const animation = () => {
    Animated.timing(ref, {
      toValue: 1,
      delay: 1 * index,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };
  const strokeDasharray = ref.interpolate({
    inputRange: [0, 1],
    outputRange: [calculateDashArray(0), calculateDashArray(item.value)],
    extrapolate: 'clamp',
  });
  return (
    <AnimatedCircle
      cx={radius}
      cy={radius}
      r={radius}
      fill="transparent"
      stroke={item.color}
      strokeWidth={strokeWidth}
      strokeDashoffset={from}
      // strokeDasharray={strokeDasharray}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default ConversationRateAnimatedCircle;
