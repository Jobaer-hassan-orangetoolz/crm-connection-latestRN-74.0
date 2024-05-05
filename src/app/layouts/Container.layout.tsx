import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomStatusBar from '../components/core/CustomStatusBar.core.component';
import {colors} from '../assets/styles/colors.style.asset';
import {globalStyles} from '../assets/styles/global.style.asset';
import CustomActivityBar from '../components/core/CustomActivityBar.core.component';
import {useAppProvider} from '../wrappers/app.wrapper';
import {statusBar} from '../assets/styles/properties.asset';

interface props {
  children: ReactElement | any;
  containerStyle?: object;
  bg?: string;
  showActivity?: boolean;
  showHeader?: boolean;
  statusBarBg?: string;
  activityBgColor?: string;
  ph?: number;
}

const Container: React.FC<props> = ({
  children,
  containerStyle = {},
  bg = colors.white,
  showActivity = false,
  showHeader = true,
  statusBarBg = colors.white,
  activityBgColor = colors.white,
  ph = 0,
}) => {
  const {flag} = useAppProvider() as any;
  return (
    <View style={globalStyles.flex1}>
      <CustomStatusBar
        bgColor={statusBarBg}
        showHeader={flag ? false : showHeader}
        barStyle={flag ? statusBar.light : statusBar.dark}
      />
      <View style={[styles(bg, ph).container, containerStyle]}>{children}</View>
      {showActivity && <CustomActivityBar bgColor={activityBgColor} />}
    </View>
  );
};
export default Container;

const styles = (bgColor: any, ph: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: bgColor,
      flex: 1,
      position: 'relative',
      paddingHorizontal: ph,
    },
  });
