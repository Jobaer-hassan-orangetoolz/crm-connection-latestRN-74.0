import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const Marquee = ({text}: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 2, // Change this to 2
        duration: 10000, // Duration of the animation
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1, 2], // Modify input range to include 2
    outputRange: [width, -width, width], // Reverse animation when reaching 2
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.text, {transform: [{translateX}]}]}
        numberOfLines={1}>
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'black',
    width: '100%',
  },
  text: {
    fontSize: 20,
    color: 'white',
    whiteSpace: 'nowrap',
  },
});

export default Marquee;
