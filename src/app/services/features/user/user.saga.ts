import {
  getLocalData,
  storeLocalData,
} from '../../../packages/asyncStorage/storageHandle';
import {getUniqueIdHelper} from '../../../packages/device-info/deviceInfo.handler';
import {getMessagingToken} from '../../../packages/firebase/firebase.index';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import {payloadType} from '../../../states/features/user/user.interface';
import {
  getTeamUserSuccess,
  getUserCustomFieldSuccess,
  getUserLeadSourceSuccess,
  getUserStandardPersonalizedSuccess,
  getUserVirtualNumberSuccess,
  storeUnreadCountSuccess,
} from '../../../states/features/user/user.slice';
import {sliceName} from '../../../states/sliceName.state';
import {apiResponse} from '../../api/api.interface';
import inboxApi from '../../api/helper/inboxApi.helper';
import userApi from '../../api/helper/userApi.helper';

function* userWatcher() {
  yield customTakeEvery(
    `${sliceName.userSlice}/saveGCMToken`,
    saveGCMTokenSaga,
  );
  yield customTakeEvery(
    `${sliceName.userSlice}/storeUnreadCount`,
    storeUnreadCountSaga,
  );
  yield customTakeEvery(`${sliceName.userSlice}/getTeamUser`, getTeamUserSaga);
  yield customTakeEvery(
    `${sliceName.userSlice}/getUserLeadSource`,
    getUserLeadSourceSaga,
  );
  yield customTakeEvery(
    `${sliceName.userSlice}/getUserVirtualNumber`,
    getUserVirtualNumberSaga,
  );
  yield customTakeEvery(
    `${sliceName.userSlice}/getUserCustomField`,
    getUserCustomFieldSaga,
  );
  yield customTakeEvery(
    `${sliceName.userSlice}/getUserStandardPersonalized`,
    getUserStandardPersonalizedFieldSaga,
  );
}

function* saveGCMTokenSaga(): Generator {
  const messageToken = yield getMessagingToken();
  const id = yield getUniqueIdHelper();
  if (id && messageToken) {
    let flag = yield getLocalData.gcmFlag();
    if (!flag) {
      const response = yield customCall(userApi.storeFCMToken, {
        id,
        token: messageToken,
      });
      const {status} = response as apiResponse;
      if (status) {
        storeLocalData.storeGcmFlag(true);
      }
    }
  }
}
function* storeUnreadCountSaga(): Generator {
  const response = yield customCall(inboxApi.getInboxUnreadCount);
  const {
    status,
    body: {unreadMessageCount},
  } = response as apiResponse;
  if (status) {
    yield customPut(storeUnreadCountSuccess(unreadMessageCount));
  }
}
function* getTeamUserSaga(payload: payloadType): Generator {
  let flag = yield getLocalData.getTeamUser();
  if (!flag || payload.payload) {
    const response = yield customCall(userApi.getTeamUser);
    const {status, body} = response as apiResponse;
    if (status) {
      yield customPut(getTeamUserSuccess(body));
      storeLocalData.storeTeamUser(body);
    }
  } else {
    yield customPut(getTeamUserSuccess(flag));
  }
}
function* getUserLeadSourceSaga(): Generator {
  let flag = yield getLocalData.getUserLeadSource();
  if (!flag) {
    const response = yield customCall(userApi.getUserLeadSource);
    const {status, body} = response as apiResponse;
    if (status) {
      yield customPut(getUserLeadSourceSuccess(body));
      storeLocalData.storeUserLeadSource(body);
    }
  } else {
    yield customPut(getUserLeadSourceSuccess(flag));
  }
}
function* getUserVirtualNumberSaga(payload: payloadType): Generator {
  let flag = yield getLocalData.getUserVirtualNumber();
  if (!flag || payload.payload) {
    const response = yield customCall(userApi.getUserVirtualNumber);
    const {status, body} = response as apiResponse;
    if (status) {
      yield customPut(getUserVirtualNumberSuccess(body));
      storeLocalData.storeUserVirtualNumber(body);
    }
  } else {
    yield customPut(getUserVirtualNumberSuccess(flag));
  }
}
function* getUserCustomFieldSaga(): Generator {
  let flag = yield getLocalData.getUserCustomField();
  if (!flag) {
    const response = yield customCall(userApi.getUserCustomField);
    const {status, body} = response as apiResponse;
    if (status) {
      yield customPut(getUserCustomFieldSuccess(body));
      storeLocalData.storeUserCustomField(body);
    }
  } else {
    yield customPut(getUserCustomFieldSuccess(flag));
  }
}
function* getUserStandardPersonalizedFieldSaga(): Generator {
  let flag = yield getLocalData.getUserStandardPersonalizedField();
  if (!flag) {
    const response = yield customCall(userApi.getUserStandardPersonalizedField);
    const {status, body} = response as apiResponse;
    if (status) {
      yield customPut(
        getUserStandardPersonalizedSuccess([
          ...[{title: 'Personalized Fields', group: true}],
          ...body.personalized,
          ...[{title: 'Standard Fields', group: true}],
          ...body.standard,
        ]),
      );
      storeLocalData.storeUserStandardPersonalizedField([
        ...[{title: 'Personalized Fields', group: true}],
        ...body.personalized,
        ...[{title: 'Standard Fields', group: true}],
        ...body.standard,
      ]);
    }
  } else {
    yield customPut(getUserStandardPersonalizedSuccess(flag));
  }
}

export default function* userSaga() {
  yield customSagaAll([userWatcher()]);
}
