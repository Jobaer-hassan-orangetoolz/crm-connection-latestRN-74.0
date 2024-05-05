/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {campaignsStates} from '../../../states/allSelector.state';
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
  storePipelineValue,
  storeStatusValue,
} from '../../../states/features/campaign/campaigns.slice';
import {CommonState} from '../../../states/common.state';
import {debounceHandler} from '../../../utilities/helper.utility';

const useCampaignsList = () => {
  const {
    isLoading,
    isGetting,
    list,
    hasMore,
    page,
    perPage,
    refreshing,
    search,
    status,
    folder,
  }: CommonState = customUseSelector(campaignsStates);
  const dispatch = customUseDispatch();
  useEffect(() => {
    if (!isGetting) {
      dispatch(isGettingAction());
    }
  }, []);
  const handleSetSearch = (value: string) => {
    dispatch(storeContactSearchText(value));
    dispatch(
      searchingAction({
        page: 1,
        perPage: 20,
        search: value,
        folder: folder.id,
        status,
      }),
    );
  };
  const handleStatus = (value: any) => {
    dispatch(storeStatusValue(value));
    dispatch(
      searchingAction({
        page: 1,
        perPage: 20,
        status: value,
        folder: folder.id,
        search,
      }),
    );
  };
  const handleFolder = (item: any) => {
    dispatch(storePipelineValue(item));
    dispatch(
      searchingAction({page: 1, perPage: 20, status, folder: item.id, search}),
    );
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
    dispatch(refreshingAction({search, folder, status}));
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
    status,
    handleStatus,
    handleFolder,
    folder,
  };
};

export default useCampaignsList;
