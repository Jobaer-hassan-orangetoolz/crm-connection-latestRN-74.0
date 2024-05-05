import React from 'react';
import Container from '../../layouts/Container.layout';
import IconWithTextHeader from '../../components/core/headers/IconWithTextHeader.app.component';
import {titles} from '../../assets/js/titles.message';
import {callHistoryStyles as styles} from './styles/callHistory.style';
import EachCallItem from './EachCallItem.module';
import useCallHistory from './hook/useCallHistory.hook';
import {callHistoryFormatter} from '../../services/formatter/callHistory.formatter';
import {ActivityIndicator, FlatList, View} from 'react-native';
import EmptyContent from '../../components/core/EmptyContent.core.component';
import {messages} from '../../assets/js/messages.message';
import {globalStyles} from '../../assets/styles/global.style.asset';
import {colors} from '../../assets/styles/colors.style.asset';
import rs from '../../assets/styles/responsiveSize.style.asset';

const CallHistory: React.FC = () => {
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return <EachCallItem item={callHistoryFormatter(item)} index={index} />;
  };
  const {list, refreshing, isLoading, onRefresh, fetchMore, gettingMore} =
    useCallHistory();
  return (
    <Container showHeader={true}>
      <IconWithTextHeader text={titles.callHistory} style={styles.header} />
      <FlatList
        data={list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={[
          list.length > 0 || !isLoading
            ? {...styles.flatlistContainer, ...globalStyles.emptyFlexBox}
            : globalStyles.activityCenter,
        ]}
        initialNumToRender={11}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={
          <EmptyContent forLoading={isLoading} text={messages.noCallHistory} />
        }
        ListFooterComponent={
          gettingMore && (
            <View style={{height: rs(30)}}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )
        }
      />
    </Container>
  );
};
export default CallHistory;
