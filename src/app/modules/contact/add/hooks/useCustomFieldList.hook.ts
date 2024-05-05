import {useState} from 'react';
import {customUseSelector} from '../../../../packages/redux.package';
import {userStates} from '../../../../states/allSelector.state';

const useCustomFieldList = () => {
  const {userCustomField} = customUseSelector(userStates);
  const [showSearch, isShowSearch] = useState(false);
  const [isLoading] = useState(false);

  return {userCustomField, showSearch, isLoading, isShowSearch};
};
export default useCustomFieldList;
