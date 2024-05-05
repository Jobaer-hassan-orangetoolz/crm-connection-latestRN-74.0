import {useEffect, useRef, useState} from 'react';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {quickReplyStates} from '../../../states/allSelector.state';
import {getUserVirtualNumber} from '../../../states/features/user/user.slice';
import {
  checkObjectEmpty,
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import inboxApiHelper from '../../../services/api/helper/inboxApi.helper';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {storeNewMessageInConversation} from '../../../states/features/inbox/eachMessage.slice';
import inboxThreadModel from '../../../services/models/InboxThread.model';
import {messages} from '../../../assets/js/messages.message';
import {titles} from '../../../assets/js/titles.message';

const useFullMessage = ({contactId, message, fromNumber}: any) => {
  const {type} = customUseSelector(quickReplyStates);
  const [messageText, setMessageText] = useState(message);
  const navigation = useCustomNavigation();
  const [title, setTitle] = useState('');
  const [templateFlag, setTemplateFlag] = useState(false);
  const messageInputRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState<any>({});
  const [vn, setVn] = useState<any>(fromNumber);
  const scheduleData = useRef({date: '', time: '', flag: false});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = customUseDispatch();
  const onChangeText = (text: string, name: string) => {
    if (name === 'message') {
      setMessageText(text);
    } else if (name === 'replyTitle') {
      setTitle(text);
    }
  };
  useEffect(() => {
    messageInputRef.current.focus();
  }, []);
  const onSelectionChange = (event: any) => {
    const {start, end} = event.nativeEvent.selection;
    setCursorPosition({start, end});
  };
  const handlePersonalizeText = (value: string) => {
    addTextAtCursorPosition(value);
  };
  const handleQuickReply = (text: string) => {
    setMessageText(text);
  };
  const addTextAtCursorPosition = (textToAdd: string) => {
    if (checkObjectEmpty(cursorPosition)) {
      setMessageText((pre: string) => pre + ' ' + textToAdd);
      return;
    }
    const prvMsg = messageText;
    const newText =
      prvMsg.substring(0, cursorPosition.start || 0) +
      textToAdd +
      prvMsg.substring(cursorPosition.end || 0);
    messageInputRef.current.setNativeProps({text: newText});
    setMessageText(newText);
  };
  const getDataHandler = () => {
    dispatch(getUserVirtualNumber(true));
  };
  const handleVirtualNumber = (item: any) => {
    setVn({number: item.virtualNumber, id: item.id});
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const _payload = {
      message: messageText,
      contact_id: contactId,
      virtual_number_id: vn.id,
      virtual_number: vn.number,
      schedule_type: scheduleData.current.flag === true ? 2 : 1,
      time: scheduleData.current.time,
      date: scheduleData.current.date,
      template: title,
      save_as_template: templateFlag,
      template_title: title,
    };
    const result = await inboxApiHelper.sendSms(_payload);
    if (result.status) {
      navigation.goBack();
      dispatch(
        storeNewMessageInConversation(
          inboxThreadModel.outgoingConversation({item: result.body}),
        ),
      );
      setIsLoading(false);
    } else {
      setIsLoading(false);
      if (result.message.indexOf("Invalid 'To' Phone Number") !== -1) {
        return showAlertWithOneAction({
          title: titles.invalidNumber,
          body: messages.wrongReceiverNumber,
        });
      }
      if (result.message.indexOf('Message body is required') !== -1) {
        return showAlertWithOneAction({
          title: titles.invalidAttempt,
          body: messages.personalizedTemplateEmpty,
        });
      }
    }
  };
  const messageValidation = () => {
    if (
      isEmpty(contactId) ||
      isEmpty(vn.number) ||
      isEmpty(vn.id) ||
      isEmpty(messageText)
    ) {
      return false;
    }
    if (templateFlag && isEmpty(title)) {
      return false;
    }
    return true;
  };
  return {
    messageText,
    onChangeText,
    type,
    onSelectionChange,
    messageInputRef,
    handleSubmit,
    getDataHandler,
    handleVirtualNumber,
    vn,
    handlePersonalizeText,
    handleQuickReply,
    templateFlag,
    setTemplateFlag,
    scheduleData,
    messageValidation,
    isLoading,
  };
};
export default useFullMessage;
