import React from 'react';
import {CustomSafeAreaProvider} from './app/packages/safeAreaContext.package';
import {CustomNavigationContainer} from './app/packages/navigation.package';
import RouterIndex from './app/routes/RootRoute.route';
import {AppProvider} from './app/wrappers/app.wrapper';
import {CustomReduxProvider} from './app/packages/redux.package';
import store from './app/states/store';
import BottomSheetIndex from './app/components/core/bottom-sheet/BottomSheetIndex';

export const currentScreenInfo = {
  name: null,
  params: null,
};

const MainIndex = () => {
  return (
    <CustomSafeAreaProvider>
      <CustomReduxProvider store={store}>
        <CustomNavigationContainer>
          <AppProvider>
            <RouterIndex />
          </AppProvider>
          <BottomSheetIndex />
        </CustomNavigationContainer>
      </CustomReduxProvider>
    </CustomSafeAreaProvider>
  );
};
export default MainIndex;
