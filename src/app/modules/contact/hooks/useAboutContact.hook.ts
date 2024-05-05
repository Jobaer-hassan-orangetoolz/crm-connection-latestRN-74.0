/* eslint-disable react-hooks/exhaustive-deps */
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';

import {aboutContactStates} from '../../../states/allSelector.state';
import {
  aboutContactInterface,
  isGettingContactCampaign,
  isGettingContactCustomField,
  isGettingContactPipeline,
  isGettingContactTags,
} from '../../../states/features/contact/aboutContact.slice';
import {useEffect} from 'react';

const useAboutContact = (id: string) => {
  const {
    customField,
    customFieldLoading,
    gettingCampaigns,
    gettingCustomField,
    gettingPipeline,
    gettingTags,
    refreshing,
    tags,
    campaigns,
    pipeline,
  }: aboutContactInterface = customUseSelector(aboutContactStates);
  const dispatch = customUseDispatch();
  useEffect(() => {
    !gettingCampaigns && dispatch(isGettingContactCampaign(id));
    !gettingTags && dispatch(isGettingContactTags(id));
    !gettingPipeline && dispatch(isGettingContactPipeline(id));
    !gettingCustomField &&
      !customFieldLoading &&
      dispatch(isGettingContactCustomField(id));
  }, [id]);
  return {
    customFieldLoading,
    customField,
    refreshing,
    tags,
    campaigns,
    pipeline,
  };
};

export default useAboutContact;
