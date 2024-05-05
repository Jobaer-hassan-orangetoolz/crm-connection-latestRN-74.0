import {useState} from 'react';
import {profileCustomField} from '../../../assets/js/dropdown.data';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {authStates} from '../../../states/allSelector.state';
import {
  checkIsValidNumber,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {messages} from '../../../assets/js/messages.message';
import userApiHelper from '../../../services/api/helper/userApi.helper';
import {updateUserData} from '../../../states/features/auth/auth.slice';
import {useCustomNavigation} from '../../../packages/navigation.package';
interface states {
  firstName: string;
  lastName: string;
  number: string;
  company_name: string;
  url: string;
  address: string;
}
const useUpdateProfile = (name: string) => {
  const {
    title,
    description,
    field = [],
  } = (profileCustomField as any)[name.toLowerCase()] || {};
  const {userInfo} = customUseSelector(authStates);
  const {
    name: userName,
    company,
    number,
    address,
    url,
  } = userInfo || {
    name: '',
    image: '',
    company: '',
    number: '',
    email: '',
    address: '',
    website: '',
    showUrl: false,
  };
  const navigation = useCustomNavigation();
  const dispatch = customUseDispatch();
  const firstName = userName.split(' ').slice(0, -1).join(' ');
  const lastName = userName.split(' ').slice(-1).join(' ');
  const [values, setValues] = useState<states>({
    firstName,
    lastName,
    number,
    company_name: company,
    url,
    address,
  });
  const handleChange = (value: string, fieldName: string) => {
    setValues((preValue: states) => ({...preValue, [fieldName]: value}));
  };
  const handleSubmit = async () => {
    const generateName = name?.toLocaleLowerCase();
    switch (generateName) {
      case 'phone':
        const validNumber = checkIsValidNumber(values.number);
        if (!validNumber) {
          showAlertWithOneAction({
            title: messages.invalidNumber,
            body: messages.invalidNumberMessage,
          });
          return;
        }
        const payload = {
          name: name.toLocaleLowerCase(),
          value: values.number,
        };
        dispatch(updateUserData({...userInfo, number: values.number}));
        userApiHelper.updateProfile(payload);
        navigation.goBack();
        return;
      case 'name':
        const nameObject = {
          name: 'name',
          value: values.firstName?.concat(' ', values.lastName),
        };
        dispatch(
          updateUserData({
            ...userInfo,
            name: values.firstName?.concat(' ', values.lastName),
          }),
        );
        userApiHelper.updateProfile(nameObject);
        navigation.goBack();
        return;
      default:
        const defaultObject = {
          name: generateName,
          value: (values as any)[generateName],
        };
        dispatch(
          updateUserData({
            ...userInfo,
            [generateName === 'company_name' ? 'company' : generateName]: (
              values as any
            )[generateName],
          }),
        );
        await userApiHelper.updateProfile(defaultObject);
        navigation.goBack();
        return;
    }
  };
  return {
    values,
    title,
    description,
    field,
    handleChange,
    handleSubmit,
  };
};

export default useUpdateProfile;
