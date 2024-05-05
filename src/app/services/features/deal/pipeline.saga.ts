import {
  gettingSuccess,
  gettingError,
} from '../../../states/features/deal/pipeline.slice';
import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import {apiResponse} from '../../api/api.interface';
import pipelineApiHelper from '../../api/helper/pipelineApi.helper';

function* getPipeline() {
  yield customTakeEvery(
    `${sliceName.pipeline}/isGettingAction`,
    getPipelineSaga,
  );
  yield customTakeEvery(
    `${sliceName.pipeline}/refreshingAction`,
    getPipelineSaga,
  );
}

function* getPipelineSaga(): Generator {
  const result = yield customCall(() => pipelineApiHelper.getPipelineList());
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
export default function* pipelineSaga() {
  yield customSagaAll([getPipeline()]);
}
