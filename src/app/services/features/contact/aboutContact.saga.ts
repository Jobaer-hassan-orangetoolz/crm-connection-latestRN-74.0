import {sliceName} from '../../../states/sliceName.state';
import {
  customCall,
  customPut,
  customSagaAll,
  customTakeEvery,
} from '../../../packages/redux.package';
import {storeContactDetails} from '../../../states/features/contact/aboutContact.slice';
import {apiResponse} from '../../api/api.interface';
import contactApiHelper from '../../api/helper/contactApi.helper';
function* getAboutContact() {
  yield customTakeEvery(
    `${sliceName.aboutContactSlice}/isGettingContactTags`,
    getContactTags,
  );
  yield customTakeEvery(
    `${sliceName.aboutContactSlice}/isGettingContactPipeline`,
    getContactPipeline,
  );
  yield customTakeEvery(
    `${sliceName.aboutContactSlice}/isGettingContactCampaign`,
    getContactCampaign,
  );
  yield customTakeEvery(
    `${sliceName.aboutContactSlice}/isGettingContactCustomField`,
    getContactCustomField,
  );
  yield customTakeEvery(
    `${sliceName.aboutContactSlice}/refreshingContactDetails`,
    combinedSaga,
  );
}

function* combinedSaga(payload: any) {
  yield customSagaAll([
    customCall(getContactTags, payload),
    customCall(getContactPipeline, payload),
    customCall(getContactPipeline, payload),
    customCall(getContactCampaign, payload),
    customCall(getContactCustomField, payload),
  ]);
}
function* getContactTags(payload: any): Generator {
  const result = yield customCall(
    contactApiHelper.getContactTagsList,
    payload.payload,
  );
  if (!result) {
    yield customPut(
      storeContactDetails({
        tagLoading: false,
        refreshing: false,
        gettingTags: true,
      }),
    );
    return;
  }
  const {status, body} = (result || {}) as apiResponse;
  if (status) {
    yield customPut(
      storeContactDetails({
        tagLoading: false,
        refreshing: false,
        gettingTags: true,
        tags: body,
      }),
    );
  } else {
    yield customPut(
      storeContactDetails({tagLoading: false, refreshing: false}),
    );
  }
}
function* getContactPipeline(payload: any): Generator {
  const result = yield customCall(
    contactApiHelper.getContactPipeline,
    payload.payload,
  );
  if (!result) {
    yield customPut(
      storeContactDetails({
        pipelineLoading: false,
        refreshing: false,
        gettingPipeline: true,
      }),
    );
    return;
  }
  const {status, body} = result as apiResponse;
  if (status) {
    yield customPut(
      storeContactDetails({
        pipelineLoading: false,
        refreshing: false,
        pipeline: body,
        gettingPipeline: true,
      }),
    );
  } else {
    yield customPut(
      storeContactDetails({pipelineLoading: false, refreshing: false}),
    );
  }
}
function* getContactCampaign(payload: any): Generator {
  const result = yield customCall(
    contactApiHelper.getContactCampaign,
    payload.payload,
  );
  if (!result) {
    yield customPut(
      storeContactDetails({
        campaignsLoading: false,
        gettingCampaigns: true,
        refreshing: false,
      }),
    );
    return;
  }
  const {status, body} = (result || {}) as apiResponse;
  if (status) {
    yield customPut(
      storeContactDetails({
        campaignsLoading: false,
        gettingCampaigns: true,
        refreshing: false,
        campaigns: body,
      }),
    );
  } else {
    yield customPut(
      storeContactDetails({campaignsLoading: false, refreshing: false}),
    );
  }
}
function* getContactCustomField(payload: any): Generator {
  const result = yield customCall(
    contactApiHelper.contactCustomFieldList,
    payload.payload,
  );
  if (!result) {
    yield customPut(
      storeContactDetails({
        customFieldLoading: false,
        gettingCustomField: true,
        refreshing: false,
      }),
    );
    return;
  }
  const {status, body} = (result || {}) as apiResponse;
  if (status) {
    yield customPut(
      storeContactDetails({
        customFieldLoading: false,
        refreshing: false,
        customField: body,
        gettingCustomField: true,
      }),
    );
  } else {
    yield customPut(
      storeContactDetails({customFieldLoading: false, refreshing: false}),
    );
  }
}

export default function* aboutContactSaga() {
  yield customSagaAll([getAboutContact()]);
}
