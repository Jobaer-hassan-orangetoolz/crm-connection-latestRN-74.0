/* eslint-disable @typescript-eslint/no-shadow */
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Container from '../../../layouts/Container.layout';
import IconWithTextHeader from '../../../components/core/headers/IconWithTextHeader.app.component';
import CallFilled from '../../../assets/icons/CallFilled.icon.asset';
import MoreIcon from '../../../assets/icons/More.icon.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {
  customPadding,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import Conversation from './Conversation.module';
import {conversationFormatter} from '../../../services/formatter/inbox.formatter';
import EmptyContent from '../../../components/core/EmptyContent.core.component';
import {placeholders} from '../../../assets/js/placeholders.message';
import useConversationEffect from '../hooks/useConversationEffect.hook';
import EachMessageAction from '../bottomSheet/EachMessageAction.bottomSheet';
import {customUseSelector} from '../../../packages/redux.package';
import {userTz} from '../../../states/allSelector.state';
import CallBottomSheet from '../../call/bottomSheet/Call.bottomSheet';
import {
  formatPhoneNumber,
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {titles} from '../../../assets/js/titles.message';
import {messages} from '../../../assets/js/messages.message';
import EachConversationFooter from './EachConversationFooter';
import {contactDetails} from '../../../services/models/InboxThread.model';

type params = {
  id?: number;
  index?: number;
  inboxId?: number;
  name?: string | any;
  type?: string;
  item?: any;
  number?: any;
  email?: string;
  from?: string;
  isArchived: number;
  isFavourite: string;
  isRead: number;
};

interface conversationP {
  route: {
    params?: params;
  };
}

const EachConversation: React.FC<conversationP> = ({
  route: {
    params: {
      name,
      id,
      type,
      index,
      number,
      isArchived,
      isFavourite,
      email,
      isRead,
    } = {},
  },
}) => {
  const {list, isLoading, getMore} = useConversationEffect({
    id: id,
  });
  const tz = customUseSelector(userTz);
  const _renderItem = ({item, index}: any) => {
    return (
      <Conversation
        name={name}
        item={conversationFormatter(item)}
        index={index}
        contactNumber={number}
        tz={tz}
        email={contactDetails?.value?.email}
        contactId={id}
      />
    );
  };
  const handleCall = () => {
    if (isEmpty(number)) {
      return showAlertWithOneAction({
        title: titles.wrongTry,
        body: messages.noContact,
      });
    }
    global.showBottomSheet({
      flag: true,
      component: CallBottomSheet,
      componentProps: {name: name, contactId: id, number: number},
    });
  };
  return (
    <Container>
      <IconWithTextHeader
        text={name || email || formatPhoneNumber(number)}
        rightComponent={
          <View style={styles.headerComponent}>
            <TouchableOpacity onPress={handleCall}>
              <CallFilled height={28} width={28} fill={colors.gray0} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                global.showBottomSheet({
                  flag: true,
                  component: EachMessageAction,
                  componentProps: {
                    index: index,
                    contact_id: id,
                    isArchived:
                      isArchived || contactDetails?.value?.isArchived ? 1 : 0,
                    isFavourite:
                      isFavourite || contactDetails?.value?.isFavourite,
                    isRead: isRead,
                  },
                });
              }}>
              <MoreIcon height={28} width={28} fill={colors.gray0} />
            </TouchableOpacity>
          </View>
        }
        style={styles.headerBottomBorder}
      />
      <View style={styles.body}>
        <View style={globalStyles.emptyFlexBox}>
          <FlatList
            data={list}
            style={styles.listStyle}
            renderItem={_renderItem}
            keyExtractor={(_, _index) => _index.toString()}
            contentContainerStyle={
              isLoading || list.length === 0
                ? globalStyles.emptyFlexBox
                : styles.eachMsgContainer
            }
            showsVerticalScrollIndicator={false}
            onEndReached={getMore}
            onEndReachedThreshold={0.1}
            inverted={true}
            ListEmptyComponent={
              !isLoading && list.length === 0 ? (
                <EmptyContent text={placeholders.noConversation} />
              ) : isLoading ? (
                <EmptyContent forLoading={true} />
              ) : null
            }
          />
        </View>
        <View>
          <EachConversationFooter id={id} type={type} number={number} />
        </View>
      </View>
    </Container>
  );
};
export default EachConversation;

const styles = StyleSheet.create({
  headerComponent: {
    flexDirection: 'row',
    gap: 16,
  },
  eachMsgContainer: {...customPadding(10, 16, 10, 16), gap: 24},
  listStyle: {flex: 1},
  headerBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray8,
  },
  body: {flex: 1, justifyContent: 'space-between'},
  sendActions: {flexDirection: 'row', gap: 8, ...customPadding(12, 16, 28, 16)},
});
