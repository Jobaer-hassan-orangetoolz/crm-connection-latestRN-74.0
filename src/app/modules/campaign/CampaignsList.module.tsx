import {View, FlatList, ActivityIndicator} from 'react-native';
import React, {useMemo} from 'react';
import {
  customMargin,
  customPadding,
  globalStyles,
} from '../../assets/styles/global.style.asset';
import EmptyContent from '../../components/core/EmptyContent.core.component';
import {messages} from '../../assets/js/messages.message';
import rs from '../../assets/styles/responsiveSize.style.asset';
import CampaignComponent from '../../components/app/Campaign.app.component';
import {colors} from '../../assets/styles/colors.style.asset';
import CampaignTopHeader from './TopHeader.campaign';
import useCampaignsList from './hook/useCampaignsList.hook';
import {campaignItemInterface} from '../../services/formatter/campaign.formatter';

const CampaignsList: React.FC = () => {
  const {
    isLoading,
    handleDebounce,
    list,
    search,
    loadMore,
    onRefresh,
    refreshing,
    clearSearch,
    hasMore,
    status,
    handleStatus,
    handleFolder,
    folder,
  } = useCampaignsList();
  const renderItem = ({
    item,
    index,
  }: {
    item: campaignItemInterface;
    index: number;
  }) => {
    return (
      <CampaignComponent
        item={item}
        index={index}
        style={{...customMargin(0, 20, 0, 20)}}
      />
    );
  };
  const memoizedValue = useMemo(() => renderItem, []);
  return (
    <FlatList
      data={list}
      refreshing={refreshing}
      keyboardShouldPersistTaps="always"
      onRefresh={onRefresh}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <CampaignTopHeader
          handleStatus={handleStatus}
          clearSearch={clearSearch}
          handleFolder={handleFolder}
          status={status}
          handleDebounce={handleDebounce}
          search={search}
          folder={folder}
        />
      }
      initialNumToRender={2}
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      keyExtractor={(_item, index) => index.toString() + _item.status}
      contentContainerStyle={
        list?.length > 0
          ? {...customPadding(0, 0, 20, 0), gap: rs(12)}
          : globalStyles.emptyFlexBox
      }
      renderItem={memoizedValue}
      onEndReachedThreshold={0.25}
      ListFooterComponent={
        hasMore && (
          <View style={[{height: rs(40)}, globalStyles.activityCenter]}>
            <ActivityIndicator color={colors.primary} />
          </View>
        )
      }
      ListEmptyComponent={
        isLoading ? (
          <View style={globalStyles.activityCenter}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <EmptyContent text={messages.noCampaignFound} />
        )
      }
      onEndReached={loadMore}
    />
  );
};

export default CampaignsList;
