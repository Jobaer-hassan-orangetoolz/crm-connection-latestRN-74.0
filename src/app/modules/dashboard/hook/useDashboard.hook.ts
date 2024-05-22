/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {
  dashboardStates,
  taskStates,
  userStates,
} from '../../../states/allSelector.state';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {
  dashboardInterface,
  filterActivity,
  filterCount,
  filterTask,
  isGettingActivity,
  isGettingActivityCount,
  isGettingTask,
  isRefreshingActivity,
  isRefreshingTask,
} from '../../../states/features/dashboard/dashboard.slice';
import {config} from '../../../../config';
import {useIsMounted} from '../../../utilities/hooks/useIsMounted.hook';

const useDashboard = () => {
  const {
    activityData,
    activityFilter,
    activityLoading,
    activityRefreshing,
    taskData,
    taskFilter,
    taskLoading,
    taskRefreshing,
    activityCount,
    activityCountLoading,
    activityCountFilter,
  }: dashboardInterface = customUseSelector(dashboardStates);
  const {unreadCount}: any = customUseSelector(userStates);
  const dispatch = customUseDispatch();
  const isMount = useIsMounted();
  const [tab, setTab] = useState<number | string>(0);
  const [user, setUser] = useState<string>('own');
  const [check, setCheck] = useState<boolean>(false);
  const toggleUser = () => {
    setCheck(!check);
    if (user === 'own') {
      setUser('team');
    } else {
      setUser('own');
    }
  };
  useEffect(() => {
    dispatch(
      isGettingActivity({
        timeFrame: activityFilter.value,
        userType: 'own', //team
        type: tab === 0 ? 'totalValue' : 'totalDeal',
      }),
    );
  }, [tab]);
  useEffect(() => {
    dispatch(
      isGettingActivityCount({
        timeFrame: activityFilter.value,
        userType: user, //team
        type: 'totalDeal',
      }),
    );
    if (config.extraFeature) {
      const payload = {page: 1, perPage: 3, type: 'today'};
      dispatch(isGettingTask(payload));
    }
    // NativeModules.PermissionModule.requestPermissions((data: string) => {
    //   console.log('Received data from Kotlin:', data);
    // });
  }, []);
  useEffect(() => {
    if (isMount) {
      onRefresh();
    }
  }, [user]);
  const handleActivityFilter = (item: any) => {
    dispatch(
      filterActivity({
        timeFrame: item.value,
        userType: user, //team
        type: tab === 0 ? 'totalValue' : 'totalDeal',
        item: item,
      }),
    );
  };
  const handleTaskFilter = (item: any) => {
    dispatch(filterTask(item));
  };
  const handleChangeTab = (value: number) => {
    setTab(value);
  };
  const onRefresh = () => {
    dispatch(
      isRefreshingActivity({
        timeFrame: activityFilter.value,
        userType: user, //team
        type: tab === 0 ? 'totalValue' : 'totalDeal',
      }),
    );
    dispatch(isRefreshingTask());
  };
  const handleCountFilter = (item: any) => {
    dispatch(
      filterCount({
        timeFrame: item.value,
        userType: user, //team
        type: tab === 0 ? 'totalValue' : 'totalDeal',
        item: item,
      }),
    );
  };
  return {
    activityData,
    activityFilter,
    activityLoading,
    activityRefreshing,
    taskData,
    taskFilter,
    taskLoading,
    taskRefreshing,
    onRefresh,
    tab,
    handleActivityFilter,
    handleTaskFilter,
    handleChangeTab,
    activityCount,
    activityCountLoading,
    activityCountFilter,
    handleCountFilter,
    unreadCount,
    toggleUser,
    check,
  };
};

export default useDashboard;
