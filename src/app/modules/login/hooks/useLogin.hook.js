import {useEffect, useRef, useState} from 'react';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import loginValidator from '../../../services/validators/login.validator';
import {showAlertWithOneAction} from '../../../utilities/helper.utility';
import {messages} from '../../../assets/js/messages.message';
import {buttons} from '../../../assets/js/buttons.message';
import {config} from '../../../../config';
import userApiHelper from '../../../services/api/helper/userApi.helper';
import {
  getLocalData,
  storeLocalData,
} from '../../../packages/asyncStorage/storageHandle';
import {customUseDispatch} from '../../../packages/redux.package';
import {storeUserData} from '../../../states/features/auth/auth.slice';

const useLogin = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const inputRef = useRef({
    email: '',
    password: '',
  });
  const emailInputRef = useRef(null);
  const passInputRef = useRef(null);
  const navigation = useCustomNavigation();
  const dispatch = customUseDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    const loginData = {
      email: inputRef.current.email,
      password: inputRef.current.password,
    };
    let msg = loginValidator.isValidForLogin(loginData);
    if (msg !== '') {
      showAlertWithOneAction({
        title: messages.tryAgain,
        body: msg,
        okButtonText: buttons.gotIt,
      });
      return;
    }
    setIsLoading(true);
    try {
      const requestData = {
        ...loginData,
      };
      if (!config.commonApp) {
        requestData.agencyId = config.agencyId;
      }
      const {status, body, message} = await userApiHelper.tryUserLogin(
        requestData,
      );
      if (status) {
        dispatch(storeUserData(body));
        storeLocalData.loggedInFlag(true);
        storeLocalData.userCredential(loginData);
        storeLocalData.apiToken(body.apiKey);
        storeLocalData.timezone(body.timezone);
        setIsLoading(false);
        if (!body.isActivePackage) {
          navigation.replace(screens.inactivePackage, {
            domain: body.domain,
            title: body.agencyName,
          });
          return;
        }
        if (!body.isCompleteOnBoarding) {
          navigation.replace(screens.onboarding, {
            domain: body.domain,
            title: body.agencyName,
          });
          return;
        }
        navigation.replace(screens.home);
      } else {
        setIsLoading(false);
        showAlertWithOneAction({
          title: messages.oops,
          body: message,
        });
      }
    } catch (_) {
      setIsLoading(false);
      showAlertWithOneAction({
        title: messages.oops,
        body: messages.wentWrong,
      });
    }
  };
  const handleNavigateToTC = () => {
    navigation.navigate(screens.webView, {
      title: config.title,
      url: config.termsUrl,
    });
  };
  const toggleShowPass = () => {
    setIsShowPass(!isShowPass);
  };
  const onChangeValue = (text, name) => {
    if (name === 'email') {
      inputRef.current.email = text;
    } else if (name === 'password') {
      inputRef.current.password = text;
    }
  };
  useEffect(() => {
    const getCreds = async () => {
      const creds = await getLocalData.userCredential();
      try {
        inputRef.current.email = creds.email;
        inputRef.current.password = creds.password;
        emailInputRef.current.setNativeProps({text: creds.email});
        passInputRef.current.setNativeProps({text: creds.password});
      } catch (_) {}
    };
    getCreds();
  }, []);

  return {
    isShowPass,
    emailInputRef,
    passInputRef,
    toggleShowPass,
    handleLogin,
    handleNavigateToTC,
    onChangeValue,
    isLoading,
  };
};
export default useLogin;
