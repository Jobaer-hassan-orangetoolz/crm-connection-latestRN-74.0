import {useEffect, useState} from 'react';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {clearAction as contactNoteClear} from '../../../states/features/contact/contactNote.slice';
import {isGettingAction as contactNoteGetting} from '../../../states/features/contact/contactNote.slice';
import {
  isGettingAction as contactTaskGetting,
  storeTaskTabValue,
} from '../../../states/features/contact/contactTask.slice';
import {clearAction as contactScheduleClear} from '../../../states/features/contact/contactSchedule.slice';
import {clearAction as contactTaskClear} from '../../../states/features/contact/contactTask.slice';
import {showAlertWithTwoActions} from '../../../utilities/helper.utility';
import {deleteContact} from '../../../states/features/contact/contacts.slice';
import {titles} from '../../../assets/js/titles.message';
import {messages} from '../../../assets/js/messages.message';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {contactDetailsStates} from '../../../states/allSelector.state';
import {
  isGettingContactDetails,
  refreshingContactDetails,
  clearAction as clearContactDetails,
} from '../../../states/features/contact/contactDetails.slice';
import {
  contactTabTitles,
  contactTaskTabOptions,
} from '../../../assets/js/dropdown.data';
import {
  isGettingContactCampaign,
  isGettingContactCustomField,
  isGettingContactPipeline,
  isGettingContactTags,
  clearAction as clearAboutContact,
} from '../../../states/features/contact/aboutContact.slice';
import {
  refreshingAction as isGettingEachMessageAction,
  clearAction as clearEachMessageContact,
} from '../../../states/features/inbox/eachMessage.slice';
import {contactInterface} from '../../../services/formatter/contact.formatter';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';
import {screens} from '../../../routes/routeName.route';
interface selector {
  isLoading: boolean;
  data: contactInterface;
  refreshing: boolean;
  isGetting: boolean;
}

const useContactDetails = (id: string, index?: string | number) => {
  const {isLoading, data, refreshing}: selector =
    customUseSelector(contactDetailsStates);
  const [tab, setTab] = useState(contactTabTitles[0]);
  const navigation = useCustomNavigation<any>();
  const dispatch = customUseDispatch();
  const clearData = () => {
    dispatch(contactNoteClear());
    dispatch(contactScheduleClear());
    dispatch(contactTaskClear());
    dispatch(clearContactDetails());
    dispatch(clearAboutContact());
    dispatch(clearEachMessageContact());
  };
  useEffect(() => {
    if (id) {
      dispatch(isGettingContactDetails({id, navigation}));
    }
    return clearData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const onRefresh = () => {
    dispatch(refreshingContactDetails({id, navigation}));
    dispatch(contactNoteClear());
    dispatch(isGettingContactCampaign(id));
    dispatch(isGettingContactTags(id));
    dispatch(isGettingContactPipeline(id));
    dispatch(isGettingContactCustomField(id));
    dispatch(isGettingEachMessageAction({contactId: id}));
    if (tab.value === 4) {
      dispatch(contactNoteClear());
      dispatch(storeTaskTabValue({type: contactTaskTabOptions[0].value}));
      dispatch(
        contactTaskGetting({
          page: 1,
          perPage: 10,
          id,
          type: contactTaskTabOptions[0].value,
        }),
      );
    } else if (tab.value === 3) {
      dispatch(contactTaskClear());
      dispatch(contactNoteGetting({page: 1, perPage: 10, id}));
    } else {
      dispatch(contactNoteClear());
      dispatch(contactTaskClear());
    }
  };
  const handleDeleteContact = () => {
    const onPressAction = async (action: any) => {
      action === 'confirm' &&
        (contactApiHelper.deleteContact(id),
        dispatch(deleteContact({id: id, index})),
        navigation.goBack());
    };
    showAlertWithTwoActions({
      title: titles.deleteContact,
      body: messages.deleteContactMessage,
      onPressAction,
    });
  };
  const handleEditContact = () => {
    navigation.navigate(screens.addContact as never, {
      id: id,
      action: 'edit',
    });
  };
  return {
    data,
    isLoading,
    refreshing,
    onRefresh,
    handleDeleteContact,
    handleEditContact,
    tab,
    setTab,
  };
};

export default useContactDetails;
