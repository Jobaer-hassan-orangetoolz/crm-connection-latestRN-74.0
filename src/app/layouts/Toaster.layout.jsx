import React, {useRef} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import {netInfoEventListener} from '../packages/netinfo/netInfoHandler';
import useDelay from '../utilities/hooks/useDelay.hook';
import {nativeDriver} from '../assets/styles/properties.asset';
import {customPadding} from '../assets/styles/global.style.asset';
import {messages} from '../assets/js/messages.message';
import {colors} from '../assets/styles/colors.style.asset';
import rs from '../assets/styles/responsiveSize.style.asset';
import {fonts} from '../assets/styles/fonts.style.asset';
import {SCREEN_HEIGHT} from '../assets/js/core.data';

const hidePosition = SCREEN_HEIGHT + 160;
const showPosition = SCREEN_HEIGHT - 160;

const Toaster = () => {
  const translateRef = useRef(new Animated.Value(hidePosition + 160)).current;

  useDelay(() => {
    const unsubscribe = netInfoEventListener(_updateConnectionStatus);
    return () => unsubscribe();
  }, [2000]);

  const _updateConnectionStatus = state => {
    if (
      state &&
      state.isConnected &&
      state.isInternetReachable &&
      state.type !== '' &&
      state.type !== 'none'
    ) {
      hideInfo();
    } else {
      showInfo();
    }
  };

  const showInfo = () => {
    Animated.timing(translateRef, {
      toValue: showPosition,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: nativeDriver(),
    }).start();
  };
  const hideInfo = () => {
    Animated.timing(translateRef, {
      toValue: hidePosition,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: nativeDriver(),
    }).start();
  };

  const scale = translateRef.interpolate({
    inputRange: [-160, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[
        style.container,
        {
          transform: [{translateY: translateRef}, {scale: scale}],
        },
      ]}>
      <Text style={style.text} numberOfLines={2}>
        {messages.internet}
      </Text>
    </Animated.View>
  );
};
export default Toaster;

const style = StyleSheet.create({
  container: {
    ...customPadding(16, 16, 16, 16),
    borderRadius: 14,
    backgroundColor: colors.gray0,
    marginHorizontal: rs(20),
    position: 'absolute',
    zIndex: 9,
    overflow: 'hidden',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  text: {
    color: colors.white,
    flexShrink: 1,
    fontFamily: fonts.onest400,
    fontSize: rs(14),
    lineHeight: rs(20),
    textAlign: 'center',
  },
});
