import React, {createContext, useContext, useRef, useState} from 'react';
import {useCustomNavigation} from '../packages/navigation.package';
import {removeLocalData} from '../packages/asyncStorage/storageHandle';
import {screens} from '../routes/routeName.route';
import {globalStyles} from '../assets/styles/global.style.asset';
import {View} from 'react-native';
import Internet from '../layouts/Internet.layout';
import CallOverlay from '../layouts/CallOverlay.layout';
import {customUseDispatch} from '../packages/redux.package';
import {clearAction as contactClearAction} from '../states/features/contact/contacts.slice';
import {clearAction as taskClearAction} from '../states/features/task/task.slice';
import {clearAction as campaignFolderClearAction} from '../states/features/campaign/campaignFolder.slice';
import {clearAction as campaignClearAction} from '../states/features/campaign/campaigns.slice';
import {clearAction as authClearAction} from '../states/features/auth/auth.slice';
import {clearAction as dashboardClearAction} from '../states/features/dashboard/dashboard.slice';
import {clearAction as inboxClearAction} from '../states/features/inbox/inbox.slice';
import {clearAction as stageClearAction} from '../states/features/deal/dealStages.slice';
import {clearAction as pipelineClearAction} from '../states/features/deal/pipeline.slice';
import {clearAction as userClearAction} from '../states/features/user/user.slice';
import {clearAction as historyClearAction} from '../states/features/call/callHistory.slice';
import {currentScreenInfo} from '../../MainIndex';
import {unregisterFirebase} from '../packages/firebase/firebase.index';

const AppContext = createContext({});

const AppProvider = ({children}) => {
  const dispatch = customUseDispatch();
  const navigation = useCustomNavigation();
  global.logout = () => {
    navigation.navigate(screens.login);
    removeLocalData.removeCacheForLogout();
    unregisterFirebase();
    dispatch(contactClearAction());
    dispatch(taskClearAction());
    dispatch(campaignFolderClearAction());
    dispatch(campaignClearAction());
    dispatch(authClearAction());
    dispatch(dashboardClearAction());
    dispatch(inboxClearAction());
    dispatch(stageClearAction());
    dispatch(pipelineClearAction());
    dispatch(userClearAction());
    dispatch(historyClearAction());
  };
  const callDataRef = useRef(null);
  const internetRef = useRef(false);
  const [flag, setFlag] = useState(false);
  const [showCallScreen, setShowCallScreen] = useState(false);

  const toggleShowCallScreen = data => {
    if (data) {
      callDataRef.current = {...data};
    }
    const callScreen = data ? true : false;
    setShowCallScreen(callScreen);
    if (!data) {
      callDataRef.current = null;
    }
    if (internetRef.current || callScreen) {
      /* true: no internet */
      setFlag(true);
    } else {
      setFlag(false);
    }
  };

  const toggleFlag = value => {
    /* false: has internet */
    if (currentScreenInfo.name === screens.splash) {
      return;
    }
    if (showCallScreen && !value) {
      return;
    }
    setFlag(value);
    internetRef.current = value;
  };
  const resetCallInfo = () => {
    callDataRef.current = null;
  };
  return (
    <AppContext.Provider
      value={{
        showCallScreen,
        toggleShowCallScreen,
        resetCallInfo,
        flag,
      }}>
      <View style={globalStyles.flex1}>
        {!showCallScreen && <Internet needTop={true} toggleFlag={toggleFlag} />}
        {showCallScreen && <CallOverlay callData={{...callDataRef.current}} />}
        {showCallScreen && <Internet needTop={false} toggleFlag={toggleFlag} />}
        {children}
      </View>
    </AppContext.Provider>
  );
};

const useAppProvider = () => {
  return useContext(AppContext);
};

export {AppProvider, useAppProvider};
