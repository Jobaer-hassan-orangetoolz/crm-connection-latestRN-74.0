import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Container from '../../../layouts/Container.layout';
import {stageStyles as styles} from '../styles/stage.style';
import {typographies} from '../../../assets/styles/typographies.style.asset';
import {globalStyles} from '../../../assets/styles/global.style.asset';
import StageCard from './StageCard.module';
import EmptyContent from '../../../components/core/EmptyContent.core.component';
import StageTopHeader from './StageTopHeader.module';
import useDealStageList from '../hook/useDealStageList.hook';
import {titles} from '../../../assets/js/titles.message';
import {messages} from '../../../assets/js/messages.message';
import {
  stageFormatter,
  stageItemInterface,
} from '../../../services/formatter/stage.formatter';

const StageModule: React.FC = () => {
  const {
    isLoading,
    list,
    onRefresh,
    refreshing,
    handlePipeline,
    pipeline,
    dealStats,
  } = useDealStageList();
  const _renderItem = ({
    item,
    index,
  }: {
    item: stageItemInterface;
    index: number;
  }) => (
    <StageCard index={index} item={stageFormatter(item)} pipeline={pipeline} />
  );
  return (
    <Container>
      <View style={styles.header}>
        <Text style={typographies.headingLarge}>{titles.deals}</Text>
      </View>
      <StageTopHeader
        isLoading={isLoading}
        dealStats={dealStats}
        handlePipeline={handlePipeline}
        pipeline={pipeline}
      />
      <FlatList
        data={list}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(_, index) => index.toString()}
        renderItem={_renderItem}
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          isLoading || list.length === 0
            ? globalStyles.emptyFlexBox
            : styles.flatListStyle
        }
        ListEmptyComponent={
          <EmptyContent text={messages.noStageFound} forLoading={isLoading} />
        }
      />
    </Container>
  );
};

export default StageModule;
