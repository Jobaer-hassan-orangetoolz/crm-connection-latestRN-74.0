import React from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';
import {statusBar} from '../../assets/styles/properties.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {customUseSafeAreaInsets} from '../../packages/safeAreaContext.package';

const CustomStatusBar: React.FC<any> = ({
  barStyle = statusBar.dark,
  showHeader = true,
  bgColor = colors.transparent,
  extraHeight = 0,
}) => {
  const {top} = customUseSafeAreaInsets();
  const statusBarProps: any = {barStyle: barStyle, animated: true};
  const style = styles(top, bgColor, extraHeight);
  if (Platform.OS === 'android') {
    statusBarProps.translucent = true;
    statusBarProps.backgroundColor = bgColor;
  }
  if (!showHeader) {
    if (Platform.OS === 'android') {
      statusBarProps.backgroundColor = colors.transparent;
    }
    return <StatusBar {...statusBarProps} />;
  }
  return (
    <View style={style.container}>
      <StatusBar {...statusBarProps} />
    </View>
  );
};
export default CustomStatusBar;

const styles = (height: any, bgColor: any, extraHeight: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: bgColor,
      paddingBottom: height + extraHeight,
    },
  });
