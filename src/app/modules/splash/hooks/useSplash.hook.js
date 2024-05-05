import {useRef} from 'react';
import {customUseSafeAreaInsets} from '../../../packages/safeAreaContext.package';
import {SCREENS} from '../../../assets/js/core.data';
import {config} from '../../../../config';
import appApiHelper from '../../../services/api/helper/appApi.helper';
import {checkObjectEmpty} from '../../../utilities/helper.utility';
import {getLocalData} from '../../../packages/asyncStorage/storageHandle';
import {buttons} from '../../../assets/js/buttons.message';
import {colors} from '../../../assets/styles/colors.style.asset';
import {messages} from '../../../assets/js/messages.message';
import {tabTitles, titles} from '../../../assets/js/titles.message';
import {placeholders} from '../../../assets/js/placeholders.message';
import userApiHelper from '../../../services/api/helper/userApi.helper';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import useDelay from '../../../utilities/hooks/useDelay.hook';
import {customUseDispatch} from '../../../packages/redux.package';
import {storeUserData} from '../../../states/features/auth/auth.slice';
import {userLocalTimezone} from '../../../services/models/_Timezone.modal';

const useSplash = () => {
  const {bottom} = customUseSafeAreaInsets();
  const navigation = useCustomNavigation();
  const dispatch = customUseDispatch();

  const dataModifyApi = useRef(false);
  const localData = useRef(false);
  const profileData = useRef(false);
  const screenName = useRef(SCREENS.splash);
  const extraData = useRef(null);

  useDelay(() => {
    config.activityHeight = bottom;
    initApp();
  });
  const handleAppReadyState = () => {
    if (dataModifyApi.current && localData.current && profileData.current) {
      handleScreenChange();
    }
  };
  const handleScreenChange = () => {
    if (screenName.current === SCREENS.login) {
      navigation.replace(screens.login);
    } else {
      checkAuthScreen();
    }
  };
  const checkAuthScreen = async () => {
    if (screenName.current === SCREENS.inactivePackage) {
      navigation.replace(screens.inactivePackage, {
        domain: extraData.current.domain,
        title: extraData.current.title,
      });
      return;
    }
    if (screenName.current === SCREENS.onboarding) {
      navigation.replace(screens.onboarding, {
        domain: extraData.current.domain,
        title: extraData.current.title,
      });
      return;
    }
    if (screenName.current === SCREENS.home) {
      navigation.replace(screens.home);
    }
  };
  const initApp = async () => {
    await handleConfigData();
    await handleLocalData();
  };
  const handleConfigData = async () => {
    try {
      const {status, body} = await appApiHelper.getAppModifyData();
      if (status) {
        const {
          buttons: modifyButtons,
          colors: modifyColors,
          messages: modifyMessages,
          titles: modifyTitles,
          placeholders: modifyPlaceholders,
          tabTitles: modifyTabTitles,
          configs: modifyConfigs,
        } = body;
        if (!checkObjectEmpty(modifyButtons)) {
          for (const [key, value] of Object.entries(modifyButtons)) {
            buttons[key] = value;
          }
        }
        if (!checkObjectEmpty(modifyColors)) {
          for (const [key, value] of Object.entries(modifyColors)) {
            colors[key] = value;
          }
        }
        if (!checkObjectEmpty(modifyMessages)) {
          for (const [key, value] of Object.entries(modifyMessages)) {
            messages[key] = value;
          }
        }
        if (!checkObjectEmpty(modifyTitles)) {
          for (const [key, value] of Object.entries(modifyTitles)) {
            titles[key] = value;
          }
        }
        if (!checkObjectEmpty(modifyPlaceholders)) {
          for (const [key, value] of Object.entries(modifyPlaceholders)) {
            placeholders[key] = value;
          }
        }
        if (!checkObjectEmpty(modifyTabTitles)) {
          for (const [key, value] of Object.entries(modifyTabTitles)) {
            tabTitles[key] = value;
          }
        }
        if (!checkObjectEmpty(modifyConfigs)) {
          for (const [key, value] of Object.entries(modifyConfigs)) {
            config[key] = value;
          }
        }
      }
      dataModifyApi.current = true;
      handleAppReadyState();
    } catch (_) {
      dataModifyApi.current = true;
      handleAppReadyState();
    }
  };
  const handleLocalData = async () => {
    let screenState = SCREENS.login;
    const loggedInFlag = await getLocalData.isLoggedIn();
    const timezone = await getLocalData.getUserTimezone();
    if (loggedInFlag) {
      localData.current = true;
      await getUserProfileData();
      userLocalTimezone.timezone = timezone;
    } else {
      screenName.current = screenState;
      profileData.current = true;
      localData.current = true;
      handleAppReadyState();
    }
  };
  const getUserProfileData = async () => {
    try {
      const {status, body} = await userApiHelper.getProfileData();
      if (status) {
        screenName.current = SCREENS.home;
        extraData.current = {domain: body.domain, title: body.agencyName};
        if (!body.isCompleteOnBoarding) {
          screenName.current = SCREENS.onboarding;
        }
        if (!body.isActivePackage) {
          screenName.current = SCREENS.inactivePackage;
        }
        dispatch(storeUserData(body));
        profileData.current = true;
      } else {
        screenName.current = SCREENS.login;
        profileData.current = true;
      }
      handleAppReadyState();
    } catch (_) {
      profileData.current = true;
      handleAppReadyState();
    }
  };
  return {};
};
export default useSplash;
