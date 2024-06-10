import React, {useState} from 'react';
import EachMessageFooter from './EachMessageFooter.module';
import BlockMessage from './BlockMessage.module';
import SmsSendShort from './SmsSendShort.module';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import InboxThreadModel, {
  contactDetails,
} from '../../../services/models/InboxThread.model';

const EachConversationFooter = React.memo(({id, type, number}: any) => {
  const [showSmsSend, setShowSmsSend] = useState(false);
  const toggleSmsButton = () => {
    setShowSmsSend(!showSmsSend);
  };
  if (contactDetails?.value?.isBlock) {
    return <BlockMessage />;
  }
  if (
    (type === 'sms' ||
      type === InboxThreadModel.messageType.sms ||
      type === InboxThreadModel.messageType.call ||
      type === InboxThreadModel.messageType.email ||
      type === 'call' ||
      type === 'email') &&
    showSmsSend
  ) {
    return (
      <SmsSendShort
        handleSms={toggleSmsButton}
        contactId={id}
        number={number}
      />
    );
  }
  //have to try animation here below.
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={64}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Animated.View
        style={[styles.footer, showSmsSend ? styles.noBorder : {}]}>
        <EachMessageFooter handleSms={toggleSmsButton} contactId={id} />
      </Animated.View>
    </KeyboardAvoidingView>
  );
});

export default EachConversationFooter;
const styles = StyleSheet.create({
  footer: {
    minHeight: 84,
    borderTopColor: colors.gray8,
    borderTopWidth: 1,
  },
  noBorder: {borderTopWidth: 0},
});
