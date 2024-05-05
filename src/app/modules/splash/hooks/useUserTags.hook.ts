/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {userTagsStates} from '../../../states/allSelector.state';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {
  gettingMoreAction,
  isGettingAction,
  refreshingAction,
  searchingAction,
  storeTagsSearchText,
  clearAction,
} from '../../../states/features/user/userTags.slice';
import {CommonState} from '../../../states/common.state';
import {debounceHandler, isEmpty} from '../../../utilities/helper.utility';
import {storeContactDetails} from '../../../states/features/contact/aboutContact.slice';
import {useCustomNavigation} from '../../../packages/navigation.package';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';

const useUserTags = (tags: any[], id: number) => {
  const {
    isLoading,
    isGetting,
    list,
    hasMore,
    page,
    perPage,
    refreshing,
    search,
  }: CommonState = customUseSelector(userTagsStates);
  const navigation = useCustomNavigation();
  const dispatch = customUseDispatch();
  const [userTags, setUserTags] = useState<any[]>(tags);
  useEffect(() => {
    if (!isGetting) {
      dispatch(isGettingAction({search, id}));
    }
    return () => {
      dispatch(clearAction());
    };
  }, []);
  const handleSetSearch = (value: string) => {
    dispatch(storeTagsSearchText(value));
    dispatch(searchingAction({page: 1, perPage: 20, search: value, id}));
  };
  const handleDebounce = debounceHandler(
    (value: string) => handleSetSearch(value),
    500,
  );
  const loadMore = () => {
    hasMore &&
      page !== 1 &&
      dispatch(gettingMoreAction({page, perPage, search, id}));
  };

  const handleClick = (_item: any) => {
    const find = userTags.find(obj => obj.tag_id === _item.id);
    if (!isEmpty(find)) {
      const updatedTags = userTags.filter(obj => obj.tag_id !== _item.id);
      dispatch(
        storeContactDetails({
          tags: updatedTags,
        }),
      );
      contactApiHelper.contactDeleteTag({
        tagId: _item.id,
        contactId: id,
      });
      setUserTags(updatedTags);
    } else {
      const updatedTags = [...userTags];
      updatedTags.unshift({tag: _item, tag_id: _item.id});
      setUserTags(updatedTags);
    }
  };
  const handleSubmit = () => {
    const getIds = () => {
      const tagIds: number[] = [];
      userTags.forEach((element: any) => {
        tagIds.push(element.tag.id);
      });
      return tagIds;
    };
    contactApiHelper.contactAddTag({
      tagIds: getIds(),
      contactId: id,
    });
    dispatch(
      storeContactDetails({
        tagLoading: false,
        refreshing: false,
        gettingTags: true,
        tags: userTags,
      }),
    );
    navigation.goBack();
  };
  const onRefresh = () => {
    dispatch(refreshingAction({page: 1, perPage: 20, search: '', id}));
  };
  const clearSearch = () => {
    dispatch(storeTagsSearchText(''));
    dispatch(searchingAction({page: 1, perPage: 20, search: '', id}));
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
    userTags,
    handleSubmit,
    handleClick,
  };
};

export default useUserTags;
