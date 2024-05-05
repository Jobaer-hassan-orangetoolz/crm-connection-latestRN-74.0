import {StyleSheet, View} from 'react-native';
import React from 'react';
import {customPadding} from '../../../assets/styles/global.style.asset';
import InboxIcon from '../../../assets/icons/Inbox.icon.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {placeholders} from '../../../assets/js/placeholders.message';
import EmailIcon from '../../../assets/icons/Email.icon.asset';
import CustomButtonWithIcon from '../../../components/core/button/CustomButtonWithIcon.core.component';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {
  getHexaOpacityColorCode,
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import {titles} from '../../../assets/js/titles.message';
import {messages} from '../../../assets/js/messages.message';
import {contactDetails} from '../../../services/models/InboxThread.model';
const EachMessageFooter: React.FC<any> = ({handleSms, contactId}: any) => {
  const navigation = useCustomNavigation<any>();
  const handleMessage = () => {
    if (isEmpty(contactDetails?.value?.number)) {
      return showAlertWithOneAction({
        title: titles.wrongTry,
        body: messages.noContact,
      });
    }
    handleSms();
  };
  const handleEmail = () => {
    if (isEmpty(contactDetails?.value?.email)) {
      return showAlertWithOneAction({
        title: titles.wrongTry,
        body: messages.noEmail,
      });
    }
    navigation.navigate(screens.newEmail, {
      contactId: contactId,
      email: contactDetails?.value?.email,
    });
  };
  return (
    <View style={styles.container}>
      <CustomButtonWithIcon
        icon={<InboxIcon fill={colors.gray4} />}
        text={placeholders.writeSms}
        style={styles.smsButton}
        textStyle={{color: colors.gray4}}
        onPress={handleMessage}
      />
      <CustomButtonWithIcon
        icon={<EmailIcon fill={colors.primary} />}
        text={placeholders.email}
        style={styles.emailButton}
        textStyle={{color: colors.primary}}
        onPress={handleEmail}
      />
    </View>
  );
};
export default EachMessageFooter;
const styles = StyleSheet.create({
  container: {
    ...customPadding(12, 16, 12, 16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: rs(8),
    borderColor: colors.gray8,
    borderTopWidth: 1,
  },
  smsButton: {
    backgroundColor: colors.gray9,
    borderWidth: 1,
    borderColor: colors.gray8,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  emailButton: {
    backgroundColor: getHexaOpacityColorCode(colors.primary, 0.1),
    borderWidth: 1,
    borderColor: colors.gray8,
  },
});
