/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';
import {nativeDriver} from '../../assets/styles/properties.asset';
import {colors} from '../../assets/styles/colors.style.asset';

const CustomSwitch: React.FC<{
  value?: boolean;
  onPress?: () => void;
  activeColor?: string;
}> = ({value = false, activeColor = '', onPress = () => {}}) => {
  const valueRef = useRef(false);
  const translateRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    value ? handleSwitch(true) : handleSwitch(false);
  }, [value]);

  const handleSwitch = (flag = false) => {
    Animated.timing(translateRef, {
      toValue: flag ? 21 : 0,
      duration: 300,
      delay: 100,
      useNativeDriver: nativeDriver(),
    }).start(() => {
      valueRef.current = flag;
    });
  };

  const backgroundColor = translateRef.interpolate({
    inputRange: [0, 21],
    outputRange: [colors.gray4, activeColor || colors.success1],
    extrapolate: 'clamp',
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.containerStyle, {backgroundColor}]}>
        <Animated.View
          style={[
            styles.circleStyle,
            {backgroundColor: colors.white},
            {
              transform: [
                {
                  translateX: translateRef,
                },
              ],
            },
            styles.shadowValue,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circleStyle: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  containerStyle: {
    width: 50,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 36.5,
  },
  shadowValue: {
    shadowColor: colors.gray0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default CustomSwitch;
