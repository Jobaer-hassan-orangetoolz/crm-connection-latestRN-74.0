/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {taskStates} from '../../../states/allSelector.state';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {
  changeTaskTab,
  gettingMoreAction,
  isGettingAction,
  refreshingAction,
} from '../../../states/features/task/task.slice';
import {CommonState} from '../../../states/common.state';

const useTasksList = () => {
  const {
    isLoading,
    isGetting,
    list,
    hasMore,
    page,
    perPage,
    refreshing,
    tab,
  }: CommonState = customUseSelector(taskStates);
  const dispatch = customUseDispatch();
  useEffect(() => {
    if (!isGetting) {
      dispatch(isGettingAction());
    }
  }, []);
  const loadMore = () => {
    hasMore && dispatch(gettingMoreAction({page, perPage}));
  };
  const onRefresh = () => {
    dispatch(refreshingAction({type: tab}));
  };
  const updateTab = (value: number) => {
    dispatch(changeTaskTab({type: value}));
  };
  return {
    isLoading,
    list,
    tab,
    updateTab,
    loadMore,
    hasMore,
    onRefresh,
    refreshing,
  };
};

export default useTasksList;
