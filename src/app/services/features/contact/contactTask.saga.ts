import {
  gettingSuccess,
  gettingError,
} from '../../../states/features/contact/contactTask.slice';
import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import contactApiHelper from '../../api/helper/contactApi.helper';
interface ResultType {
  status: boolean;
  body: any;
}
function* getContactTask() {
  yield customTakeEvery(
    `${sliceName.contactTaskSlice}/isGettingAction`,
    getContactTaskSaga,
  );
  yield customTakeEvery(
    `${sliceName.contactTaskSlice}/gettingMoreAction`,
    getMoreContactTaskSaga,
  );
  yield customTakeEvery(
    `${sliceName.contactTaskSlice}/refreshingAction`,
    getContactTaskSaga,
  );
}

function* getContactTaskSaga({
  payload = {page: 1, perPage: 10, id: '', type: ''},
}: any): Generator {
  const result = yield customCall(contactApiHelper.getContactTask, payload);
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {status, body} = (result || {}) as ResultType;
  if (status) {
    yield customPut(gettingSuccess(body));
  } else {
    yield customPut(gettingError());
  }
}
function* getMoreContactTaskSaga({payload}: any): Generator {
  const result = yield customCall(contactApiHelper.getContactTask, payload);
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {status, body} = (result || {}) as ResultType;
  if (status) {
    yield customPut(gettingSuccess(body?.slice(10, payload.perPage) || []));
  } else {
    yield customPut(gettingError());
  }
}
export default function* contactTaskSaga() {
  yield customSagaAll([getContactTask()]);
}
