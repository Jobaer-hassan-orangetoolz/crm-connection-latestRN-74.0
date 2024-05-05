/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {pipelineStates} from '../../../states/allSelector.state';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {isGettingAction} from '../../../states/features/deal/pipeline.slice';
import {CommonState} from '../../../states/common.state';

const usePipeline = () => {
  const {isLoading, isGetting, list}: CommonState =
    customUseSelector(pipelineStates);
  const dispatch = customUseDispatch();
  useEffect(() => {
    if (!isGetting) {
      dispatch(isGettingAction());
    }
  }, []);
  return {
    isLoading,
    list,
  };
};

export default usePipeline;
