/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
import {useEffect, useRef, useState} from 'react';
import {useCustomNavigation} from '../../../../packages/navigation.package';
import {screens} from '../../../../routes/routeName.route';
import {
  checkIsValidNumber,
  checkObjectEmpty,
  getNameData,
  isEmailValid,
  isEmpty,
  showAlertWithOneAction,
  stringIsNumber,
} from '../../../../utilities/helper.utility';
import {messages} from '../../../../assets/js/messages.message';
import contactApiHelper from '../../../../services/api/helper/contactApi.helper';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../../packages/redux.package';
import {contactsStates} from '../../../../states/allSelector.state';
import {refreshingAction} from '../../../../states/features/contact/contacts.slice';
import {
  isGettingContactCampaign,
  isGettingContactCustomField,
  isGettingContactPipeline,
  isGettingContactTags,
  refreshingContactDetails,
} from '../../../../states/features/contact/aboutContact.slice';
export interface paramsP {
  id?: number;
  action?: 'edit' | 'add';
}

const useAddContact = ({id, action}: paramsP) => {
  const navigation = useCustomNavigation<any>();
  const dispatch = customUseDispatch();
  const {page} = customUseSelector(contactsStates);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [cfs, setCfs] = useState<any>([]);

  const formValueRef = useRef<any>({
    name: '',
    number: '',
    email: '',
    companyName: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    address: '',
    dealValue: 0,
  });
  const customFieldValueRef = useRef<any>({});
  const selectedCustomFieldRef = useRef<any[]>([]);

  /* for edit */
  const editContactInfoRef = useRef<any>({
    name: '',
    number: '',
    email: '',
    companyName: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    address: '',
    dealValue: 0,
  });

  useEffect(() => {
    if (action && action === 'edit') {
      setIsLoading(true);
      getContactDetails();
    }
  }, []);
  const getContactDetails = async () => {
    const {status, body} = await contactApiHelper.getContactDetails(`${id}`);
    if (status) {
      formValueRef.current.number = body.number ?? '';
      formValueRef.current.email = body.email ?? '';
      formValueRef.current.companyName = body.companyName ?? body.company ?? '';
      formValueRef.current.country = body.country ?? '';
      formValueRef.current.state = body.state ?? '';
      formValueRef.current.city = body.city ?? '';
      formValueRef.current.zip = body.zip ?? '';
      formValueRef.current.address = body.address ?? '';
      formValueRef.current.dealValue = body.dealValue ?? 0;
      formValueRef.current.name = body.firstName + ' ' + body.lastName;
      /* for edit */
      editContactInfoRef.current.number = body.number ?? '';
      editContactInfoRef.current.email = body.email ?? '';
      editContactInfoRef.current.companyName =
        body.companyName ?? body.company ?? '';
      editContactInfoRef.current.country = body.country ?? '';
      editContactInfoRef.current.state = body.state ?? '';
      editContactInfoRef.current.city = body.city ?? '';
      editContactInfoRef.current.zip = body.zip ?? '';
      editContactInfoRef.current.address = body.address ?? '';
      editContactInfoRef.current.dealValue = body.dealValue ?? 0;
      editContactInfoRef.current.firstName = body.firstName ?? '';
      editContactInfoRef.current.lastName = body.lastName ?? '';
      //   const {status: _status, body: _body} =
      //     await contactApiHelper.contactCustomFieldList(id);
      //   if (_status && _body && _body.length > 0) {
      //     _body.map((_item: any) => {
      //       customFieldValueRef.current = {
      //         ...customFieldValueRef.current,
      //         [_item.user_custom_fields.personalizeTag]: _item.value,
      //       };
      //       selectedCustomFieldRef.current.push(
      //         _item.user_custom_fields.personalizeTag,
      //       );
      //       setCfs(() => [
      //         ...cfs,
      //         {
      //           ..._item.user_custom_fields,
      //           defaultValues: _item.value,
      //         },
      //       ]);
      //     });
      //   }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      navigation.goBack();
    }
  };
  const onChangeHandler = (text: any, name: string) => {
    if (name) {
      formValueRef.current[name] = text;
      if (name === 'number' || name === 'email') {
        if (
          !isSubmitting &&
          isEmpty(formValueRef.current.number) &&
          isEmpty(formValueRef.current.email)
        ) {
          setIsFormValid(false);
        } else {
          setIsFormValid(true);
        }
      }
    }
  };
  const handleGoToCustomFieldList = () => {
    navigation.navigate(screens.customFieldList as never, {
      from: 'add-contact',
      selected: selectedCustomFieldRef.current,
      onSelect: (field: any) => {
        setCfs(() => [...cfs, field]);
        selectedCustomFieldRef.current.push(field.personalizeTag);
        customFieldValueRef.current[field.personalizeTag] = '';
      },
    });
  };
  const removeCustomField = (tag: string, index: number) => {
    const list = [...cfs];
    list.splice(index, 1);
    setCfs(list);
    const indexOf = selectedCustomFieldRef.current.indexOf(tag);
    if (indexOf > -1) {
      selectedCustomFieldRef.current.splice(indexOf, 1);
    }
    try {
      delete customFieldValueRef.current[tag];
    } catch (_) {}
  };
  const onChangeCustomFieldValue = (
    text: any,
    name: string /* index?: any */,
  ) => {
    customFieldValueRef.current[name] = text;
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsFormValid(false);
    let errorMessage = messages.invalidAddContactFormMessage;
    let formIsValid = true,
      forms = {...formValueRef.current};
    /* validation start */
    forms = {...forms, ...getNameData(formValueRef.current.name)};
    try {
      delete forms.name;
    } catch (_) {}
    if (isEmpty(forms.number) && isEmpty(forms.email)) {
      formIsValid = false;
    } else {
      if (!isEmpty(forms.number) && !checkIsValidNumber(forms.number)) {
        formIsValid = false;
      }
      if (!isEmpty(forms.email) && !isEmailValid(forms.email)) {
        formIsValid = false;
        errorMessage = messages.invalidEmail;
      }
    }
    if (!stringIsNumber(forms.dealValue)) {
      formIsValid = false;
      errorMessage = messages.dealValueError;
    }
    /* todo: work for custom field */
    if (!checkObjectEmpty(customFieldValueRef.current)) {
      for (const data in customFieldValueRef.current) {
        if (isEmpty(customFieldValueRef.current[data])) {
          formIsValid = false;
          errorMessage = messages.customFieldData;
          break;
        }
        if (forms.customField) {
          forms.customField = {
            ...forms.customField,
            [data]: customFieldValueRef.current[data],
          };
        } else {
          forms.customField = {
            [data]: customFieldValueRef.current[data],
          };
        }
        forms.customField[data] = customFieldValueRef.current[data];
      }
    }
    /* validation end */
    if (!formIsValid) {
      setIsSubmitting(false);
      showAlertWithOneAction({
        title: messages.invalidAddContactForm,
        body: errorMessage,
      });
      return;
    }
    if (forms.number.length === 10) {
      forms.number = '1' + forms.number;
    }
    forms.dealValue = parseInt(forms.dealValue);
    if (action && action === 'edit') {
      forms.contactId = id;
      forms.previousValue = {...editContactInfoRef.current};
      forms.number = isEmpty(forms.number) ? null : forms.number;
      forms.email = isEmpty(forms.email) ? null : forms.email;
    }
    const {message, status /* body */} = await contactApiHelper[
      action && action === 'edit' ? 'editContact' : 'addContact'
    ](forms);
    /*
     {
        "id": body.id,
        "firstName": body.firstName,
        "lastName": body.lastName,
        "email": body.email,
        "number": body.email,
        "dealValue": body.dealValue,
        "current_user": ""
    }
    */
    if (status) {
      dispatch(refreshingAction()); /* TODO: will remove later */
      /* implement mechanism for edit contact */
      if (page === 1) {
        /* refresh contact */
      } else {
        /* push new data to 0 index */
      }
      dispatch(refreshingContactDetails({id, navigation}));
      dispatch(isGettingContactCampaign(id));
      dispatch(isGettingContactTags(id));
      dispatch(isGettingContactPipeline(id));
      dispatch(isGettingContactCustomField(id));
      setIsSubmitting(false);
      navigation.goBack();
    } else {
      showAlertWithOneAction({
        title: messages.invalidAddContactForm,
        body: message,
      });
      setIsSubmitting(false);
    }
  };
  const customFieldFlagGroup = () => {
    if (action && action === 'edit') {
      return false;
    }
    if (cfs.length === 0) {
      return true;
    }
    return false;
  };
  const customFieldFlag = () => {
    if (action && action === 'edit') {
      return false;
    }
    if (showMore || cfs.length > 0) {
      return true;
    }
    return false;
  };
  return {
    showMore,
    setShowMore,
    handleGoToCustomFieldList,
    onChangeHandler,
    isSubmitting,
    handleSubmit,
    isFormValid,
    formValueRef,
    removeCustomField,
    onChangeCustomFieldValue,
    cfs,
    isLoading,
    customFieldFlagGroup,
    customFieldFlag,
  };
};
export default useAddContact;
