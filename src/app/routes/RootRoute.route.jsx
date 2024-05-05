import React from 'react';
import {customCreateStackNavigator} from '../packages/navigation.package';
import {screens} from './routeName.route';
import basicRoutes from './basic.route';
import taskRoutes from './task.route';
import contactRoutes from './contact.route';
import inboxRoutes from './inbox.route';
import campaignRoutes from './campaign.route';
import pipelineRoutes from './pipeline.route';
import callRoutes from './call.route';
import {currentScreenInfo} from '../../MainIndex';
const RouterIndex = () => {
  const Stack = customCreateStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screens.splash}
      screenListeners={({route: {name}}) => {
        /* TODO: need to check this worse case */
        currentScreenInfo.name = name;
      }}>
      {basicRoutes(Stack)}
      {taskRoutes(Stack)}
      {contactRoutes(Stack)}
      {inboxRoutes(Stack)}
      {campaignRoutes(Stack)}
      {pipelineRoutes(Stack)}
      {callRoutes(Stack)}
    </Stack.Navigator>
  );
};
export default RouterIndex;
