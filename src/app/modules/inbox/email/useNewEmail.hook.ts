/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {authStates, quickReplyStates} from '../../../states/allSelector.state';
import {
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import inboxApiHelper from '../../../services/api/helper/inboxApi.helper';
import {storeNewMessageInConversation} from '../../../states/features/inbox/eachMessage.slice';
import inboxThreadModel from '../../../services/models/InboxThread.model';
import {useCustomNavigation} from '../../../packages/navigation.package';

const useNewEmail = ({contactId, from}: any) => {
  const {type} = customUseSelector(quickReplyStates);
  const [subjectText, setSubjectText] = useState('');
  const [messageText, setMessageText] = useState('');
  const {userInfo} = customUseSelector(authStates);
  const messageInputRef = useRef(null);
  const subjectInputRef = useRef(null);
  const [title, setTitle] = useState('');
  const [templateFlag, setTemplateFlag] = useState(false);
  const scheduleData = useRef({date: '', time: '', flag: false});
  const [cursorPosition, setCursorPosition] = useState<any>({});
  const [fromEmail, setFromEmail] = useState<any>(null); //userInfo.defaultEmail
  const [isLoading, setIsLoading] = useState<any>(false);
  const dispatch = customUseDispatch();
  const navigation = useCustomNavigation();
  const handleFromEmail = (value: any) => {
    setFromEmail(value.campaignEmail);
  };
  const onChangeText = (text: string, name: string) => {
    if (name === 'message') {
      setMessageText(text);
    } else if (name === 'subject') {
      setSubjectText(text);
    } else if (name === 'replyTitle') {
      setTitle(text);
    }
  };
  const handlePersonalizeText = (value: string, name: string) => {
    addTextAtCursorPosition(value, name);
  };
  const handleQuickReply = (value: any) => {
    setMessageText(value);
  };
  const onSelectionChange = (event: any) => {
    const {start, end} = event.nativeEvent.selection;
    setCursorPosition({start, end});
  };
  const addTextAtCursorPosition = (textToAdd: string, name: string) => {
    if (name === 'message') {
      const prvMsg = messageText;
      const newText =
        prvMsg.substring(0, cursorPosition.start || 0) +
        textToAdd +
        prvMsg.substring(cursorPosition.end || 0);
      setMessageText(newText);
    } else if (name === 'subject') {
      const prvSub = subjectText;
      const newText =
        prvSub.substring(0, cursorPosition.start || 0) +
        textToAdd +
        prvSub.substring(cursorPosition.end || 0);
      setSubjectText(newText);
    }
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const _payload = {
      message: messageText,
      subject: subjectText,
      email: fromEmail,
      contact_id: contactId,
      schedule_type: scheduleData.current.flag === true ? 2 : 1,
      time: scheduleData.current.time,
      date: scheduleData.current.date,
      saveTemplateTitle: templateFlag,
      template_title: title,
      save_as_template: templateFlag,
    };
    const result = await inboxApiHelper.sendEmail(_payload);
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
      showAlertWithOneAction({
        title: 'Something error',
        body: 'There have some error with Email',
      });
    }
  };
  const EmailValidation = () => {
    if (isEmpty(contactId) || isEmpty(messageText) || isEmpty(subjectText)) {
      return false;
    }
    if (templateFlag && isEmpty(title)) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (userInfo && userInfo.isEmailProviderNylas) {
      setFromEmail(userInfo?.connectedEmail || null);
    } else {
      setFromEmail(userInfo?.defaultEmail || null);
    }
  }, []);
  return {
    subjectText,
    messageText,
    onChangeText,
    type,
    onSelectionChange,
    messageInputRef,
    subjectInputRef,
    handleSubmit,
    handlePersonalizeText,
    handleQuickReply,
    templateFlag,
    setTemplateFlag,
    EmailValidation,
    scheduleData,
    userInfo,
    handleFromEmail,
    fromEmail,
    isLoading,
  };
};
export default useNewEmail;
