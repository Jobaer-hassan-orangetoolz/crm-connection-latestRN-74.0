import {selectScheduleOptions} from '../../../assets/js/dropdown.data';
import {momentTimezone} from '../../../packages/momentTimezone.package';
import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {pipelineModal} from '../../../services/models/_Pipeline.modal';
import {sliceName} from '../../sliceName.state';
import {payloadType} from '../user/user.interface';
export interface dashboardInterface {
  activityLoading: boolean;
  activityCountLoading: boolean;
  taskLoading: boolean;
  activityGetting: boolean;
  taskGetting: boolean;
  activityRefreshing: boolean;
  taskRefreshing: boolean;
  activityFilter: any;
  taskFilter: any;
  activityData: any;
  activityCount: any;
  taskData: any;
  activityCountFilter: any;
}
const initialState = {
  activityLoading: true,
  activityCountLoading: true,
  taskLoading: true,
  activityGetting: false,
  taskGetting: false,
  activityRefreshing: false,
  taskRefreshing: false,
  activityFilter: selectScheduleOptions[1],
  activityCountFilter: selectScheduleOptions[1],
  taskFilter: selectScheduleOptions[1],
  activityData: {lost: 0, opened: 0, total: 0, win: 0},
  activityCount: {lost: 0, opened: 0, total: 0, win: 0},
  taskData: {},
};
const dashboardSlice = customCreateSlice({
  name: sliceName.dashboardSlice,
  initialState,
  reducers: {
    isGettingActivity: (state: dashboardInterface) => {
      state.activityLoading = true;
    },
    isGettingActivityCount: (state: dashboardInterface) => {
      state.activityCountLoading = true;
    },
    isGettingTask: (state: dashboardInterface) => {
      state.taskLoading = true;
    },
    isRefreshingActivity: (state: dashboardInterface) => {
      state.activityRefreshing = true;
    },
    isRefreshingTask: (state: dashboardInterface) => {
      state.taskRefreshing = true;
    },
    storeActivity: (state: dashboardInterface, payload: CustomAnyAction) => {
      const result = payload.payload;
      state.activityGetting = true;
      state.activityLoading = false;
      state.activityRefreshing = false;
      state.activityData = result;
    },
    filterActivity: (state: dashboardInterface, payload: payloadType) => {
      state.activityData = initialState.activityData;
      state.activityFilter = payload.payload.item;
    },
    filterTask: (state: dashboardInterface, payload: payloadType) => {
      state.taskData = initialState.taskData;
      state.taskFilter = payload.payload;
    },
    storeTask: (state: dashboardInterface, payload: CustomAnyAction) => {
      const result = payload.payload;
      state.taskGetting = true;
      state.taskLoading = false;
      state.taskRefreshing = false;
      state.taskData = result;
    },
    updateTaskReport: (state: dashboardInterface, payload: CustomAnyAction) => {
      const {item, timezone} = payload.payload;
      const taskDate = momentTimezone(item.end).tz(timezone);
      const todayDate = momentTimezone().tz(timezone);
      const startOfWeek = momentTimezone().tz(timezone).startOf('week');
      const endOfWeek = momentTimezone()
        .tz(timezone)
        .endOf('week')
        .subtract(1, 'day');
      const startOfMonth = momentTimezone().tz(timezone).startOf('month');
      const endOfMonth = momentTimezone().tz(timezone).endOf('month');
      const startOfYear = momentTimezone().tz(timezone).startOf('year');
      const endOfYear = momentTimezone().tz(timezone).endOf('year');

      switch (state.activityFilter?.value) {
        case 1:
          if (todayDate.isSame(taskDate, 'day')) {
            state.taskData.win += 1;
          }
          return;
        case 2:
          if (
            taskDate.isSameOrAfter(startOfWeek) &&
            taskDate.isSameOrBefore(endOfWeek)
          ) {
            state.taskData.win += 1;
          }
          return;
        case 3:
          if (
            taskDate.isSameOrAfter(startOfMonth) &&
            taskDate.isSameOrBefore(endOfMonth)
          ) {
            state.taskData.win += 1;
          }
          return;
        case 4:
          if (
            taskDate.isSameOrAfter(startOfYear) &&
            taskDate.isSameOrBefore(endOfYear)
          ) {
            state.taskData.win += 1;
          }
          return;
      }
    },
    updateActivityReport: (
      state: dashboardInterface,
      payload: CustomAnyAction,
    ) => {
      const {item = {}, timezone} = payload.payload;
      const taskDate = momentTimezone(item.end);
      const {deal_value = 0, contact_stage_status = 1} = item;
      const statusTitle =
        contact_stage_status && (pipelineModal as any)[contact_stage_status];
      const updateCounts = () => {
        state.activityData.count.win = Number(state.taskData.win) + 1;
        if (statusTitle && statusTitle !== pipelineModal[0]) {
          state.activityData.count[statusTitle.toLowerCase()] =
            Number(state.taskData.value[statusTitle.toLowerCase()]) +
            Number(deal_value);
        }
      };
      const todayDate = momentTimezone().tz(timezone);
      const startOfWeek = momentTimezone().tz(timezone).startOf('week');
      const endOfWeek = momentTimezone()
        .tz(timezone)
        .endOf('week')
        .subtract(1, 'day');
      const startOfMonth = momentTimezone().tz(timezone).startOf('month');
      const endOfMonth = momentTimezone().tz(timezone).endOf('month');
      const startOfYear = momentTimezone().tz(timezone).startOf('year');
      const endOfYear = momentTimezone().tz(timezone).endOf('year');
      switch (state.activityFilter?.value) {
        case 1:
          if (todayDate.isSame(taskDate, 'day')) {
            updateCounts();
          }
          return;
        case 2:
          if (
            taskDate.isSameOrAfter(startOfWeek) &&
            taskDate.isSameOrBefore(endOfWeek)
          ) {
            updateCounts();
          }
          return;
        case 3:
          if (
            taskDate.isSameOrAfter(startOfMonth) &&
            taskDate.isSameOrBefore(endOfMonth)
          ) {
            updateCounts();
          }
          return;
        case 4:
          if (
            taskDate.isSameOrAfter(startOfYear) &&
            taskDate.isSameOrBefore(endOfYear)
          ) {
            updateCounts();
          }
          return;
      }
    },
    failedActivity: (state: dashboardInterface) => {
      state.activityGetting = true;
      state.activityLoading = false;
      state.activityRefreshing = false;
      state.activityData = {};
    },
    failedCountActivity: (state: dashboardInterface) => {
      state.activityCountLoading = false;
      state.activityCount = {};
    },
    failedTask: (state: dashboardInterface) => {
      state.taskGetting = true;
      state.taskLoading = false;
      state.taskRefreshing = false;
      state.taskData = {};
    },
    storeCountActivity: (
      state: dashboardInterface,
      payload: CustomAnyAction,
    ) => {
      const result = payload.payload;
      state.activityCountLoading = false;
      state.activityCount = result;
    },
    filterCount: (state: dashboardInterface, payload: payloadType) => {
      state.taskData = initialState.activityCount;
      state.activityCountFilter = payload.payload.item;
    },
    clearAction: (state: dashboardInterface) => {
      for (const property in initialState) {
        (state as any)[property] = (initialState as any)[property];
      }
    },
  },
});

export const {
  isGettingActivity,
  isGettingTask,
  isRefreshingActivity,
  isRefreshingTask,
  storeActivity,
  storeTask,
  failedActivity,
  failedTask,
  clearAction,
  filterActivity,
  filterTask,
  updateTaskReport,
  updateActivityReport,
  isGettingActivityCount,
  storeCountActivity,
  filterCount,
}: {
  isGettingActivity: Function;
  isGettingTask: Function;
  isRefreshingActivity: Function;
  isRefreshingTask: Function;
  storeActivity: Function;
  storeTask: Function;
  failedActivity: Function;
  failedTask: Function;
  clearAction: Function;
  filterActivity: Function;
  filterTask: Function;
  updateTaskReport: Function;
  updateActivityReport: Function;
  isGettingActivityCount: Function;
  storeCountActivity: Function;
  filterCount: Function;
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
