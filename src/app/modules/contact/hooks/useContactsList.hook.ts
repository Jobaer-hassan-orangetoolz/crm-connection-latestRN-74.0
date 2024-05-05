/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {contactsStates} from '../../../states/allSelector.state';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {
  gettingMoreAction,
  isGettingAction,
  refreshingAction,
  searchingAction,
  storeContactSearchText,
} from '../../../states/features/contact/contacts.slice';
import {CommonState} from '../../../states/common.state';
import {debounceHandler} from '../../../utilities/helper.utility';

const useContactsList = () => {
  const {
    isLoading,
    isGetting,
    list,
    hasMore,
    page,
    perPage,
    refreshing,
    search,
  }: CommonState = customUseSelector(contactsStates);
  const dispatch = customUseDispatch();
  useEffect(() => {
    if (!isGetting) {
      dispatch(isGettingAction());
    }
  }, []);
  const handleSetSearch = (value: string) => {
    dispatch(storeContactSearchText(value));
    dispatch(searchingAction({page: 1, perPage: 20, search: value}));
  };
  const handleDebounce = debounceHandler(
    (value: string) => handleSetSearch(value),
    500,
  );
  const loadMore = () => {
    hasMore &&
      page !== 1 &&
      dispatch(gettingMoreAction({page, perPage, search}));
  };
  const onRefresh = () => {
    dispatch(refreshingAction({search}));
  };
  const clearSearch = () => {
    dispatch(storeContactSearchText(''));
    dispatch(searchingAction({page: 1, perPage: 20, search: ''}));
  };
  return {
    isLoading,
    handleDebounce,
    list,
    search,
    loadMore,
    onRefresh,
    refreshing,
    clearSearch,
    hasMore,
  };
};

export default useContactsList;
