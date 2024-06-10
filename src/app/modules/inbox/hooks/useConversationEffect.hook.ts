/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {eachMessageStates} from '../../../states/allSelector.state';
import {
  clearAction,
  isGettingAction,
  gettingMoreAction,
} from '../../../states/features/inbox/eachMessage.slice';
import {
  contactDetails,
  currentContactId,
} from '../../../services/models/InboxThread.model';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';
import {useIsFocused} from '@react-navigation/native';

const useConversationEffect = ({id}: any) => {
  const dispatch = customUseDispatch();
  const isFocused = useIsFocused();
  const {isGetting, hasMore, list, isLoading} =
    customUseSelector(eachMessageStates);
  useEffect(() => {
    if (isFocused) {
      if (!isGetting) {
        dispatch(isGettingAction({contactId: id}));
      }
      if (!contactDetails || id !== contactDetails?.value?.id) {
        getContactInfo();
      }
      currentContactId.id = id;
    }
    return () => {
      dispatch(clearAction());
      currentContactId.id = -1;
      contactDetails.value = null;
    };
  }, [isFocused]);
  const getMore = () => {
    if (hasMore) {
      dispatch(gettingMoreAction({contactId: id}));
    }
  };
  const getContactInfo = async () => {
    const result = await contactApiHelper.getContactDetails(id);
    if (!result) {
      return;
    }
    const {status, body} = (result || {}) as any;
    if (status && body) {
      contactDetails.value = {...body, id: id};
    }
  };
  return {
    list,
    isGetting,
    isLoading,
    getMore,
    isFocused,
  };
};
export default useConversationEffect;
