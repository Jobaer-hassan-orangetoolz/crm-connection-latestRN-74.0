import React from 'react';
import {screens} from './routeName.route';
import Splash from '../modules/splash/Splash.module';
import Home from '../modules/splash/Home.module';
import Onboarding from '../modules/splash/Onboarding.module';
import InactivePackage from '../modules/splash/InactivePackage.module';
import LoginIndex from '../modules/login/LoginIndex.module';
import CustomWebView from '../components/core/web-view/WebView.core.component';
import Profile from '../modules/profile/Profile.module';
import UpdateProfile from '../modules/profile/UpdateProfile.module';
import UpdateAppointment from '../modules/profile/UpdateAppointment.module';

const basicRoutes = Stack => {
  return [
    <Stack.Screen name={screens.splash} component={Splash} key={0} />,
    <Stack.Screen name={screens.login} component={LoginIndex} key={1} />,
    <Stack.Screen name={screens.onboarding} component={Onboarding} key={2} />,
    <Stack.Screen
      name={screens.inactivePackage}
      component={InactivePackage}
      key={1}
    />,
    <Stack.Screen name={screens.home} component={Home} key={3} />,
    <Stack.Screen name={screens.webView} component={CustomWebView} key={4} />,
    <Stack.Screen name={screens.profile} component={Profile} key={5} />,
    <Stack.Screen
      name={screens.updateProfile}
      component={UpdateProfile}
      key={5}
    />,
    <Stack.Screen
      name={screens.updateAppointment}
      component={UpdateAppointment}
      key={6}
    />,
  ];
};

export default basicRoutes;
