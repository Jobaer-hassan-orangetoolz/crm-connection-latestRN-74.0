/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {customPadding} from '../../../assets/styles/global.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import DialIcon from '../../../assets/icons/Dial.icon.asset';
import FavIcon from '../../../assets/icons/Favorite.icon.asset';
import {
  formatMessageTimestamp,
  formatPhoneNumber,
  getAvatarText,
  htmlEntityReplace,
  isEmpty,
  reduceInboxMailMessage,
} from '../../../utilities/helper.utility';
import MessageSmallIcon from '../../../assets/icons/MailSmall.icon';
import MailSmallIcon from '../../../assets/icons/EmailSmall.icon.asset';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import {inboxItemTypes} from '../../../services/formatter/inbox.formatter';
import EachMessageAction from '../bottomSheet/EachMessageAction.bottomSheet';
import inboxThreadModel from '../../../services/models/InboxThread.model';
import {customUseDispatch} from '../../../packages/redux.package';
import {readUnreadMessage} from '../../../states/features/inbox/inbox.slice';
interface EachThreadProps {
  style?: object;
  item?: inboxItemTypes;
  index?: number;
}

const EachThread: React.FC<EachThreadProps> = ({item, style, index}) => {
  const navigation = useCustomNavigation<any>();
  const {
    messageType = 1,
    message,
    subject,
    contactInfo: {firstName, lastName, number, isFavourite, id, email} = {
      firstName: '',
      lastName: '',
      number: '',
      isFavourite: '',
      id: -0,
      email: '',
    },
    lastCommunicatedAt,
    isRead: seen = false,
  } = item || {};
  const handlePress = () => {
    global.showBottomSheet({
      flag: true,
      component: EachMessageAction,
      componentProps: {
        index: index,
        contact_id: id,
        isRead: item?.isRead,
        isFavourite: item?.contactInfo?.isFavourite,
        isArchived: item?.contactInfo?.isArchived,
      },
    });
  };

  const dispatch = customUseDispatch();
  const renderIcon = (_value: number | string) => {
    const value: number = parseInt(`${_value}`, 10);
    return (
      <View style={styles.smallIcon}>
        {(value === inboxThreadModel.messageType.sms ||
          value === inboxThreadModel.messageType.mms) && (
          <MessageSmallIcon fill={seen ? colors.gray4 : colors.primary} />
        )}
        {value === inboxThreadModel.messageType.email && (
          <MailSmallIcon fill={seen ? colors.gray4 : colors.primary} />
        )}
        {value === inboxThreadModel.messageType.call && (
          <DialIcon fill={seen ? colors.gray4 : colors.primary} />
        )}
      </View>
    );
  };
  const press = () => {
    navigation.navigate(screens.eachConversation as any, {
      id: id,
      index: index,
      name: getName(),
      number: number,
      isRead: item?.isRead,
      isFavourite: item?.contactInfo?.isFavourite,
      isArchived: item?.contactInfo?.isArchived,
      type: item?.messageType,
    });
    if (!seen) {
      dispatch(
        readUnreadMessage({
          status: true,
          contactId: id,
          index: index,
        }),
      );
    }
  };
  const getName = (): string | undefined => {
    let title: string | null | undefined = '';
    if (!isEmpty(firstName) && !isEmpty(lastName)) {
      title = firstName + ' ' + lastName;
    } else if (!isEmpty(firstName)) {
      title = firstName;
    } else if (!isEmpty(lastName)) {
      title = lastName;
    } else {
      if (messageType === inboxThreadModel.messageType.email) {
        title = email;
      } else {
        title = number;
      }
    }
    return title?.trim();
  };
  const getMessage = () => {
    if (messageType === inboxThreadModel.messageType.email) {
      return `Subject: ${reduceInboxMailMessage(
        htmlEntityReplace(subject),
        32,
      )}`;
    }
    if (messageType === inboxThreadModel.messageType.call) {
      return 'You have a call';
    }
    return htmlEntityReplace(message);
  };
  const styles = messageStyles(seen);
  return (
    <Pressable
      onLongPress={handlePress}
      onPress={press}
      style={[styles.wrapper, style]}>
      <View style={{position: 'relative'}}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: colors.gray9,
              borderColor: colors.gray8,
            },
          ]}>
          <Text
            style={[
              typographies.bodyMediumBold,
              {
                color: colors.gray4,
                alignSelf: 'center',
              },
            ]}>
            {getAvatarText(
              firstName,
              lastName,
              item?.contactInfo?.email,
              number,
            )}
          </Text>
        </View>
        {renderIcon(messageType)}
      </View>
      <View style={styles.message}>
        <Text
          style={[
            seen ? typographies.bodyMedium : typographies.bodyMediumBold,
            styles.nameText,
          ]}
          numberOfLines={1}>
          {formatPhoneNumber(getName() || '')}
        </Text>
        <Text
          style={[
            seen ? typographies.bodySmall : typographies.bodySmallBold,
            styles.messageText,
          ]}
          numberOfLines={1}>
          {getMessage()}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          gap: 6,
        }}>
        <Text style={[typographies.bodyXS, styles.time]}>
          {formatMessageTimestamp(lastCommunicatedAt)}
        </Text>
        {isFavourite ? <FavIcon /> : <></>}
      </View>
    </Pressable>
  );
};
export default EachThread;

const messageStyles = (seen: boolean | number) =>
  StyleSheet.create({
    wrapper: {
      ...customPadding(15, 20, 15, 20),
      flexDirection: 'row',
      gap: 12,
      backgroundColor: seen ? colors.white : colors.gray9,
    },
    avatar: {
      height: rs(52),
      width: rs(52),
      borderRadius: 500,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    smallIcon: {
      position: 'absolute',
      alignSelf: 'flex-end',
      flexDirection: 'row',
      bottom: 0,
    },
    message: {
      flex: 1,
    },
    nameText: {
      color: colors.gray0,
    },
    messageText: {
      color: seen ? colors.gray4 : colors.primary,
    },
    time: {
      color: seen ? colors.gray6 : colors.gray0,
      fontSize: 14,
    },
  });
