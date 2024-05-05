/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Container from '../../../layouts/Container.layout';
import IconWithTextHeader from '../../../components/core/headers/IconWithTextHeader.app.component';
import {titles} from '../../../assets/js/titles.message';
import {colors} from '../../../assets/styles/colors.style.asset';
import {customPadding} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {buttons} from '../../../assets/js/buttons.message';
import {
  formatDate,
  formatPhoneNumber,
  htmlEntityReplace,
  isEmailValid,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {WebCustomView} from '../../../packages/webview.package';
import {ScrollView} from 'react-native-gesture-handler';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import {messages} from '../../../assets/js/messages.message';
import CallBottomSheet from '../../call/bottomSheet/Call.bottomSheet';
import {customUseSelector} from '../../../packages/redux.package';
import {userStates} from '../../../states/allSelector.state';
import InboxThreadModel, {
  contactDetails as details,
} from '../../../services/models/InboxThread.model';
interface EachMessageDetailsType {
  from: string;
  to: string | number;
  date: string;
  message?: string;
  subject?: string;
  type: string | number;
  contactId: number;
  attachment?: any;
  name?: string;
  inOut?: number;
}
interface Route {
  route: {params: EachMessageDetailsType};
}
const EachMessageDetails: React.FC<Route> = ({
  route: {
    params: {
      type = 'sms',
      to = '',
      from = '',
      date = '',
      message = '',
      subject = '',
      contactId,
      attachment,
      name,
      inOut,
    },
  },
}) => {
  const navigation = useCustomNavigation<any>();
  const {userVNs} = customUseSelector(userStates);
  const contactDetails = details?.value;
  const selectToNumber = () => {
    if (type === 'email') {
      return {virtualNumber: contactDetails.lastEmail};
    } else if (type === 'sms') {
      return userVNs.find(
        (item: any) => item.id === contactDetails?.lastNumber,
      );
    }
  };
  const htmlSource =
    type === 'email'
      ? `<meta name="viewport" content="width=device-width, initial-scale=1"> ${message}`
      : '';
  const parsedData = () => {
    try {
      const parsed = JSON.parse(attachment);
      return parsed;
    } catch (error) {
      return null;
    }
  };
  const handleEmail = () => {
    if (!to || !isEmailValid(to) || !contactId) {
      return showAlertWithOneAction({
        title: titles.wrongTry,
        body: messages.noEmail,
      });
    }
    navigation.navigate(screens.newEmail, {
      contactId: contactId,
      email: to,
      from: 'messageDetails',
    });
  };
  const handleSms = () => {
    if (!contactDetails?.number || !contactId) {
      return showAlertWithOneAction({
        title: titles.wrongTry,
        body: messages.noContact,
      });
    }
    navigation.navigate(screens.fullMessage, {
      contactId: contactId,
      number: contactDetails?.number,
      message: '',
      fromNumber: {number: userVNs[0]?.virtualNumber, id: userVNs[0].id} || {},
    });
  };
  const handleCall = () => {
    if (
      !contactDetails?.number ||
      isNaN(contactDetails?.number) ||
      !contactId
    ) {
      return showAlertWithOneAction({
        title: titles.wrongTry,
        body: messages.noContact,
      });
    }
    global.showBottomSheet({
      flag: true,
      component: CallBottomSheet,
      componentProps: {
        name: name,
        contactId: contactId,
        number: contactDetails?.number,
      },
    });
  };
  return (
    <Container>
      <IconWithTextHeader text={titles.messageDetails} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.eachCard}>
            <Text style={styles.fromTxt}>{'From:'}</Text>
            <Text style={styles.emailText}>{formatPhoneNumber(from)}</Text>
          </View>
          <View style={styles.eachCard}>
            <Text style={styles.fromTxt}>{'To:'}</Text>
            <Text style={styles.emailText}>
              {inOut === InboxThreadModel.inOutType.outgoing
                ? formatPhoneNumber(to)
                : selectToNumber().virtualNumber}
            </Text>
          </View>
          <View style={styles.eachCard}>
            <Text style={styles.fromTxt}>{'Sent on:'}</Text>
            <Text style={styles.emailText}>{formatDate(date)}</Text>
          </View>
        </View>
        <View style={[styles.messageContainer]}>
          {type === 'email' && <Text style={styles.subjectTxt}>{subject}</Text>}
          {type === 'sms' && (
            <Text style={styles.messageTxt}>{htmlEntityReplace(message)}</Text>
          )}
          {type === 'email' && (
            <WebCustomView
              originWhitelist={['*']}
              source={{
                html: htmlSource,
              }}
              style={{
                flexGrow: 1,
              }}
            />
          )}
          {type === 'email' && parsedData() && (
            <Text
              style={styles.attachmentHeader}>{`${titles.attachments} :`}</Text>
          )}
          {type === 'email' &&
            parsedData() &&
            parsedData().map((item: any) => (
              <TouchableOpacity
                style={{marginBottom: 5}}
                onPress={() => {
                  navigation.navigate(screens.webView, {
                    title: item.file_name,
                    url: item.file_url,
                  });
                }}>
                <Text style={styles.attachmentText}>{item.file_name}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEmail}>
            <Text style={styles.btnText}>{buttons.replyAsEmail}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSms}>
            <Text style={styles.btnText}>{buttons.replyAsSms}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCall}>
            <Text style={styles.btnText}>{buttons.makeACall}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};
export default EachMessageDetails;
const styles = StyleSheet.create({
  container: {...customPadding(20, 20, 20, 20), gap: 20, flexGrow: 1},
  card: {
    backgroundColor: colors.gray9,
    borderRadius: rs(12),
    ...customPadding(12, 16, 12, 16),
  },
  eachCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    paddingVertical: 8,
  },
  fromTxt: {
    ...typographies.bodySmallBold,
    color: colors.gray4,
  },
  emailText: {
    ...typographies.bodySmallBold,
    color: colors.black,
    flexShrink: 1,
    width: '80%',
    alignSelf: 'flex-start',
    textAlign: 'right',
  },
  messageContainer: {paddingVertical: 12, flexGrow: 1},
  subjectTxt: {...typographies.bodyLargeBold},
  messageTxt: {...typographies.bodyMedium},
  btnContainer: {flexDirection: 'row', gap: 12, flexWrap: 'wrap'},
  button: {
    ...customPadding(8, 16, 8, 16),
    backgroundColor: colors.gray9,
    borderRadius: 500,
  },
  btnText: {
    ...typographies.buttonMedium,
    color: colors.black,
  },
  attachmentText: {
    ...typographies.bodyMediumBold,
    color: colors.primary,
  },
  attachmentHeader: {
    ...typographies.bodyLargeBold,
    ...customPadding(10, 0, 10, 0),
  },
});
