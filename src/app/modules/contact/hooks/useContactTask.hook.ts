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
  storeTaskTabValue,
} from '../../../states/features/contact/contactTask.slice';
import {CommonState} from '../../../states/common.state';
import {
  contactDetailsStates,
  contactTaskStates,
} from '../../../states/allSelector.state';
import {contactTaskTabOptions} from '../../../assets/js/dropdown.data';
import {useCustomNavigation} from '../../../packages/navigation.package';

const useContactTask = (id: number) => {
  const {
    isLoading,
    isGetting,
    list,
    hasMore,
    page,
    perPage,
    refreshing,
    tab,
  }: CommonState = customUseSelector(contactTaskStates);
  const dispatch = customUseDispatch();
  const navigation = useCustomNavigation<any>();
  const {data} = customUseSelector(contactDetailsStates);
  useEffect(() => {
    if (!isGetting && id) {
      dispatch(isGettingAction({id, type: tab}));
    }
  }, [id]);
  const loadMore = () => {
    hasMore && dispatch(gettingMoreAction({page, perPage, type: tab, id}));
  };
  const onRefresh = () => {
    dispatch(storeTaskTabValue({type: contactTaskTabOptions[0].value}));
    dispatch(refreshingAction({id, type: contactTaskTabOptions[0].value}));
  };
  const handleTab = (value: string) => {
    dispatch(storeTaskTabValue({type: value}));
    dispatch(isGettingAction({id, type: value}));
  };
  return {
    isLoading,
    list,
    loadMore,
    onRefresh,
    handleTab,
    refreshing,
    tab,
    navigation,
    data,
  };
};

export default useContactTask;
