import {
  customCall,
  customDelay,
  customPut,
  customSagaAll,
  customSelect,
  customTakeEvery,
  customTakeLatest,
} from '../../../packages/redux.package';
import {inboxStates} from '../../../states/allSelector.state';
import {
  gettingError,
  gettingSuccess,
  isGettingAction,
  setReadUnread,
  successArchive,
  successImportant,
} from '../../../states/features/inbox/inbox.slice';
import {updateUnreadCount} from '../../../states/features/user/user.slice';
import {sliceName} from '../../../states/sliceName.state';
import inboxApiHelper from '../../api/helper/inboxApi.helper';
import inboxThreadModel from '../../models/InboxThread.model';

interface ResultType {
  status: boolean;
  body: any;
}
function* getInboxData() {
  yield customTakeEvery(
    `${sliceName.inboxSlice}/isGettingAction`,
    getInboxSaga,
  );
  yield customTakeEvery(
    `${sliceName.inboxSlice}/refreshingAction`,
    getInboxSaga,
  );
  yield customTakeEvery(
    `${sliceName.inboxSlice}/gettingMoreAction`,
    getInboxSaga,
  );
  yield customTakeLatest(
    `${sliceName.inboxSlice}/searchInboxList`,
    searchInboxSaga,
  );
  yield customTakeEvery(
    `${sliceName.inboxSlice}/storeInboxTabValue`,
    getInboxSaga,
  );
  yield customTakeLatest(
    `${sliceName.inboxSlice}/archiveUnArchiveMessage`,
    setArchiveActionSaga,
  );
  yield customTakeLatest(
    `${sliceName.inboxSlice}/importantUnimportantMessage`,
    setImportantSaga,
  );
  yield customTakeLatest(
    `${sliceName.inboxSlice}/readUnreadMessage`,
    setReadUnreadMessage,
  );
}
function* getInboxSaga({payload: {withoutIds = []}}: any): Generator {
  const {
    page: _page,
    perPage: _perPage,
    search,
    tab,
  }: any = yield customSelect(inboxStates);

  const _payload = {
    page: _page,
    perPage: _perPage,
    messageType: inboxThreadModel.inboxListTypes,
    search: search,
    filterType: tab,
    withoutIds: withoutIds as any,
  };
  const result = yield customCall(inboxApiHelper.getInboxData, _payload);
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
function* searchInboxSaga({payload}: any): Generator {
  yield customDelay(1500);
  yield customPut(isGettingAction(payload));
}
function* setArchiveActionSaga({payload}: any): Generator {
  const _payload = {
    contactId: payload.contactId,
    isArchived: payload.status,
  };
  const result = yield customCall(inboxApiHelper.archiveUnarchive, _payload);
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {status} = (result || {}) as ResultType;
  if (status) {
    yield customPut(
      successArchive({status: payload.status, index: payload.index}),
    );
  } else {
    yield customPut(gettingError());
  }
}
function* setImportantSaga({payload}: any): Generator {
  const _payload = {
    contactId: payload.contactId,
    isImportant: payload.status,
  };
  const result = yield customCall(
    inboxApiHelper.importantUnimportant,
    _payload,
  );
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {status} = (result || {}) as ResultType;
  if (status) {
    yield customPut(
      successImportant({
        status: payload.status,
        index: payload.index,
      }),
    );
  } else {
    yield customPut(gettingError());
  }
}
function* setReadUnreadMessage({payload}: any): Generator {
  const _payload = {
    contactId: payload.contactId,
    isRead: payload.status,
  };
  const result = yield customCall(inboxApiHelper.readUnread, _payload);
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {status} = (result || {}) as ResultType;
  if (status) {
    if (payload.status) {
      yield customPut(updateUnreadCount(-1));
    } else {
      yield customPut(updateUnreadCount(1));
    }
    const {state = ''} = payload;
    if (state !== 'killed') {
      yield customPut(
        setReadUnread({status: payload.status, index: payload.index}),
      );
    }
  } else {
    yield customPut(gettingError());
  }
}
export default function* inboxSaga() {
  yield customSagaAll([getInboxData()]);
}
