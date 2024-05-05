import {View, FlatList, ActivityIndicator} from 'react-native';
import React, {useMemo} from 'react';
import Container from '../../../layouts/Container.layout';
import {
  customMargin,
  globalStyles,
} from '../../../assets/styles/global.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';
import useCampaignContact from '../hook/useCampaignContact.hook';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {messages} from '../../../assets/js/messages.message';
import EmptyContent from '../../../components/core/EmptyContent.core.component';
import ContactItem from '../../../components/app/ContactItem.app.component';
import {
  contactFormatter,
  contactItemInterface,
} from '../../../services/formatter/contact.formatter';
import {useCustomNavigation} from '../../../packages/navigation.package';
import CampaignContactHeader from './CampaignContactHeader';
import {screens} from '../../../routes/routeName.route';
const CampaignContactList: React.FC<{route: {params: {id: number}}}> = ({
  route: {
    params: {id = -1},
  },
}) => {
  const navigation = useCustomNavigation<any>();
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
  } = useCampaignContact(id);
  const renderItem = ({item}: {item: contactItemInterface; index: number}) => {
    return (
      <ContactItem
        item={contactFormatter(item)}
        campaign={true}
        style={{...customMargin(0, 0, 2)}}
      />
    );
  };
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
        initialNumToRender={10}
        ListHeaderComponent={
          <CampaignContactHeader
            search={search}
            clearSearch={clearSearch}
            handleDebounce={handleDebounce}
            handleSubmit={() =>
              navigation.navigate(screens.addContactToCampaign as never, {
                campaignId: id,
              })
            }
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
          isLoading ? (
            <View style={globalStyles.activityCenter}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <EmptyContent text={messages.noContactFound} />
          )
        }
        onEndReached={loadMore}
      />
    </Container>
  );
};

export default CampaignContactList;
