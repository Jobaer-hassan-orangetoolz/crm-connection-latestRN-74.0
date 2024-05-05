import {
  gettingSuccess,
  gettingError,
} from '../../../states/features/task/task.slice';
import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import taskApiHelper from '../../api/helper/taskApi.helper';
import {apiResponse} from '../../api/api.interface';

function* getTasks() {
  yield customTakeEvery(`${sliceName.taskSlice}/isGettingAction`, getTaskSaga);
  yield customTakeEvery(
    `${sliceName.taskSlice}/gettingMoreAction`,
    getTaskSaga,
  );
  yield customTakeEvery(`${sliceName.taskSlice}/changeTaskTab`, getTaskSaga);
  yield customTakeEvery(`${sliceName.taskSlice}/refreshingAction`, getTaskSaga);
}

function* getTaskSaga({payload}: any): Generator {
  const result = yield customCall(taskApiHelper.getTaskList, payload);
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {status, body} = result as apiResponse;
  if (status) {
    yield customPut(gettingSuccess(body));
  } else {
    yield customPut(gettingError());
  }
}
export default function* taskSaga() {
  yield customSagaAll([getTasks()]);
}
