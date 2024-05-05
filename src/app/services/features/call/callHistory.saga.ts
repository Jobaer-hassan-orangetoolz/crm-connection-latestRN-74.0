import {
  customCall,
  customPut,
  customSagaAll,
  customSelect,
  customTakeEvery,
} from '../../../packages/redux.package';
import {callHistoryStates} from '../../../states/allSelector.state';
import {
  gettingError,
  gettingSuccess,
} from '../../../states/features/call/callHistory.slice';
import {sliceName} from '../../../states/sliceName.state';
import callHistoryApiHelper from '../../api/helper/callHistoryApi.helper';
interface ResultType {
  status: boolean;
  body: any;
}
function* getCallHistoryData() {
  yield customTakeEvery(
    `${sliceName.callHistorySlice}/isGettingAction`,
    getCallHistory,
  );
  yield customTakeEvery(
    `${sliceName.callHistorySlice}/refreshingAction`,
    getCallHistory,
  );
  yield customTakeEvery(
    `${sliceName.callHistorySlice}/gettingMoreAction`,
    getMoreCallHistory,
  );
}
function* getCallHistory(): Generator {
  const {page: _page, perPage: _perPage}: any = yield customSelect(
    callHistoryStates,
  );

  const _payload = {
    page: _page,
    perPage: _perPage,
  };
  const result = yield customCall(
    callHistoryApiHelper.getCallHistoryApi,
    _payload,
  );
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
function* getMoreCallHistory({payload}: any): Generator {
  const result = yield customCall(
    callHistoryApiHelper.getCallHistoryApi,
    payload,
  );
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
export default function* callHistorySaga() {
  yield customSagaAll([getCallHistoryData()]);
}
