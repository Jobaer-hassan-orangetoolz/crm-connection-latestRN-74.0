import {
  gettingSuccess,
  gettingError,
  saveUserCampaignEmail,
} from '../../../states/features/campaign/campaigns.slice';
import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import {apiResponse} from '../../api/api.interface';
import campaignApiHelper from '../../api/helper/campaignApi.helper';
import {payloadType} from '../../../states/features/user/user.interface';

function* getCampaigns() {
  yield customTakeEvery(
    `${sliceName.campaignsSlice}/isGettingAction`,
    getCampaignsSaga,
  );
  yield customTakeEvery(
    `${sliceName.campaignsSlice}/refreshingAction`,
    getCampaignsSaga,
  );
  yield customTakeEvery(
    `${sliceName.campaignsSlice}/searchingAction`,
    getCampaignsSaga,
  );
  yield customTakeEvery(
    `${sliceName.campaignsSlice}/gettingMoreAction`,
    getCampaignsSaga,
  );
  yield customTakeEvery(
    `${sliceName.campaignsSlice}/getUserCampaignEmail`,
    getCampaignEmail,
  );
}

function* getCampaignsSaga(payload: payloadType): Generator {
  const result = yield customCall(
    campaignApiHelper.getCampaignList,
    payload.payload,
  );
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
function* getCampaignEmail(payload: payloadType): Generator {
  const result = yield customCall(
    campaignApiHelper.getCampaignEmail,
    payload.payload,
  );
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {body, status} = result as apiResponse;
  if (status) {
    yield customPut(saveUserCampaignEmail(body));
  } else {
    yield customPut(gettingError());
  }
}
export default function* campaignsSaga() {
  yield customSagaAll([getCampaigns()]);
}
