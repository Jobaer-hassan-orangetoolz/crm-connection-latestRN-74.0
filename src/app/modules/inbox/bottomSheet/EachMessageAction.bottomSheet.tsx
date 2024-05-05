import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {customPadding} from '../../../assets/styles/global.style.asset';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {inboxActionOptions} from '../../../assets/js/dropdown.data';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import {customUseDispatch} from '../../../packages/redux.package';
import {
  archiveUnArchiveMessage,
  importantUnimportantMessage,
  readUnreadMessage,
} from '../../../states/features/inbox/inbox.slice';
import {inboxIdObj} from '../../../services/models/InboxThread.model';

interface actions {
  onPress: Function;
  index?: number | null;
  name?: string;
  contact_id: string | number;
  isRead: number;
  isFavourite: string;
  isArchived: number;
}

const EachMessageAction: React.FC<actions> = ({
  onPress,
  contact_id,
  isArchived,
  isFavourite,
  isRead,
}) => {
  const index = Object.hasOwn(inboxIdObj, contact_id)
    ? inboxIdObj[contact_id]
    : -1;
  const dispatch = customUseDispatch();
  const navigation = useCustomNavigation<any>();
  const handleOnPress = (value: any) => {
    if (value === 'profile') {
      navigation.navigate(screens.contactDetails as never, {
        id: contact_id,
      });
    } else if (value === 'archive') {
      dispatch(
        archiveUnArchiveMessage({
          status: true,
          contactId: contact_id,
          index: index,
        }),
      );
    } else if (value === 'inbox') {
      dispatch(
        archiveUnArchiveMessage({
          status: false,
          contactId: contact_id,
          index: index,
        }),
      );
    } else if (value === 'important') {
      dispatch(
        importantUnimportantMessage({
          status: true,
          contactId: contact_id,
          index: index,
        }),
      );
    } else if (value === 'unimportant') {
      dispatch(
        importantUnimportantMessage({
          status: false,
          contactId: contact_id,
          index: index,
        }),
      );
    } else if (value === 'unread') {
      dispatch(
        readUnreadMessage({
          status: false,
          contactId: contact_id,
          index: index,
        }),
      );
    } else if (value === 'read') {
      dispatch(
        readUnreadMessage({
          status: true,
          contactId: contact_id,
          index: index,
        }),
      );
    } else {
      onPress(value);
    }
    global.showBottomSheet({flag: false});
  };
  return (
    <View style={styles.container}>
      {inboxActionOptions.map((element, _index) => {
        if (element.value === 'archive' && isArchived) {
          return null;
        }
        if (element.value === 'inbox' && !isArchived) {
          return null;
        }
        if (element.value === 'important' && isFavourite) {
          return null;
        }
        if (element.value === 'unimportant' && !isFavourite) {
          return null;
        }
        if (element.value === 'read' && isRead) {
          return null;
        }
        if (element.value === 'unread' && !isRead) {
          return null;
        }
        return (
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => handleOnPress(element.value)}
            key={_index}
            style={styles.eachItemWrap}>
            <View>{element.icon}</View>
            <Text style={typographies.bodyMediumBold}>{element.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default EachMessageAction;
const styles = StyleSheet.create({
  container: {
    ...customPadding(20, 20, 20, 20),
    gap: 7,
  },
  eachItemWrap: {
    flexDirection: 'row',
    gap: rs(12),
    ...customPadding(10, 0, 10, 0),
    alignItems: 'center',
  },
});
