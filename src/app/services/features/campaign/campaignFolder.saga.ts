import {
  gettingSuccess,
  gettingError,
} from '../../../states/features/campaign/campaignFolder.slice';
import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import {apiResponse} from '../../api/api.interface';
import campaignApiHelper from '../../api/helper/campaignApi.helper';

function* getCampaignFolders() {
  yield customTakeEvery(
    `${sliceName.campaignFolderSlice}/isGettingAction`,
    getCampaignFoldersSaga,
  );
  yield customTakeEvery(
    `${sliceName.campaignFolderSlice}/refreshingAction`,
    getCampaignFoldersSaga,
  );
}

function* getCampaignFoldersSaga(): Generator {
  const result = yield customCall(() => campaignApiHelper.getCampaignFolder());
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
export default function* campaignFolderSaga() {
  yield customSagaAll([getCampaignFolders()]);
}
