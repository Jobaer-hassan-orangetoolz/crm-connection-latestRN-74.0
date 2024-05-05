/* eslint-disable react-hooks/exhaustive-deps */
import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';

interface props {
  handler: () => void;
  text: string;
  containerStyle?: object;
  textStyle?: object;
  isAnimating?: boolean;
  ref?: any;
  rightHandlerDisable?: boolean;
}

const BadgeButton: React.FC<props> = forwardRef(
  (
    {
      handler,
      text,
      containerStyle = {},
      textStyle = {},
      isAnimating = false,
      rightHandlerDisable = false,
    },
    ref,
  ) => {
    const scaleRef = useRef<any>(new Animated.Value(0)).current;
    useEffect(() => {
      if (isAnimating) {
        startAnimation();
      } else {
        stopAnimation();
      }
    }, [isAnimating]);
    useImperativeHandle(ref, () => ({
      show() {
        startAnimation();
      },
      close() {
        stopAnimation();
      },
    }));
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(scaleRef, {
          toValue: 1,
          duration: 1300,
          useNativeDriver: false,
        }),
      ).start();
    };
    const stopAnimation = () => {
      Animated.timing(scaleRef, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    };
    const pressHandle = () => {
      if (isAnimating) {
        stopAnimation();
      }
      handler();
    };

    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={pressHandle}
        disabled={rightHandlerDisable}
        activeOpacity={0.3}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
        <Animated.View
          style={[styles.animate, {transform: [{scale: scaleRef}]}]}
        />
      </TouchableOpacity>
    );
  },
);
export default BadgeButton;

const styles = StyleSheet.create({
  container: {position: 'relative'},
  text: {...typographies.bodyMediumBold, textAlign: 'center'},
  animate: {
    backgroundColor: colors.gray2Opacity2,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden',
    borderRadius: 100,
  },
});
