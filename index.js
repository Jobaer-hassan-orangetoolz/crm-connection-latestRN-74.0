import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainIndex from './src/MainIndex';
import {CustomGestureHandlerRootView} from './src/app/packages/gesture';
import {globalStyles} from './src/app/assets/styles/global.style.asset';
import './src/app/assets/ignoreWarnings';

const OtCrmApp = () => {
  return (
    <CustomGestureHandlerRootView style={globalStyles.flex1}>
      <MainIndex />
    </CustomGestureHandlerRootView>
  );
};

AppRegistry.registerComponent(appName, () => OtCrmApp);
