import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import Container from '../../layouts/Container.layout';
import {styles} from './styles/messageList.style';
import useMessageListHook from './hooks/useMessageList.hook';
import {titles} from '../../assets/js/titles.message';
import {inboxTaskTabOptions} from '../../assets/js/dropdown.data';
import Badge from '../../components/app/Badge.app.component';
import {storeInboxTabValue} from '../../states/features/inbox/inbox.slice';
import HeaderSearchInput from '../../components/core/input/HeaderSearchInput.core.component';
import EmptyContent from '../../components/core/EmptyContent.core.component';
import {
  customPadding,
  globalStyles,
} from '../../assets/styles/global.style.asset';
import RightLeftActionHeader from '../../components/core/headers/RightLeftActionHeader.core.component';
import rs from '../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import {inboxIdObj} from '../../services/models/InboxThread.model';
import EachThread from './components/EachThread.app.component';

const InboxIndex = () => {
  const {
    handleChangeText,
    list,
    loadMore,
    refreshing,
    onRefresh,
    tab,
    dispatch,
    ref: {searchRef},
    isLoading,
    setIsShowSearch,
    isShowSearch,
    gettingMore,
  } = useMessageListHook();

  const renderItems = ({item, index}: any) => {
    inboxIdObj[item?.contactInfo.id] = index;
    return <EachThread index={index} item={item} />;
  };
  return (
    <Container>
      {isShowSearch ? (
        <HeaderSearchInput
          onChange={text => handleChangeText(text)}
          cancelHandler={() => setIsShowSearch(false)}
          defaultValue={searchRef.current}
        />
      ) : (
        <RightLeftActionHeader
          title={titles.inbox}
          rightHandlerDisable={false}
          rightHandler={() => setIsShowSearch(true)}
          isAnimating={false}
          leftIcon={null}
        />
      )}
      <View style={styles.actionTab}>
        {inboxTaskTabOptions.map((value, optionsIndex) => {
          return (
            <Badge
              text={value.name}
              onPress={() =>
                !isLoading && tab !== value.value
                  ? dispatch(storeInboxTabValue(value.value))
                  : {}
              }
              key={optionsIndex}
              classes={tab === value.value ? 'primary' : 'secondary'}
            />
          );
        })}
      </View>
      <View style={styles.bodyWrapper}>
        <FlatList
          data={list}
          renderItem={renderItems}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
          contentContainerStyle={
            isLoading || list.length === 0 ? globalStyles.centerView : {}
          }
          keyExtractor={(_, index) => index.toString() + _.id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            isLoading ? (
              <EmptyContent forLoading={true} />
            ) : (
              <EmptyContent text={'List is Empty'} />
            )
          }
          ListFooterComponent={
            gettingMore && (
              <View style={{height: rs(30), ...customPadding(20, 0, 20, 0)}}>
                <ActivityIndicator color={colors.primary} />
              </View>
            )
          }
        />
      </View>
    </Container>
  );
};
export default InboxIndex;
