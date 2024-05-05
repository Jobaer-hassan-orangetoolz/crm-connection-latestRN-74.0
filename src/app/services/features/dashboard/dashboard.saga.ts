import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import {payloadType} from '../../../states/features/user/user.interface';
import dashboardApiHelper from '../../api/helper/dashboardApi.helper';
import {apiResponse} from '../../api/api.interface';
import {
  failedActivity,
  failedTask,
  isRefreshingTask,
  storeActivity,
  storeCountActivity,
  storeTask,
} from '../../../states/features/dashboard/dashboard.slice';
import {selectScheduleOptions} from '../../../assets/js/dropdown.data';
import taskApiHelper from '../../api/helper/taskApi.helper';

function* getDashboard() {
  yield customTakeEvery(
    `${sliceName.dashboardSlice}/isGettingActivity`,
    getActivitySaga,
  );
  yield customTakeEvery(
    `${sliceName.dashboardSlice}/isGettingActivityCount`,
    getActivityCountSaga,
  );
  yield customTakeEvery(
    `${sliceName.dashboardSlice}/isGettingTask`,
    getTaskReportSaga,
  );
  yield customTakeEvery(
    `${sliceName.dashboardSlice}/filterTask`,
    getTaskReportSaga,
  );
  yield customTakeEvery(
    `${sliceName.dashboardSlice}/filterActivity`,
    getActivitySaga,
  );
  yield customTakeEvery(
    `${sliceName.dashboardSlice}/isRefreshingActivity`,
    getActivitySaga,
  );
  yield customTakeEvery(
    `${sliceName.dashboardSlice}/isRefreshingTask`,
    getTaskReportSaga,
  );
  yield customTakeEvery(
    `${sliceName.dashboardSlice}/filterCount`,
    getActivityCountSaga,
  );
}

function* getActivitySaga({
  payload = {time: selectScheduleOptions[0].value},
}: payloadType): Generator {
  const result = yield customCall(dashboardApiHelper.getDashboardActivity, {
    ...payload,
    // type: 'totalDeal',
    // userType: 'own',
  });
  if (!result) {
    yield customPut(failedActivity());
    return;
  }
  yield isRefreshingTask();
  const {status, body} = result as apiResponse;
  if (status) {
    yield customPut(storeActivity(body));
  } else {
    yield customPut(failedActivity());
  }
}
function* getActivityCountSaga({payload}: payloadType): Generator {
  const result = yield customCall(dashboardApiHelper.getDashboardActivity, {
    ...payload,
    type: 'totalDeal',
    userType: 'own',
  });
  if (!result) {
    yield customPut(failedActivity());
    return;
  }
  const {status, body} = result as apiResponse;
  if (status) {
    yield customPut(storeCountActivity(body));
  } else {
    yield customPut(failedActivity());
  }
}
function* getTaskReportSaga({
  payload = {type: selectScheduleOptions[0].value},
}: payloadType): Generator {
  const result = yield customCall(taskApiHelper.getTaskList, payload);
  if (!result) {
    yield customPut(failedTask());
    return;
  }
  const {status, body} = result as apiResponse;
  if (status) {
    yield customPut(storeTask(body));
  } else {
    yield customPut(failedTask());
  }
}
export default function* dashboardSaga() {
  yield customSagaAll([getDashboard()]);
}
