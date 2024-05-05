import {useState} from 'react';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {
  contactDetailsStates,
  userStates,
} from '../../../states/allSelector.state';
import {storeContactDetails} from '../../../states/features/contact/contactDetails.slice';
import {getUserLeadSource} from '../../../states/features/user/user.slice';
import {isEmpty} from '../../../utilities/helper.utility';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';

const useLeadSource = (sourceId: number, id: number) => {
  const [check, setCheck] = useState<number>(sourceId);
  const {data}: any = customUseSelector(contactDetailsStates);
  const {userLeadSource, isLoading} = customUseSelector(userStates);
  const dispatch = customUseDispatch();
  const [search, setSearch] = useState<string>('');
  const filter = isEmpty(userLeadSource)
    ? []
    : userLeadSource.filter(function (item: any) {
        return item.sourceTitle
          .toLowerCase()
          .match(new RegExp(search.toLowerCase()));
      });
  const handleSubmit = (item: any) => {
    setCheck(item.id);
    contactApiHelper.contactUpdateSource(id, item.id);
    dispatch(
      storeContactDetails({
        ...data,
        sourceTitle: item.sourceTitle,
        sourceId: item.id,
      }),
    );
  };
  const onRefresh = () => {
    dispatch(getUserLeadSource(true));
  };
  return {
    check,
    handleSubmit,
    search,
    setSearch,
    filter,
    isLoading,
    onRefresh,
  };
};
export default useLeadSource;
