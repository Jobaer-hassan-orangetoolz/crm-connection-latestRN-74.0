import {useState} from 'react';
import {customUseSelector} from '../../../packages/redux.package';
import {userStates} from '../../../states/allSelector.state';
import {isEmpty} from '../../../utilities/helper.utility';
const usePersonalisedTags = () => {
  const {userStandardPersonalizedField} = customUseSelector(userStates);
  const [searchText, setSearchText] = useState<string>('');
  const filter = isEmpty(userStandardPersonalizedField)
    ? []
    : userStandardPersonalizedField.filter(function (item: any) {
        if (item?.group && item.group) {
          if (searchText !== '') {
            return false;
          }
          return true;
        }
        return item?.label
          ?.toLowerCase()
          .match(new RegExp(searchText.toLowerCase()));
      });
  const [showSearch, setShowSearch] = useState(false);
  return {showSearch, setShowSearch, filter, setSearchText};
};
export default usePersonalisedTags;
