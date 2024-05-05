import {
  gettingSuccess,
  gettingError,
} from '../../../states/features/contact/contacts.slice';
import {sliceName} from '../../../states/sliceName.state';
import {
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import {dummyDataLink} from '../../dummy-data/dummyDataLink';
interface ResultType {
  status: boolean;
  body: any[];
}
function* getContacts() {
  yield customTakeEvery(
    `${sliceName.contactsSlice}/isGettingAction`,
    getContactsSaga,
  );
  yield customTakeEvery(
    `${sliceName.contactsSlice}/gettingMoreAction`,
    getMoreContactsSaga,
  );
  yield customTakeEvery(
    `${sliceName.contactsSlice}/refreshingAction`,
    getContactsSaga,
  );
}

function* getContactsSaga({
  payload = {page: 1, perPage: 10, id: ''},
}: any): Generator {
  //   const result = yield customCall(() => tasksApiHelper.getTasks({...payload}));
  const result = dummyDataLink.getContactsListData;
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {status, body} = (result || {}) as ResultType;
  if (status) {
    yield customPut(gettingSuccess(body?.slice(0) || []));
  } else {
    yield customPut(gettingError());
  }
}
function* getMoreContactsSaga({payload}: any): Generator {
  //   const result = yield customCall(() => tasksApiHelper.getTasks({...payload}));
  const result = dummyDataLink.getContactsListData;
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
export default function* contactsSaga() {
  yield customSagaAll([getContacts()]);
}
