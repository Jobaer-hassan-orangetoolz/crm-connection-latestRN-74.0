import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import useConversationEffect from '../../../../inbox/hooks/useConversationEffect.hook';
import {conversationFormatter} from '../../../../../services/formatter/inbox.formatter';
import InboxThreadModel from '../../../../../services/models/InboxThread.model';
import {colors} from '../../../../../assets/styles/colors.style.asset';
import {
  customPadding,
  globalStyles,
} from '../../../../../assets/styles/global.style.asset';
import {typographies} from '../../../../../assets/styles/typographies.style.asset';
import {
  formatPhoneNumber,
  getTimeFromMS,
  htmlEntityReplace,
  isEmpty,
} from '../../../../../utilities/helper.utility';
import ImagePreview from '../../../../../components/core/ImagePreview.core.component';
import {placeholders} from '../../../../../assets/js/placeholders.message';
import {messages} from '../../../../../assets/js/messages.message';
import rs from '../../../../../assets/styles/responsiveSize.style.asset';
const TypeSms = ({inOut, item}: any) => {
  return (
    <TouchableOpacity
      disabled={true}
      activeOpacity={0.3}
      style={
        inOut === InboxThreadModel.inOutType.incoming
          ? styles.smsBoxIn
          : styles.smsBoxOut
      }>
      <Text
        style={[
          typographies.bodyMedium,
          inOut === InboxThreadModel.inOutType.incoming
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
      disabled={true}
      style={[
        inOut === InboxThreadModel.inOutType.incoming
          ? styles.smsBoxIn
          : styles.smsBoxOut,
        styles.mms,
      ]}>
      <Text
        style={[
          typographies.bodyMedium,
          inOut === InboxThreadModel.inOutType.incoming
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
const TypeEmail = ({inOut, item}: any) => {
  const _subject = htmlEntityReplace(item?.subject);
  const _message = htmlEntityReplace(item?.message);
  return (
    <TouchableOpacity
      style={styles.emailWrp}
      activeOpacity={0.3}
      disabled={true}>
      <View
        style={
          inOut === InboxThreadModel.inOutType.incoming
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
const TypeCall = ({inOut}: any) => {
  return (
    <View
      style={
        inOut === InboxThreadModel.inOutType.incoming
          ? styles.callWrpIn
          : styles.callWrpOut
      }>
      <Text
        style={[
          typographies.bodyMedium,
          inOut === InboxThreadModel.inOutType.incoming
            ? {color: colors.white}
            : {},
        ]}>
        You have an call
      </Text>
    </View>
  );
};
const Conversation = (item: any) => {
  const renderBody = () => {
    if (item?.item.contentType === InboxThreadModel.messageType.sms) {
      return <TypeSms inOut={item?.item.inOut} item={item?.item} />;
    }
    if (item?.item.contentType === InboxThreadModel.messageType.mms) {
      return <TypeMMS inOut={item?.item.inOut} message={item?.item.message} />;
    }
    if (item?.item.contentType === InboxThreadModel.messageType.email) {
      return <TypeEmail inOut={item?.item.inOut} item={item?.item} />;
    }
    if (item?.item.contentType === InboxThreadModel.messageType.call) {
      return <TypeCall inOut={item?.item.inOut} />;
    }
  };
  return (
    <View
      style={[
        styles.width,
        item?.item.inOut === InboxThreadModel.inOutType.incoming
          ? styles.container
          : styles.containerRight,
      ]}>
      {/* {item.inOut === InboxThreadModel.inOutType.incoming && (
        <View style={styles.avatar}>
          <Text style={[typographies.bodyXSBold, {color: colors.gray4}]}>
            {isNumber(name) ? '#' : getAvatarText(name)}
          </Text>
        </View>
      )} */}
      <View style={styles.body}>
        <View
          style={[
            styles.senderWrp,
            item?.item.inOut === InboxThreadModel.inOutType.incoming
              ? {}
              : styles.containerRight,
          ]}>
          <Text style={typographies.bodyXSBold}>
            {formatPhoneNumber(item?.item.from)}
          </Text>
          <View style={[globalStyles.dot4, {backgroundColor: colors.gray4}]} />
          <Text style={[typographies.bodyXS, {color: colors.gray4}]}>
            {getTimeFromMS(item?.item.timelineCreatedAt)}
          </Text>
        </View>
        {renderBody()}
        {item?.item.inOut === InboxThreadModel.inOutType.outgoing && (
          <View style={[styles.footerWrp, styles.containerRight]}>
            {item?.item.status === InboxThreadModel.status.fail && (
              <Text style={[typographies.bodyXS, {color: colors.error1}]}>
                {messages.failed}
              </Text>
            )}
            {item?.item.status === InboxThreadModel.status.success && (
              <Text style={[typographies.bodyXS]}>{messages.sent}</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
const ContactConversations = ({id = ''}) => {
  const {list} = useConversationEffect({
    id: id,
  });
  /* Need to work */
  const renderItem = ({item, index}: any) => {
    return <Conversation item={conversationFormatter(item)} key={index} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        inverted={true}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={(_, _index) => _index.toString()}
        contentContainerStyle={{
          ...customPadding(10, 0, 10, 0),
          gap: rs(10),
        }}
      />
    </View>
  );
};
export default ContactConversations;
const styles = StyleSheet.create({
  container: {flex: 1, ...customPadding(0, 20, 0, 16)},
  width: {width: '75%', gap: 8},
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
    backgroundColor: colors.gray7,
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
    backgroundColor: colors.gray7,
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
