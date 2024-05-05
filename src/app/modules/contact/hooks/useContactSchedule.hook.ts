/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {contactScheduleStates} from '../../../states/allSelector.state';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {
  gettingMoreAction,
  isGettingAction,
  refreshingAction,
} from '../../../states/features/contact/contactSchedule.slice';
import {CommonState} from '../../../states/common.state';

const useContactSchedule = () => {
  const {
    isLoading,
    isGetting,
    list,
    hasMore,
    page,
    perPage,
    refreshing,
  }: CommonState = customUseSelector(contactScheduleStates);
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
    dispatch(refreshingAction());
  };
  return {isLoading, list, loadMore, onRefresh, refreshing};
};

export default useContactSchedule;
