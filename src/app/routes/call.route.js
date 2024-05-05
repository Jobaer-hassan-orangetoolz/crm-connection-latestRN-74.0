import React from 'react';
import {screens} from './routeName.route';
import CallKeyboard from '../modules/call/call-keyboard/CallKeyboard.module';
import CallHistory from '../modules/call/CallHistory.module';
import CallPreview from '../modules/call/CallPreview.module';

const callRoutes = Stack => {
  return [
    <Stack.Screen
      name={screens.callKeyboard}
      component={CallKeyboard}
      key={0}
    />,
    <Stack.Screen name={screens.callHistory} component={CallHistory} key={1} />,
    <Stack.Screen name={screens.callPreview} component={CallPreview} key={2} />,
  ];
};

export default callRoutes;
