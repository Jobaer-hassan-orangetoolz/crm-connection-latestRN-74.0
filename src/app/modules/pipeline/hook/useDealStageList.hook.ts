import {dealStagesStates} from '../../../states/allSelector.state';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {
  refreshingAction,
  storePipelineValue,
  searchingAction,
} from '../../../states/features/deal/dealStages.slice';
import {CommonState} from '../../../states/common.state';

const useDealStageList = () => {
  const {isLoading, list, refreshing, pipeline, dealStats}: CommonState =
    customUseSelector(dealStagesStates);
  const dispatch = customUseDispatch();
  const handlePipeline = (item: any) => {
    dispatch(storePipelineValue(item));
    dispatch(searchingAction(item.pipelineId));
  };
  const onRefresh = () => {
    dispatch(refreshingAction(pipeline.pipelineId));
  };
  return {
    isLoading,
    list,
    onRefresh,
    refreshing,
    handlePipeline,
    pipeline,
    dealStats,
  };
};

export default useDealStageList;
