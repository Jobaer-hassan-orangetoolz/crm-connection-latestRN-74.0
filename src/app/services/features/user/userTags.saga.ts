import {
  gettingSuccess,
  gettingError,
} from '../../../states/features/user/userTags.slice';
import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import {apiResponse} from '../../api/api.interface';
import userApiHelper from '../../api/helper/userApi.helper';
function* getUserTags() {
  yield customTakeEvery(
    `${sliceName.userTagsSlice}/isGettingAction`,
    getUserTagsSaga,
  );
  yield customTakeEvery(
    `${sliceName.userTagsSlice}/gettingMoreAction`,
    getUserTagsSaga,
  );
  yield customTakeEvery(
    `${sliceName.userTagsSlice}/refreshingAction`,
    getUserTagsSaga,
  );
  yield customTakeEvery(
    `${sliceName.userTagsSlice}/searchingAction`,
    getUserTagsSaga,
  );
}

function* getUserTagsSaga({payload}: any): Generator {
  const result = yield customCall(userApiHelper.getUserTags, payload);
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
export default function* userTagsSaga() {
  yield customSagaAll([getUserTags()]);
}
