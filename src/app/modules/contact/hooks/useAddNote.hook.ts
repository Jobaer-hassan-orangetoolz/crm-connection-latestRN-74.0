import {useEffect, useRef, useState} from 'react';
import {messages} from '../../../assets/js/messages.message';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';
import {addContactNote} from '../../../states/features/contact/contactNote.slice';
import {
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {authStates, userStates} from '../../../states/allSelector.state';
import {getTeamUser} from '../../../states/features/user/user.slice';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {contactInterface} from '../../../services/formatter/contact.formatter';

const useAddNote = (id?: number, contact?: boolean) => {
  const note = useRef<string>('');
  const {teamUser} = customUseSelector(userStates);
  const dispatch = customUseDispatch();
  const {userInfo} = customUseSelector(authStates);
  const navigation = useCustomNavigation<any>();
  const [contactInfo, setContactInfo] = useState<{
    name?: string;
    id: number | string;
  }>({
    name: '',
    id: id,
  });
  useEffect(() => {
    if (isEmpty(teamUser)) {
      dispatch(getTeamUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSave = () => {
    if (!note.current && contactInfo.id) {
      contactInfo.id
        ? showAlertWithOneAction({
            title: messages.invalid,
            body: messages.messageContactNotEmpty,
          })
        : showAlertWithOneAction({
            title: messages.invalid,
            body: messages.messageNotEmpty,
          });
      return;
    }
    const payload = {contactId: contactInfo.id, message: note.current};
    contactApiHelper.addNote({
      contactId: contactInfo.id,
      note: note.current,
    });
    if (contact) {
      const successNote = {
        ...payload,
        user: {full_name: userInfo.name},
        created_at: new Date(),
      };
      dispatch(addContactNote({item: successNote}));
    }
    navigation.goBack();
  };
  const getDataHandler = async (
    query: {page: number; perPage: number; search?: string},
    success: (params: any) => void,
  ) => {
    const result = await contactApiHelper.getContactList({
      page: query.page,
      perPage: query.perPage,
      search: query.search,
    });
    success(result);
  };
  const onChange = (text: string) => {
    note.current = text;
  };
  const handleNumberChange = (item: contactInterface) => {
    setContactInfo({
      name: item.name || item.email || item.number,
      id: item.id,
    });
  };
  return {
    handleNumberChange,
    onChange,
    getDataHandler,
    handleSave,
    note: note.current,
    contactInfo,
    teamUser,
  };
};

export default useAddNote;
