import {
  gettingSuccess,
  gettingError,
} from '../../../states/features/contact/contacts.slice';
import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import contactApiHelper from '../../api/helper/contactApi.helper';
import {apiResponse} from '../../api/api.interface';

function* getContacts() {
  yield customTakeEvery(
    `${sliceName.contactsSlice}/isGettingAction`,
    getContactsSaga,
  );
  yield customTakeEvery(
    `${sliceName.contactsSlice}/refreshingAction`,
    getContactsSaga,
  );
  yield customTakeEvery(
    `${sliceName.contactsSlice}/searchingAction`,
    getContactsSaga,
  );
  yield customTakeEvery(
    `${sliceName.contactsSlice}/gettingMoreAction`,
    getMoreContactsSaga,
  );
}

function* getContactsSaga({
  payload = {page: 1, perPage: 20, search: ''},
}: any): Generator {
  const result = yield customCall(contactApiHelper.getContactList, payload);
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {body, status} = result as apiResponse;
  if (status) {
    yield customPut(gettingSuccess(body));
  } else {
    yield customPut(gettingError());
  }
}
function* getMoreContactsSaga({payload}: any): Generator {
  const result = yield customCall(contactApiHelper.getContactList, payload);
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {body, status} = result as apiResponse;
  if (status) {
    yield customPut(gettingSuccess(body));
  } else {
    yield customPut(gettingError());
  }
}
export default function* contactsSaga() {
  yield customSagaAll([getContacts()]);
}
