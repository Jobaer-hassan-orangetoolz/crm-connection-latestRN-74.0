import {
  gettingSuccess,
  gettingError,
  storeDealStats,
} from '../../../states/features/deal/dealStages.slice';
import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import {apiResponse} from '../../api/api.interface';
import {payloadType} from '../../../states/features/user/user.interface';
import pipelineApiHelper from '../../api/helper/pipelineApi.helper';
import {isEmpty} from '../../../utilities/helper.utility';

function* getDealStages() {
  yield customTakeEvery(
    `${sliceName.dealStagesSlice}/isGettingAction`,
    getDealStagesSaga,
  );
  yield customTakeEvery(
    `${sliceName.dealStagesSlice}/refreshingAction`,
    getDealStagesSaga,
  );
  yield customTakeEvery(
    `${sliceName.dealStagesSlice}/searchingAction`,
    getDealStagesSaga,
  );
}

function* getDealStagesSaga(payload: payloadType): Generator {
  const result = yield customCall(
    pipelineApiHelper.getStageList,
    payload.payload,
  );
  if (!result) {
    yield customPut(gettingError());
    return;
  }
  const {body, status} = result as apiResponse;
  if (status) {
    if (!isEmpty(body)) {
      yield customPut(gettingSuccess(body[0]));
      yield customPut(storeDealStats(body[1]));
    } else {
      yield customPut(gettingSuccess([]));
      yield customPut(storeDealStats({}));
    }
  } else {
    yield customPut(gettingError());
  }
}
export default function* dealStagesSaga() {
  yield customSagaAll([getDealStages()]);
}
