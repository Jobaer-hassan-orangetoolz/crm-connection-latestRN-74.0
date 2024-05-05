/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {callHistoryStates} from '../../../states/allSelector.state';
import {CommonState} from '../../../states/common.state';
import {
  gettingMoreAction,
  isGettingAction,
  refreshingAction,
} from '../../../states/features/call/callHistory.slice';

const useCallHistory = () => {
  const {
    isLoading,
    isGetting,
    hasMore,
    list,
    refreshing,
    page,
    perPage,
    gettingMore,
  }: CommonState = customUseSelector(callHistoryStates);
  const dispatch = customUseDispatch();
  useEffect(() => {
    if (!isGetting && !isLoading) {
      dispatch(isGettingAction());
    }
  }, []);
  const onRefresh = () => {
    dispatch(refreshingAction());
  };
  const fetchMore = () => {
    hasMore && dispatch(gettingMoreAction({page, perPage}));
  };
  return {
    list,
    hasMore,
    refreshing,
    onRefresh,
    isLoading,
    fetchMore,
    gettingMore,
  };
};
export default useCallHistory;
