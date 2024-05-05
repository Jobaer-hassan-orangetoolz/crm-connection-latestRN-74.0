import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import Container from '../../../layouts/Container.layout';
import {globalStyles} from '../../../assets/styles/global.style.asset';
import useStageContact from '../hook/useStageContact.hook';
import {flatListRenderITem} from '../interface/stageCard.interface';
import StageDeal from '../../../components/app/StageDeal.app.component';
import DetailsTopHeader from './DetailsTopHeader.stage';
import EmptyContent from '../../../components/core/EmptyContent.core.component';
import {generateColor} from '../styles/stage.style';
import {stageInterface} from '../../../services/formatter/stage.formatter';
import {messages} from '../../../assets/js/messages.message';
import {stageDealInterface} from '../../../services/formatter/pipeline.formatter';
import rs from '../../../assets/styles/responsiveSize.style.asset';
import {colors} from '../../../assets/styles/colors.style.asset';

const StageDetails: React.FC<{
  route: {
    params: {
      index: number;
      item: stageInterface;
      pipeline: stageDealInterface;
      updateStage: any;
    };
  };
}> = ({
  route: {
    params: {index = -1, item: item, pipeline, updateStage},
  },
}) => {
  const {
    data,
    handleStatus,
    handleEditStage,
    status,
    isLoading,
    onRefresh,
    refreshing,
    stage,
    loadMore,
    handleAddDeal,
    handleEditDeal,
    stats,
    hasMore,
  } = useStageContact(item.id, item, pipeline.pipelineId, updateStage);
  const statusColor = generateColor(stage.textColor, stage.colorCode);
  const renderItem = ({item: __item, index: _index}: flatListRenderITem) => {
    return (
      <StageDeal
        item={__item}
        stage={stage}
        pipeline={pipeline}
        success={handleEditDeal}
        index={_index}
      />
    );
  };
  const renderEmpty = () => {
    return (
      <EmptyContent text={messages.noDealMessage} forLoading={isLoading} />
    );
  };
  return (
    <Container statusBarBg={statusColor}>
      <FlatList
        data={data}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={renderItem}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        onEndReached={loadMore}
        onEndReachedThreshold={0.25}
        ListHeaderComponent={
          <DetailsTopHeader
            handleStatus={handleStatus}
            index={index}
            item={stage}
            status={status}
            stats={stats}
            successAddDeal={handleAddDeal}
            pipeline={pipeline}
            loading={isLoading}
            successStage={handleEditStage}
          />
        }
        ListFooterComponent={
          hasMore && (
            <View style={{height: rs(30)}}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )
        }
        ListEmptyComponent={renderEmpty()}
        keyExtractor={(_, _index) => _index.toString()}
        contentContainerStyle={
          data?.length > 0 ? {} : globalStyles.emptyFlexBox
        }
        initialNumToRender={8}
      />
    </Container>
  );
};

export default StageDetails;
