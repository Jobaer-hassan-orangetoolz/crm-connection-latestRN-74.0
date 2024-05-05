/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {campaignFolderStates} from '../../../states/allSelector.state';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {isGettingAction} from '../../../states/features/campaign/campaignFolder.slice';
import {CommonState} from '../../../states/common.state';

const useCampaignFolder = () => {
  const {isLoading, isGetting, list}: CommonState =
    customUseSelector(campaignFolderStates);
  const dispatch = customUseDispatch();
  useEffect(() => {
    if (!isGetting) {
      dispatch(isGettingAction());
    }
  }, []);
  return {
    isLoading,
    list,
  };
};

export default useCampaignFolder;
