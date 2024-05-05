import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomStatusBar from '../components/core/CustomStatusBar.core.component';
import {colors} from '../assets/styles/colors.style.asset';
import {globalStyles} from '../assets/styles/global.style.asset';
const SplashContainer = ({children, containerStyle}) => {
  return (
    <View style={globalStyles.flex1}>
      <CustomStatusBar bgColor={colors.splash.bg} showHeader={false} />
      <View style={[styles(colors.splash.bg).container, containerStyle]}>
        {children}
      </View>
    </View>
  );
};
export default SplashContainer;

const styles = bgColor =>
  StyleSheet.create({
    container: {
      backgroundColor: bgColor,
      flex: 1,
      position: 'relative',
    },
  });
