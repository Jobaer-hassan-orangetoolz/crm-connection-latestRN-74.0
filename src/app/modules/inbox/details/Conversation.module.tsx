/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import inboxThreadModel, {
  contactDetails,
} from '../../../services/models/InboxThread.model';
import {
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {messages} from '../../../assets/js/messages.message';
import ImagePreview from '../../../components/core/ImagePreview.core.component';
import {
  formatPhoneNumber,
  getAvatarText,
  getHumanReadableTime,
  getTimeFromMS,
  htmlEntityReplace,
  isEmpty,
  isNumber,
} from '../../../utilities/helper.utility';
import DeleteIcon from '../../../assets/icons/Delete.icon.asset';
import NotesIcon from '../../../assets/icons/Notes.icon.asset';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import {placeholders} from '../../../assets/js/placeholders.message';
import {customUseSelector} from '../../../packages/redux.package';
import {userStates} from '../../../states/allSelector.state';
import {virtualNumberObject} from '../../../services/models/InboxThread.model';
const findVn = (userVNs: any, id: number) => {
  if (
    typeof virtualNumberObject?.id === 'string' &&
    !isEmpty(virtualNumberObject?.id)
  ) {
    return virtualNumberObject?.id;
  }
  const item = userVNs.find((each: any) => {
    return each.id === id;
  });
  if (typeof item === 'object') {
    virtualNumberObject[id] = item.virtualNumber;
    return item.virtualNumber;
  } else {
    return 0;
  }
};
const TypeSms = ({inOut, item, number, contactId, name}: any) => {
  const navigation = useCustomNavigation<any>();
  const handleMsgDetails = () => {
    navigation.navigate(screens.eachMessageDetails as never, {
      type: 'sms',
      from: item.from,
      to: number,
      message: item.message,
      date: item.timelineCreatedAt,
      contactId: contactId,
      name: name,
      inOut: inOut,
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onPress={() => {
        handleMsgDetails();
      }}
      style={
        inOut === inboxThreadModel.inOutType.incoming
          ? styles.smsBoxIn
          : styles.smsBoxOut
      }>
      <Text
        style={[
          typographies.bodyMedium,
          inOut === inboxThreadModel.inOutType.incoming
            ? {color: colors.white}
            : {},
        ]}
        numberOfLines={5}>
        {htmlEntityReplace(item.message)}
      </Text>
    </TouchableOpacity>
  );
};
const TypeMMS = ({inOut, message, url = ''}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      style={[
        inOut === inboxThreadModel.inOutType.incoming
          ? styles.smsBoxIn
          : styles.smsBoxOut,
        styles.mms,
      ]}>
      <Text
        style={[
          typographies.bodyMedium,
          inOut === inboxThreadModel.inOutType.incoming
            ? {color: colors.white}
            : {},
        ]}>
        {message}
      </Text>
      <View style={styles.mmsImage}>
        <ImagePreview
          source={{
            uri: url,
          }}
          styles={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};
const TypeEmail = ({inOut, item, email, name, contactId}: any) => {
  const _subject = htmlEntityReplace(item?.subject);
  const _message = htmlEntityReplace(item?.message);
  const navigation = useCustomNavigation<any>();
  const gotoDetails = () => {
    navigation.navigate(screens.eachMessageDetails, {
      type: 'email',
      from: item.from,
      to: contactDetails?.value?.email,
      message: item.message,
      date: item.timelineCreatedAt,
      attachment: item?.attachment,
      name: name,
      contactId: contactId,
      inOut: inOut,
    });
  };
  return (
    <TouchableOpacity
      style={styles.emailWrp}
      activeOpacity={0.3}
      onPress={() => {
        gotoDetails();
      }}>
      <View
        style={
          inOut === inboxThreadModel.inOutType.incoming
            ? styles.emailHeaderIn
            : styles.emailHeaderOut
        }>
        <Text
          style={[typographies.bodyMediumBold, {color: colors.white}]}
          numberOfLines={2}>
          {_subject}
        </Text>
      </View>
      <View style={styles.emailBody}>
        <Text style={[typographies.bodyMedium]} numberOfLines={5}>
          {htmlEntityReplace(_message)}
        </Text>
        {!isEmpty(item?.attachment) && (
          <Text style={[typographies.bodySmallBold]} numberOfLines={5}>
            {placeholders.haveAttachment}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
const TypeCall = ({inOut, contactNumber, fromVN, userVNs}: any) => {
  return (
    <View
      style={
        inOut === inboxThreadModel.inOutType.incoming
          ? styles.callWrpIn
          : styles.callWrpOut
      }>
      <Text
        style={[
          typographies.bodyMedium,
          inOut === inboxThreadModel.inOutType.incoming
            ? {color: colors.white}
            : {},
        ]}>
        You have an
        {inOut === inboxThreadModel.inOutType.incoming
          ? ' inbound '
          : ' outbound '}
        call to{' '}
        {inOut === inboxThreadModel.inOutType.incoming
          ? findVn(userVNs, fromVN)
          : formatPhoneNumber(contactNumber)}
      </Text>
    </View>
  );
};
const TypeNote = ({inOut, message}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      style={[
        inOut === inboxThreadModel.inOutType.incoming
          ? styles.smsBoxIn
          : styles.smsBoxOut,
        styles.mms,
      ]}>
      <NotesIcon
        height={20}
        width={20}
        fill={
          inOut === inboxThreadModel.inOutType.incoming
            ? colors.white
            : colors.gray5
        }
      />
      <Text
        style={[
          typographies.bodyMedium,
          inOut === inboxThreadModel.inOutType.incoming
            ? {color: colors.white}
            : {},
        ]}>
        {message}
      </Text>
    </TouchableOpacity>
  );
};
const TypeDelete = ({inOut}: any) => {
  return (
    <View
      style={
        inOut === inboxThreadModel.inOutType.incoming
          ? styles.deleteWrpIn
          : styles.deleteWrpOut
      }>
      <DeleteIcon
        fill={
          inOut === inboxThreadModel.inOutType.incoming
            ? colors.white
            : colors.gray0
        }
        height={20}
        width={20}
      />
      <Text
        style={[
          typographies.bodyMedium,
          inOut === inboxThreadModel.inOutType.incoming
            ? {color: colors.white}
            : {},
        ]}>
        {messages.deletedConversation}
      </Text>
    </View>
  );
};

const Conversation = ({
  item,
  name,
  tz,
  contactNumber, //this is the contact number of the each inbox thread
  email = '',
  contactId,
}: any) => {
  const {userVNs} = customUseSelector(userStates);
  const renderBody = () => {
    if (item.status === inboxThreadModel.status.deleted) {
      return <TypeDelete inOut={item.inOut} />;
    }
    if (item.contentType === inboxThreadModel.messageType.sms) {
      return (
        <TypeSms
          inOut={item.inOut}
          item={item}
          number={contactNumber}
          contactId={contactId}
          name={name}
        />
      );
    }
    if (item.contentType === inboxThreadModel.messageType.mms) {
      return <TypeMMS inOut={item.inOut} message={item.message} />;
    }
    if (item.contentType === inboxThreadModel.messageType.email) {
      return (
        <TypeEmail
          inOut={item.inOut}
          message={item.message}
          item={item}
          email={email}
          name={name}
          contactId={contactId}
        />
      );
    }
    if (item.contentType === inboxThreadModel.messageType.call) {
      return (
        <TypeCall
          inOut={item.inOut}
          contactNumber={contactNumber}
          fromVN={item?.virtualNumberId}
          userVNs={userVNs}
        />
      );
    }
    if (item.contentType === inboxThreadModel.messageType.note) {
      return <TypeNote inOut={item.inOut} message={item.message} />;
    }
  };
  return (
    <View
      style={[
        styles.width,
        item.inOut === inboxThreadModel.inOutType.incoming
          ? styles.container
          : styles.containerRight,
      ]}>
      {item.inOut === inboxThreadModel.inOutType.incoming && (
        <View style={styles.avatar}>
          <Text style={[typographies.bodyXSBold, {color: colors.gray4}]}>
            {isNumber(name) ? '#' : getAvatarText(name)}
          </Text>
        </View>
      )}
      <View style={styles.body}>
        <View
          style={[
            styles.senderWrp,
            item.inOut === inboxThreadModel.inOutType.incoming
              ? {}
              : styles.containerRight,
          ]}>
          <Text style={typographies.bodyXSBold}>
            {formatPhoneNumber(item.from)}
          </Text>
          <View style={[globalStyles.dot4, {backgroundColor: colors.gray4}]} />
          <Text style={[typographies.bodyXS, {color: colors.gray4}]}>
            {getTimeFromMS(item.timelineCreatedAt)}
          </Text>
        </View>
        {renderBody()}
        {item.inOut === inboxThreadModel.inOutType.outgoing && (
          <View style={[styles.footerWrp, styles.containerRight]}>
            {item.status === inboxThreadModel.status.fail && (
              <Text style={[typographies.bodyXS, {color: colors.error1}]}>
                {messages.failed}
              </Text>
            )}
            {item.status === inboxThreadModel.status.success && (
              <Text style={[typographies.bodyXS]}>{messages.sent}</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
export default Conversation;

const styles = StyleSheet.create({
  width: {width: '75%', gap: 8},
  container: {flex: 1, flexDirection: 'row'},
  containerRight: {alignSelf: 'flex-end'},
  avatar: {
    height: 34,
    width: 34,
    borderRadius: 50,
    backgroundColor: colors.gray9,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray8,
    alignSelf: 'flex-end',
  },
  body: {gap: 8 /* flexGrow: 1 */},
  senderWrp: {flexDirection: 'row', gap: 4, alignItems: 'center'},
  /* content type design */
  smsBoxIn: {
    ...customPadding(10, 16, 10, 16),
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  smsBoxOut: {
    ...customPadding(10, 16, 10, 16),
    backgroundColor: colors.gray9,
    borderRadius: 12,
  },
  footerWrp: {flexDirection: 'row', gap: 16, alignItems: 'center'},
  mms: {gap: 12},
  mmsImage: {width: 100, height: 100},
  image: {width: '100%', height: '100%'},
  emailWrp: {borderRadius: 12, overflow: 'hidden'},
  emailHeaderIn: {
    ...customPadding(8, 12, 8, 12),
    backgroundColor: colors.primary,
  },
  emailHeaderOut: {
    ...customPadding(8, 12, 8, 12),
    backgroundColor: colors.gray4,
  },
  emailBody: {
    ...customPadding(8, 12, 8, 12),
    backgroundColor: colors.gray9,
    gap: 6,
  },
  callWrpIn: {
    ...customPadding(10, 16, 10, 16),
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.primary,
  },
  callWrpOut: {
    ...customPadding(10, 16, 10, 16),
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.gray9,
  },
  deleteWrpIn: {
    ...customPadding(10, 16, 10, 16),
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    gap: 8,
    opacity: 0.5,
  },
  deleteWrpOut: {
    ...customPadding(10, 16, 10, 16),
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.gray9,
    flexDirection: 'row',
    gap: 8,
    opacity: 0.5,
  },
});
