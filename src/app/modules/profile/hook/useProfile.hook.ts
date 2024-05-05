import {Platform} from 'react-native';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {authStates} from '../../../states/allSelector.state';
import userApiHelper from '../../../services/api/helper/userApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
import {updateUserData} from '../../../states/features/auth/auth.slice';
import {showAlertWithOneAction} from '../../../utilities/helper.utility';
import {messages} from '../../../assets/js/messages.message';
import {useCustomNavigation} from '../../../packages/navigation.package';

const useProfile = () => {
  const {userInfo} = customUseSelector(authStates) || {};
  const dispatch = customUseDispatch();
  const navigation = useCustomNavigation<any>();
  const {
    name,
    image,
    company,
    number,
    email,
    address,
    url,
    isShowAppointmentUrl,
  } = userInfo || {
    name: '',
    image: '',
    company: '',
    number: '',
    email: '',
    address: '',
    url: '',
    isShowAppointmentUrl: false,
  };
  const success = async (params: any) => {
    const supportedFormat = ['jpg', 'jpeg', 'png'];
    const res = Array.isArray(params) ? params[0] : params;
    let ext = res.mime?.split('/')[1];
    const isSupportedFormat = supportedFormat.indexOf(ext) > -1;
    function getFilenameFromURI(uri: string) {
      const pathArray = uri.split('/');
      return pathArray[pathArray.length - 1];
    }
    if (res.size / 1000000 <= 0.5 && isSupportedFormat) {
      const formData = new FormData();
      formData.append('image', {
        ...res,
        filename: getFilenameFromURI(res.path),
        name: getFilenameFromURI(res.path),
        type: res?.mime,
        size: res.size,
        uri:
          Platform.OS === 'android'
            ? res.path
            : res.path.replace('file://', ''),
      });
      const result = await userApiHelper.updateProfileImage(formData);
      const {status, body} = result as apiResponse;
      if (status) {
        const updateUserInfo = {...userInfo, image: body?.fileUrl};
        dispatch(updateUserData(updateUserInfo));
      }
    } else {
      isSupportedFormat
        ? showAlertWithOneAction({
            title: messages.imageExtensionLimitTitle,
            body: messages.imageSizeLimitMessage,
          })
        : showAlertWithOneAction({
            title: messages.imageExtensionLimitTitle,
            body: messages.imageExtensionLimitMessage,
          });
    }
  };
  const failed = () => {};
  const handleNavigate = (screen: string, title?: string) => {
    navigation.navigate(screen, {name: title});
  };
  return {
    failed,
    success,
    name,
    image,
    company,
    number,
    email,
    address,
    url,
    isShowAppointmentUrl,
    handleNavigate,
  };
};

export default useProfile;
