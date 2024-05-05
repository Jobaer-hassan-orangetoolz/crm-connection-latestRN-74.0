import React, {useState} from 'react';
import EachMessageFooter from './EachMessageFooter.module';
import BlockMessage from './BlockMessage.module';
import SmsSendShort from './SmsSendShort.module';
import {isEmpty} from '../../../utilities/helper.utility';
import {Animated, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {colors} from '../../../assets/styles/colors.style.asset';
import {contactDetails} from '../../../services/models/InboxThread.model';

const EachConversationFooter = ({id, type, number}: any) => {
  const [showSmsSend, setShowSmsSend] = useState(false);
  const toggleSmsButton = () => {
    setShowSmsSend(!showSmsSend);
  };
  if (contactDetails?.value?.isBlock) {
    return <BlockMessage />;
  }
  if (showSmsSend || type === 'sms') {
    if (isEmpty(type) && showSmsSend) {
      return (
        <SmsSendShort
          handleSms={toggleSmsButton}
          contactId={id}
          number={number}
        />
      );
    }
    if (type === 'sms' && !showSmsSend) {
      return (
        <SmsSendShort
          handleSms={toggleSmsButton}
          contactId={id}
          number={number}
        />
      );
    }
  }
  //have to try animation here below.
  return (
    <KeyboardAvoidingView>
      <Animated.View
        style={[styles.footer, showSmsSend ? styles.noBorder : {}]}>
        <EachMessageFooter handleSms={toggleSmsButton} contactId={id} />
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default EachConversationFooter;
const styles = StyleSheet.create({
  footer: {
    minHeight: 84,
    borderTopColor: colors.gray8,
    borderTopWidth: 1,
  },
  noBorder: {borderTopWidth: 0},
});
