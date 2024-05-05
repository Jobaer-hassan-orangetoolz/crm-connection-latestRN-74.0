import {
  gettingSuccess,
  gettingError,
} from '../../../states/features/contact/contactNote.slice';
import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import noteApiHelper from '../../api/helper/noteApi.helper';
import {apiResponse} from '../../api/api.interface';
interface ResultType {
  status: boolean;
  body: any;
}
function* getContactNote() {
  yield customTakeEvery(
    `${sliceName.contactNoteSlice}/isGettingAction`,
    getContactNoteSaga,
  );
  yield customTakeEvery(
    `${sliceName.contactNoteSlice}/gettingMoreAction`,
    getMoreContactNoteSaga,
  );
  yield customTakeEvery(
    `${sliceName.contactNoteSlice}/refreshingAction`,
    getContactNoteSaga,
  );
}

function* getContactNoteSaga({
  payload = {page: 1, perPage: 10, id: ''},
}: any): Generator {
  const result = yield customCall(noteApiHelper.getNoteList, payload);
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {status, body} = (result || {}) as apiResponse;
  if (status) {
    yield customPut(gettingSuccess(body));
  } else {
    yield customPut(gettingError());
  }
}
function* getMoreContactNoteSaga({payload}: any): Generator {
  const result = yield customCall(noteApiHelper.getNoteList, payload);
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
export default function* contactNoteSaga() {
  yield customSagaAll([getContactNote()]);
}
