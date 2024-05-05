import {useEffect, useState} from 'react';
import campaignApiHelper from '../../../services/api/helper/campaignApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
import {
  campaignInterface,
  campaignItemInterface,
} from '../../../services/formatter/campaign.formatter';
import {campaignStatus} from '../../../services/models/Campaign.modal';
import {customUseDispatch} from '../../../packages/redux.package';
import {updateCampaign} from '../../../states/features/campaign/campaigns.slice';
import CampaignFollowupBottomSheet from '../bottomSheet/CampaignFollowup.bottomSheet';
import {showAlertWithOneAction} from '../../../utilities/helper.utility';
import {titles} from '../../../assets/js/titles.message';
export interface selector {
  isLoading: boolean;
  data?: campaignInterface | any;
  refreshing: boolean;
  isGetting: boolean;
}

const useCampaignDetails = (
  id: number = -1,
  _item: campaignItemInterface,
  index: number,
) => {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [item, setItem] = useState({
    isLoading: true,
    data: {},
    isGetting: false,
    refreshing: false,
  } as selector);
  const dispatch = customUseDispatch();
  const loadData = async () => {
    let result = await campaignApiHelper.getCampaignDetails(id);
    const {status, body = {}} = result as apiResponse;
    if (status) {
      setItem(prev => ({
        ...prev,
        data: body,
        isLoading: false,
        isGetting: true,
        refreshing: false,
      }));
      setIsCheck((campaignStatus as any)[body.status]);
    } else {
      setItem(prev => ({...prev, isLoading: false, isGetting: true}));
    }
  };
  useEffect(() => {
    if (id && !item?.isGetting) {
      loadData();
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const onRefresh = () => {
    loadData();
  };
  const handleCheck = (flag: boolean) => {
    dispatch(
      updateCampaign({
        index,
        item: {..._item, status: flag ? 3 : 5},
      }),
    );
    setIsCheck(flag);
  };
  const handlePress = async () => {
    if (!isCheck) {
      global.showBottomSheet({
        flag: true,
        component: CampaignFollowupBottomSheet,
        componentProps: {onPress: handleCheck, id},
      });
    } else {
      const payload = {
        campaignId: id,
        type: 'pause',
        value: id,
      };
      const result = await campaignApiHelper.updateCampaign(payload);
      const {message, status: resStatus} = result as apiResponse;
      showAlertWithOneAction({title: titles.campaign, body: message});
      if (resStatus) {
        handleCheck(false);
      }
    }
  };
  const {data, isLoading, refreshing} = item;
  return {
    data,
    isLoading,
    refreshing,
    onRefresh,
    setItem,
    isCheck,
    handlePress,
  };
};

export default useCampaignDetails;
