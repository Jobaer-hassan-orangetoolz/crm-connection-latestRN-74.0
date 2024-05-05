import React, {useRef} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {netInfoEventListener} from '../packages/netinfo/netInfoHandler';
import useDelay from '../utilities/hooks/useDelay.hook';
import {nativeDriver} from '../assets/styles/properties.asset';
import {messages} from '../assets/js/messages.message';
import {colors} from '../assets/styles/colors.style.asset';
import {typographies} from '../assets/styles/typographies.style.asset';
import {customUseSafeAreaInsets} from '../packages/safeAreaContext.package';

const hidePosition = 0;
const showPosition = 40;

const Internet: React.FC = ({needTop = false, toggleFlag = () => {}}: any) => {
  const heightRef = useRef(new Animated.Value(hidePosition)).current;
  const {top} = customUseSafeAreaInsets();
  useDelay(() => {
    const unsubscribe = netInfoEventListener(_updateConnectionStatus);
    return () => unsubscribe();
  }, [2000]);
  const _updateConnectionStatus = (state: any) => {
    if (
      state &&
      state.isConnected &&
      state.isInternetReachable &&
      state.type !== '' &&
      state.type !== 'none'
    ) {
      toggleFlag(false);
      hideInfo();
    } else {
      toggleFlag(true);
      showInfo();
    }
  };
  const showInfo = () => {
    Animated.timing(heightRef, {
      toValue: showPosition + (needTop ? top : 0),
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: nativeDriver(false),
    }).start();
  };
  const hideInfo = () => {
    Animated.timing(heightRef, {
      toValue: hidePosition - top,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: nativeDriver(false),
    }).start();
  };
  const opacity = heightRef.interpolate({
    inputRange: [hidePosition, showPosition],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const height = heightRef.interpolate({
    inputRange: [hidePosition, showPosition],
    outputRange: [0, 18],
    extrapolate: 'clamp',
  });
  const paddingTop = heightRef.interpolate({
    inputRange: [hidePosition, showPosition],
    outputRange: [0, needTop ? top : 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[style.container, {paddingTop, height: heightRef}]}>
      <Animated.Text style={[style.text, {opacity, height}]} numberOfLines={1}>
        {messages.internetWaiting}
      </Animated.Text>
    </Animated.View>
  );
};
export default Internet;

const style = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray0,
  },
  text: {
    ...typographies.bodyXS,
    color: colors.gray4,
    textAlign: 'center',
  },
});
