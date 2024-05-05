import {
  customCall,
  customPut,
  customSagaAll,
  customSelect,
  customTakeEvery,
} from '../../../packages/redux.package';
import {eachMessageStates} from '../../../states/allSelector.state';
import {
  gettingError,
  gettingSuccess,
} from '../../../states/features/inbox/eachMessage.slice';
import {sliceName} from '../../../states/sliceName.state';
import inboxApiHelper from '../../api/helper/inboxApi.helper';
import inboxThreadModel from '../../models/InboxThread.model';

interface ResultType {
  status: boolean;
  body: any;
}
function* getMessageData() {
  yield customTakeEvery(
    `${sliceName.eachMessageSlice}/isGettingAction`,
    getEachMessageSaga,
  );
  yield customTakeEvery(
    `${sliceName.eachMessageSlice}/refreshingAction`,
    getEachMessageSaga,
  );
  yield customTakeEvery(
    `${sliceName.eachMessageSlice}/gettingMoreAction`,
    getEachMessageSaga,
  );
}
function* getEachMessageSaga({payload}: any): Generator {
  const {page, perPage}: any = yield customSelect(eachMessageStates);
  const result = yield customCall(inboxApiHelper.getConversation, {
    page,
    perPage,
    contactId: payload.contactId,
    messageType: inboxThreadModel.inboxListTypes,
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

export default function* eachMessageSaga() {
  yield customSagaAll([getMessageData()]);
}
