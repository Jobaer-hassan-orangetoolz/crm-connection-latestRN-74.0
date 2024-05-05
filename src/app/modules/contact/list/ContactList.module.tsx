import {ActivityIndicator, View, VirtualizedList} from 'react-native';
import React, {useMemo} from 'react';
import ContactItem from '../../../components/app/ContactItem.app.component';
import {contactFormatter} from '../../../services/formatter/contact.formatter';
import {
  customPadding,
  customMargin,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import EmptyContent from '../../../components/core/EmptyContent.core.component';
import {messages} from '../../../assets/js/messages.message';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import {contactIndex} from '../../../services/models/Contact.modal';
interface contactList {
  list: any[];
  refreshing: boolean;
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  onRefresh: () => void;
}
const ContactList: React.FC<contactList> = ({
  isLoading,
  list,
  loadMore,
  onRefresh,
  refreshing,
  hasMore,
}) => {
  const renderItem = ({item, index}: {item: any; index: number}) => {
    contactIndex[item.id] = index;
    return (
      <ContactItem
        item={contactFormatter(item)}
        index={index}
        style={{...customMargin(0, 0, 2)}}
      />
    );
  };
  const memoizedValue = useMemo(() => renderItem, []);
  return (
    <VirtualizedList
      data={list}
      refreshing={refreshing}
      keyboardShouldPersistTaps="always"
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={
        list?.length > 0 ? {...customPadding(8)} : globalStyles.emptyFlexBox
      }
      getItemCount={() => list?.length}
      getItem={(data, index) => data[index]}
      initialNumToRender={12}
      renderItem={memoizedValue}
      onEndReachedThreshold={0.25}
      ListFooterComponent={
        hasMore && (
          <View style={{height: rs(30)}}>
            <ActivityIndicator color={colors.primary} />
          </View>
        )
      }
      ListEmptyComponent={
        <EmptyContent forLoading={isLoading} text={messages.noContactFound} />
      }
      onEndReached={loadMore}
    />
  );
};

export default ContactList;
