import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import IconWithText from '../../../../components/app/IconWithText.app.component';
import MoreIcon from '../../../../assets/icons/More.icon.asset';
import {titles} from '../../../../assets/js/titles.message';
import EmailIcon from '../../../../assets/icons/Email.icon.asset';
import InboxIcon from '../../../../assets/icons/Inbox.icon.asset';
import CallIcon from '../../../../assets/icons/Call.icon.asset';
import {
  customMargin,
  customPadding,
} from '../../../../assets/styles/global.style.asset';
import {config} from '../../../../../config';
import {typographies} from '../../../../assets/styles/typographies.style.asset';
import ContactMoreAction from '../bottomSheet/ContactMoreAction.bottomSheet';
import {contactBottomSheetStyles} from '../../styles/contactBottomSheet.styles';
import {contactInterface} from '../../../../services/formatter/contact.formatter';
import {useCustomNavigation} from '../../../../packages/navigation.package';
import {screens} from '../../../../routes/routeName.route';
import CallBottomSheet from '../../../call/bottomSheet/Call.bottomSheet';
import BlockIcon from '../../../../assets/icons/Block.icon.asset';
import {colors} from '../../../../assets/styles/colors.style.asset';
import rs from '../../../../assets/styles/responsiveSize.style.asset';

const ContactInfoComponent: React.FC<{
  item: contactInterface;
  style?: ViewStyle;
}> = ({item, style = {}}) => {
  const {
    name = '',
    dealValue = '',
    email = '',
    number = '',
    isUnsubscribe,
    isBlock,
    contactId,
    id,
  } = item || {};
  const navigation = useCustomNavigation<any>();
  const handleCall = () => {
    global.showBottomSheet({flag: false});
    global.showBottomSheet({
      flag: true,
      component: CallBottomSheet,
      componentProps: {name, number, id},
    });
  };
  const handleSMS = () => {
    global.showBottomSheet({flag: false});
    return navigation.navigate(screens.eachConversation as never, {
      id: contactId || id,
      name: name,
      type: 'sms',
      number: number,
      isRead: 1,
      email: email,
    });
  };
  const handleEmail = () => {
    global.showBottomSheet({flag: false});
    return navigation.navigate(screens.eachConversation as never, {
      id: contactId || id,
      name: name,
      type: 'email',
      number: number,
      isRead: 1,
      email: email,
    });
  };
  const handleMoreAction = () => {
    global.showBottomSheet({
      flag: true,
      component: ContactMoreAction,
      componentProps: {item},
    });
  };
  return (
    <View style={style}>
      <Text
        style={[typographies.headingLarge, {...customMargin(0, 0, 8)}]}
        numberOfLines={2}>
        {name || email || number}
      </Text>
      <Text style={[typographies.bodyMedium, {...customMargin(0, 0, 12)}]}>
        {`${titles.dealValue}: ${config.currencySymbol + dealValue}`}
      </Text>
      {isBlock || isUnsubscribe ? (
        <View
          style={{
            ...customPadding(8, 16, 8, 16),
            backgroundColor: colors.error2,
            gap: rs(8),
            flexDirection: `${'row'}`,
          }}>
          <BlockIcon fill={colors.error1} />
          <Text style={[typographies.bodySmallBold, {color: colors.error1}]}>
            {(isBlock && titles.contactBlockedMessage + ' ' + titles.blocked) ||
              (isUnsubscribe &&
                titles.contactBlockedMessage + ' ' + titles.unsubscribed)}
          </Text>
        </View>
      ) : (
        <></>
      )}
      <View style={contactBottomSheetStyles.btnCont}>
        <IconWithText
          Icon={CallIcon}
          text={titles.call}
          onPress={handleCall}
          classes={
            number && !(isBlock || isUnsubscribe) ? 'primary' : 'disabled'
          }
        />
        <IconWithText
          Icon={InboxIcon}
          text={titles.sms}
          onPress={handleSMS}
          classes={
            number && !(isBlock || isUnsubscribe) ? 'primary' : 'disabled'
          }
        />
        <IconWithText
          Icon={EmailIcon}
          text={titles.Email}
          onPress={handleEmail}
          classes={
            email && !(isBlock || isUnsubscribe) ? 'primary' : 'disabled'
          }
        />
        <IconWithText
          Icon={MoreIcon}
          text={titles.more}
          classes="border"
          onPress={handleMoreAction}
        />
      </View>
    </View>
  );
};

export default ContactInfoComponent;
