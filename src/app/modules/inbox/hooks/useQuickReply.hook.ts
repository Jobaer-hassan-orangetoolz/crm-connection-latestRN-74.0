/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {quickReplyStates} from '../../../states/allSelector.state';
import {
  clearAction,
  refreshingAction,
} from '../../../states/features/inbox/quickReply.slice';
import {isEmpty} from '../../../utilities/helper.utility';
import {useCustomNavigation} from '../../../packages/navigation.package';

const useQuickReply = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const navigation = useCustomNavigation();
  const dispatch = customUseDispatch();
  const {list, refreshing, type, isLoading} =
    customUseSelector(quickReplyStates);
  useEffect(() => {
    return () => dispatch(clearAction());
  }, []);
  const filter = isEmpty(list)
    ? []
    : list.filter(function (item: any) {
        return item?.title
          ?.toLowerCase()
          .match(new RegExp(searchText.toLowerCase()));
      });
  const onRefresh = () => {
    dispatch(refreshingAction({type: type}));
  };

  return {
    setShowSearch,
    setSearchText,
    showSearch,
    filter,
    refreshing,
    onRefresh,
    navigation,
    isLoading,
  };
};
export default useQuickReply;
