/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {Svg, Circle, Text, TSpan} from 'react-native-svg';
import {colors} from '../../assets/styles/colors.style.asset';
import {calculateCash} from '../../utilities/helper.utility';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DealAnimatedCircle = ({data = {}, size = 248, tab}) => {
  const totalValue = data.lost + data.opened + data.win;
  const calculatePercentage = (numerator, denominator) =>
    denominator === 0 ? 0 : (numerator * 100) / denominator;

  const updatedList = [
    {
      color: '#316AFF',
      value: calculatePercentage(data.opened ?? 0, totalValue),
    },
    {
      color: '#00ff91',
      value: calculatePercentage(data.win ?? 0, totalValue),
    },
    {
      color: '#E60945',
      value: calculatePercentage(data.lost ?? 0, totalValue),
    },
  ];
  const radius = size / 2;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  const fromCalculation = value => {
    return (value / 100) * circumference;
  };
  const fromRule = index => {
    return updatedList
      .slice(1, index + 1)
      .reduce((sum, item) => sum + fromCalculation(item.value), 0);
  };

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
          item={{color: colors.gray8, value: 100}}
          index={0}
          from={0}
        />
        {updatedList.map((item, index) => (
          <CustomCircleAnimation
            radius={radius}
            strokeWidth={strokeWidth}
            item={item}
            index={index}
            from={index === 0 ? 0 : fromRule(index)}
            key={index}
          />
        ))}
        <Text x={radius} y={radius - 10} fontSize={14} textAnchor="middle">
          <TSpan>{`Deal ${tab === 0 ? 'Value' : 'Count'}`}</TSpan>
        </Text>
        <Text x={radius} y={radius + 18} fontSize={28} textAnchor="middle">
          <TSpan>{tab === 0 ? calculateCash(totalValue) : totalValue}</TSpan>
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
export default DealAnimatedCircle;
