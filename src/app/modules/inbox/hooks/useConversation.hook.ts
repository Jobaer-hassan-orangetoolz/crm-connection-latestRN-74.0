/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {userStates} from '../../../states/allSelector.state';
import {getUserVirtualNumber} from '../../../states/features/user/user.slice';
import {storeNewMessageInConversation} from '../../../states/features/inbox/eachMessage.slice';
import inboxThreadModel, {
  contactDetails,
} from '../../../services/models/InboxThread.model';
import inboxApiHelper from '../../../services/api/helper/inboxApi.helper';
import {useIsMounted} from '../../../utilities/hooks/useIsMounted.hook';
import {
  checkObjectEmpty,
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {titles} from '../../../assets/js/titles.message';
import {messages} from '../../../assets/js/messages.message';
import {Keyboard} from 'react-native';

const useConversation = ({contactId}: any) => {
  const navigation = useCustomNavigation();
  const dispatch = customUseDispatch();
  const textInputRef = useRef<any>(null);
  const [messageText, setMessageText] = useState('');
  const [cursorPosition, setCursorPosition] = useState<any>({});
  const [fromNumber, setFromNumber] = useState<any>({});
  const {userVNs} = customUseSelector(userStates);
  const isMount = useIsMounted();
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeText = (text: any) => {
    setMessageText(text);
    textInputRef.current.setNativeProps({text: messageText});
  };
  useEffect(() => {
    if (!isMount && contactDetails) {
      if (isEmpty(contactDetails?.value?.lastNumber)) {
        setFromNumber({number: userVNs[0]?.virtualNumber, id: userVNs[0]?.id});
      } else {
        const selectedItem = userVNs.find(
          (item: any) => item.id === contactDetails?.value?.lastNumber,
        );
        setFromNumber({
          number: selectedItem?.virtualNumber,
          id: selectedItem?.id,
        });
      }
    }
    textInputRef.current.focus();
  }, []);
  const handlePersonalizeText = (value: string) => {
    addTextAtCursorPosition(value);
  };
  const handleFromNumber = (value: any) => {
    setFromNumber({number: value.virtualNumber, id: value.id});
  };
  const getDataHandler = async () => {
    dispatch(getUserVirtualNumber(true));
  };
  const handleSuccessReply = (reply: string) => {
    setMessageText(reply);
  };
  const onSelectionChange = (event: any) => {
    const {start, end} = event.nativeEvent.selection;
    setCursorPosition({start, end});
  };
  const addTextAtCursorPosition = (textToAdd: string) => {
    if (checkObjectEmpty(cursorPosition)) {
      setMessageText((pre: string) => pre + ' ' + textToAdd);
      return;
    }
    const value = messageText;
    const newText =
      value.substring(0, cursorPosition.start || 0) +
      textToAdd +
      value.substring(cursorPosition.end || 0);
    setMessageText(newText);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    const _payload = {
      message: messageText,
      contact_id: contactId,
      virtual_number_id: fromNumber.id,
      virtual_number: fromNumber.number,
      schedule_type: 1,
      time: '',
      date: '',
      template: '',
      save_as_template: false,
      template_title: '',
    };

    const result = await inboxApiHelper.sendSms(_payload);
    if (result.status) {
      setIsLoading(false);
      setMessageText('');
      dispatch(
        storeNewMessageInConversation(
          inboxThreadModel.outgoingConversation({item: result.body}), // 1 == sms
        ),
      );
    } else {
      setIsLoading(false);
      showAlertWithOneAction({
        title: titles.invalidAttempt,
        body: messages.wentWrong,
      });
    }
  };
  return {
    messageText,
    handleChangeText,
    handleSubmit,
    textInputRef,
    onSelectionChange,
    navigation,
    handleSuccessReply,
    userVNs,
    getDataHandler,
    handleFromNumber,
    fromNumber,
    handlePersonalizeText,
    isLoading,
  };
};
export default useConversation;
