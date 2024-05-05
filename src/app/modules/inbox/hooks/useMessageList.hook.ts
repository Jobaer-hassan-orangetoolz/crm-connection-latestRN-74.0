/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {
  gettingMoreAction,
  isGettingAction,
  refreshingAction,
  searchInboxList,
} from '../../../states/features/inbox/inbox.slice';
import {inboxStates} from '../../../states/allSelector.state';
import {CommonState} from '../../../states/common.state';
import {withoutIds} from '../../../services/models/InboxThread.model';
const useMessageListHook = () => {
  const searchRef = useRef<any>('');
  const indexIdRef = useRef<any>({});
  const {
    isLoading,
    isGetting,
    hasMore,
    list,
    page,
    perPage,
    refreshing,
    tab: tab,
    gettingMore,
  }: CommonState = customUseSelector(inboxStates);

  const [isShowSearch, setIsShowSearch] = useState(false);

  const dispatch = customUseDispatch();
  useEffect(() => {
    if (!isGetting && !isLoading) {
      dispatch(isGettingAction({withoutIds: withoutIds}));
    }
  }, []);
  const loadMore = () => {
    hasMore &&
      dispatch(
        gettingMoreAction({page, perPage, withoutIds: [], isLoading: false}),
      );
  };
  //onRefresh load
  const onRefresh = () => {
    dispatch(refreshingAction({withoutIds: [], isLoading: false}));
  };
  const handleChangeText = (e: string) => {
    searchRef.current = e;
    dispatch(searchInboxList(e));
  };
  const renderMessages = () => {};

  return {
    handleChangeText,
    renderMessages,
    loadMore,
    onRefresh,
    refreshing,
    searchRef,
    tab,
    list,
    dispatch,
    isLoading,
    ref: {indexIdRef, searchRef},
    isShowSearch,
    setIsShowSearch,
    gettingMore,
  };
};
export default useMessageListHook;
