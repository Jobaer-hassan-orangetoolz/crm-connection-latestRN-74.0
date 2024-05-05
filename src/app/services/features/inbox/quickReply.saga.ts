import {
  customCall,
  customPut,
  customSagaAll,
  customSelect,
  customTakeEvery,
} from '../../../packages/redux.package';
import {quickReplyStates} from '../../../states/allSelector.state';
import {
  gettingError,
  gettingSuccess,
} from '../../../states/features/inbox/quickReply.slice';
import {sliceName} from '../../../states/sliceName.state';
import inboxApiHelper from '../../api/helper/inboxApi.helper';

interface ResultType {
  status: boolean;
  body: any;
}
function* getQuickReplyData() {
  yield customTakeEvery(
    `${sliceName.quickReplySlice}/isGettingAction`,
    getQuickReplyList,
  );
  yield customTakeEvery(
    `${sliceName.quickReplySlice}/refreshingAction`,
    getQuickReplyList,
  );
  yield customTakeEvery(
    `${sliceName.quickReplySlice}/storeType`,
    getQuickReplyList,
  );
}
function* getQuickReplyList({payload}: any): Generator {
  const {page, perPage}: any = yield customSelect(quickReplyStates);
  const result = yield customCall(inboxApiHelper.getQuickReply, {
    page,
    perPage,
    type: payload.type,
  });
  if (!result) {
    yield customCall(gettingError());
    return;
  }
  const {status, body} = (result || {}) as ResultType;
  if (status) {
    yield customPut(gettingSuccess(body || []));
  } else {
    yield customPut(gettingError());
  }
}
export default function* quickReplySaga() {
  yield customSagaAll([getQuickReplyData()]);
}
