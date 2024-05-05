/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {
  gettingMoreAction,
  isGettingAction,
  refreshingAction,
} from '../../../states/features/contact/contactNote.slice';
import {CommonState} from '../../../states/common.state';
import {contactNoteStates} from '../../../states/allSelector.state';

const useContactNote = (id: string) => {
  const {
    isLoading,
    isGetting,
    list,
    hasMore,
    page,
    perPage,
    refreshing,
  }: CommonState = customUseSelector(contactNoteStates);
  const dispatch = customUseDispatch();
  useEffect(() => {
    if (!isGetting) {
      dispatch(isGettingAction({page, perPage, id}));
    }
  }, []);
  const loadMore = () => {
    hasMore && dispatch(gettingMoreAction({page, perPage, id}));
  };
  const onRefresh = () => {
    dispatch(refreshingAction({page, perPage, id}));
  };
  return {isLoading, list, loadMore, onRefresh, refreshing};
};

export default useContactNote;
