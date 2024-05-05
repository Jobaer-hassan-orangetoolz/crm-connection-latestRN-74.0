import {useEffect, useRef, useState} from 'react';
import {debounceHandler} from '../../../utilities/helper.utility';
import campaignApiHelper from '../../../services/api/helper/campaignApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
interface stateInterface {
  list: any[];
  hasMore: boolean;
  isLoading: boolean;
  getting: boolean;
  refreshing: boolean;
}
const useCampaignContact = (id: number) => {
  const [state, setState] = useState<stateInterface>({
    list: [],
    hasMore: false,
    isLoading: true,
    getting: false,
    refreshing: false,
  });
  const pageList = useRef<{page: number; perPage: number}>({
    page: 1,
    perPage: 20,
  });
  const search = useRef<string>('');
  const loadData = async (query: string) => {
    const {page, perPage} = pageList.current;
    const params = `?campaignId=${id}&page=${page}&perPage=${perPage}&search=${query}`;
    const result = await campaignApiHelper.campaignContactList(params);
    const {status, body} = result as apiResponse;
    if (status) {
      let array: any[] = [];
      if (page > 1) {
        array = (state.list || []).concat(Array.isArray(body) ? body : []);
      } else {
        array = Array.isArray(body) ? body : [];
      }
      pageList.current.page += 1;
      setState((prev: stateInterface) => ({
        ...prev,
        isLoading: false,
        list: [...array],
        getting: true,
        refreshing: false,
        hasMore: body?.length >= perPage ? true : false,
      }));
    } else {
      setState((prev: stateInterface) => ({
        ...prev,
        isLoading: false,
        hasMore: false,
        refreshing: false,
        getting: true,
        list: [],
      }));
    }
  };
  const loadMore = () => {
    state.hasMore && loadData(search.current);
  };
  const onRefresh = () => {
    setState((prev: stateInterface) => ({
      ...prev,
      refreshing: true,
    }));
    search.current = '';
    pageList.current = {page: 1, perPage: 20};
    loadData('');
  };
  useEffect(() => {
    if (!state.getting) {
      loadData(search.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSetSearch = (value: string) => {
    search.current = value;
    setState((prev: stateInterface) => ({
      ...prev,
      isLoading: true,
    }));
    pageList.current = {page: 1, perPage: 20};
    loadData(value);
  };
  const clearSearch = () => {
    search.current = '';
    setState((prev: stateInterface) => ({
      ...prev,
      isLoading: true,
    }));
    pageList.current = {page: 1, perPage: 20};
    loadData('');
  };
  const handleDebounce = debounceHandler(
    (value: string) => handleSetSearch(value),
    500,
  );
  const {list, hasMore, isLoading, refreshing} = state;
  return {
    list,
    hasMore,
    isLoading,
    search: search.current,
    handleDebounce,
    refreshing,
    loadMore,
    clearSearch,
    onRefresh,
  };
};

export default useCampaignContact;
