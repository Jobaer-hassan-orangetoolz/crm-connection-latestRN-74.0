import {useEffect, useState} from 'react';
import dealsApiHelper from '../../../services/api/helper/pipelineApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
import {stageInterface} from '../../../services/formatter/stage.formatter';
import {isEmpty} from '../../../utilities/helper.utility';
interface selector {
  isLoading: boolean;
  data?: any[];
  refreshing: boolean;
  isGetting: boolean;
  page: number;
  perPage: number;
  hasMore: boolean;
  stats: any;
}

const useStageContact = (
  stageId: number = -1,
  _data: stageInterface,
  pipelineId: number,
  updateStage: any,
) => {
  const [status, setStatus] = useState<number>(1);
  const [item, setItem] = useState({
    isLoading: true,
    data: [],
    isGetting: false,
    refreshing: false,
    page: 1,
    perPage: 10,
    hasMore: false,
    stats: {},
  } as selector);
  const [stage, setStage] = useState<any>(_data);
  const loadData = async (
    value: number,
    page: number = 1,
    perPage: number = 10,
  ) => {
    let result = await dealsApiHelper.getDealList({
      pipelineId,
      type: value,
      stageId,
      page,
      perPage,
    });
    const {status: apiStatus, body = {}} = result as apiResponse;
    if (apiStatus) {
      if (typeof body === 'object') {
        let list: any[] = [];
        let extraData: any = {};
        if (page > 1) {
          list = (item.data || []).concat(
            Array.isArray(body.data) ? body?.data : [],
          );
        } else {
          list = Array.isArray(body?.data) ? body?.data : [];
          extraData = !isEmpty(body.extraData[0]) ? body.extraData[0] : {};
        }
        setItem(prev => ({
          ...prev,
          data: list,
          isLoading: false,
          isGetting: true,
          refreshing: false,
          page: page + 1,
          stats: !isEmpty(extraData) ? extraData : item.stats,
          hasMore: body?.data?.length >= item.perPage ? true : false,
        }));
      }
    } else {
      setItem(prev => ({
        ...prev,
        data: [],
        hasMore: false,
        page: 1,
        perPage: 10,
        isLoading: false,
        isGetting: true,
      }));
    }
  };
  useEffect(() => {
    if (!item?.isGetting) {
      loadData(status);
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleStatus = (value: number) => {
    setStatus(value);
    setItem(prev => ({
      ...prev,
      isLoading: true,
      page: 1,
      data: [],
      hasMore: false,
    }));
    loadData(value);
  };
  const onRefresh = () => {
    setItem(prev => ({...prev, refreshing: true, hasMore: false}));
    loadData(status);
  };
  const loadMore = () => {
    item.hasMore && loadData(status, item.page, item.perPage);
  };
  const handleAddDeal = (value: any) => {
    if (status === 1 && value) {
      const updateArray = [...item.data];
      updateArray.unshift(value);
      setItem((prev: selector) => ({...prev, data: updateArray}));
    }
  };
  const handleEditDeal = (value: any, index: number, remove: boolean) => {
    const updateArray = [...item.data];
    const deleteValue = updateArray[index];
    if (remove) {
      updateArray.splice(index, 1);
      setItem((prev: selector) => ({
        ...prev,
        data: updateArray,
        stats: {
          totalDealValue:
            item.stats.totalDealValue - parseInt(deleteValue.dealValue, 10),
          totalContacts: item.stats.totalContacts - 1,
        },
      }));
    } else {
      updateArray[index] = value;
      setItem((prev: selector) => ({
        ...prev,
        data: updateArray,
        stats: {
          totalDealValue:
            item.stats.totalDealValue - parseInt(deleteValue.dealValue, 10),
          totalContacts: item.stats.totalContacts--,
        },
      }));
    }
  };
  const handleEditStage = (value: any) => {
    const newStage = {
      ..._data,
      stage: value.stageName,
      percentage: value.probabilityValue,
      colorCode: value.colorCode,
      textColor: value.textColor,
    };

    updateStage(newStage);
    setStage(newStage);
  };
  const {data, isLoading, stats, hasMore, refreshing} = item;
  return {
    data,
    isLoading,
    refreshing,
    status,
    handleStatus,
    onRefresh,
    stage,
    loadMore,
    hasMore,
    handleAddDeal,
    handleEditStage,
    handleEditDeal,
    stats,
  };
};

export default useStageContact;
