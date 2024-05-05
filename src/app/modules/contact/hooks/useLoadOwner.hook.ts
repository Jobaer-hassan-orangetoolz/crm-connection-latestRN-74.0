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
import {getTeamUser} from '../../../states/features/user/user.slice';
import {isEmpty} from '../../../utilities/helper.utility';
import contactApiHelper from '../../../services/api/helper/contactApi.helper';

const useLeadOwner = (ownerId: number, id: number) => {
  const [check, setCheck] = useState<number>(ownerId);
  const {data}: any = customUseSelector(contactDetailsStates);
  const {teamUser, isLoading} = customUseSelector(userStates);
  const dispatch = customUseDispatch();
  const [search, setSearch] = useState<string>('');
  const filter = isEmpty(teamUser)
    ? []
    : teamUser.filter(function (item: any) {
        return item.fullName
          .toLowerCase()
          .match(new RegExp(search.toLowerCase()));
      });
  const handleSubmit = (item: any) => {
    setCheck(item.id);
    contactApiHelper.contactUpdateOwner(id, item.id);
    dispatch(
      storeContactDetails({...data, userName: item.fullName, userId: item.id}),
    );
  };
  const onRefresh = () => {
    dispatch(getTeamUser(true));
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
export default useLeadOwner;
