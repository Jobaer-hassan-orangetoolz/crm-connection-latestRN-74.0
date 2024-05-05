import {View, ActivityIndicator, FlatList} from 'react-native';
import React, {useMemo} from 'react';
import {colors} from '../../../assets/styles/colors.style.asset';
import {globalStyles} from '../../../assets/styles/global.style.asset';
import EmptyContent from '../../../components/core/EmptyContent.core.component';
import {messages} from '../../../assets/js/messages.message';
import CampaignContactHeader from './CampaignContactHeader';
import Container from '../../../layouts/Container.layout';
import {contactFormatter} from '../../../services/formatter/contact.formatter';
import useAddContactCampaign from '../hook/useAddContactCampaign.hook';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import ContactAddRenderItem from '../component/ContactAddRenderItem.campaign';

const AddContactToCampaign: React.FC<{
  route: {params: {campaignId?: number; from?: boolean}};
}> = ({route: {params: {campaignId, from = false} = {}}}) => {
  const {
    list,
    hasMore,
    isLoading,
    search,
    handleDebounce,
    refreshing,
    loadMore,
    onRefresh,
    clearSearch,
    contactIds,
    handleSave,
  } = useAddContactCampaign(campaignId, from);
  const renderItem = ({item}: {item: any; index: number}) => {
    return (
      <ContactAddRenderItem
        item={contactFormatter(item)}
        contactIds={contactIds}
        isCheck={contactIds.current.includes(item.id) ? true : false}
      />
    );
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedRender = useMemo(() => renderItem, []);
  return (
    <Container>
      <FlatList
        data={list}
        renderItem={memoizedRender}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        initialNumToRender={12}
        ListHeaderComponent={
          <CampaignContactHeader
            search={search}
            clearSearch={clearSearch}
            list={false}
            rightTitle={from && 'Next'}
            handleDebounce={handleDebounce}
            handleSubmit={handleSave}
          />
        }
        contentContainerStyle={
          list?.length > 0 ? {} : globalStyles.activityCenter
        }
        onEndReachedThreshold={0.25}
        ListFooterComponent={
          hasMore && (
            <View style={[{height: rs(40)}, globalStyles.activityCenter]}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )
        }
        ListEmptyComponent={
          <EmptyContent forLoading={isLoading} text={messages.noContactFound} />
        }
        onEndReached={loadMore}
      />
    </Container>
  );
};

export default AddContactToCampaign;
