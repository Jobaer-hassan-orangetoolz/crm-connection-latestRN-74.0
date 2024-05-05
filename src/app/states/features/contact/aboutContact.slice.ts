import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {sliceName} from '../../sliceName.state';
export interface aboutContactInterface {
  tags: any;
  campaigns?: any;
  pipeline?: any;
  customField: any[];
  refreshing: boolean;
  tagLoading: boolean;
  campaignsLoading: boolean;
  pipelineLoading: boolean;
  customFieldLoading: boolean;
  gettingTags: boolean;
  gettingCampaigns: boolean;
  gettingPipeline: boolean;
  gettingCustomField: boolean;
}
const initialState: aboutContactInterface = {
  tags: [],
  campaigns: [],
  pipeline: null,
  customField: [],
  refreshing: false,
  tagLoading: true,
  campaignsLoading: true,
  pipelineLoading: true,
  customFieldLoading: false,
  gettingTags: false,
  gettingCampaigns: false,
  gettingPipeline: false,
  gettingCustomField: false,
};
const contactTaskSlice = customCreateSlice({
  name: sliceName.aboutContactSlice,
  initialState,
  reducers: {
    refreshingContactDetails: (state: aboutContactInterface) => {
      state.refreshing = true;
    },
    isGettingContactTags: (state: aboutContactInterface) => {
      state.tagLoading = true;
    },
    isGettingContactPipeline: (state: aboutContactInterface) => {
      state.pipelineLoading = true;
    },
    isGettingContactCampaign: (state: aboutContactInterface) => {
      state.campaignsLoading = true;
    },
    isGettingContactCustomField: (state: aboutContactInterface) => {
      state.customFieldLoading = true;
    },
    addCampaignToContact: (state: aboutContactInterface, payload: any) => {
      state.pipeline.unshift(payload.payload);
    },
    storeContactDetails: (
      state: aboutContactInterface,
      payload: CustomAnyAction,
    ) => {
      const result = payload.payload;
      for (const property in result) {
        (state as any)[property] = result[property];
      }
    },
    clearAction: (state: aboutContactInterface) => {
      for (const property in initialState) {
        (state as any)[property] = (initialState as any)[property];
      }
    },
  },
});

export const {
  isGettingContactTags,
  isGettingContactPipeline,
  isGettingContactCampaign,
  isGettingContactCustomField,
  storeContactDetails,
  refreshingContactDetails,
  addCampaignToContact,
  clearAction,
}: {
  isGettingContactTags: Function;
  isGettingContactPipeline: Function;
  isGettingContactCustomField: Function;
  refreshingContactDetails: Function;
  isGettingContactCampaign: Function;
  storeContactDetails: Function;
  addCampaignToContact: Function;
  clearAction: Function;
} = contactTaskSlice.actions;

export default contactTaskSlice.reducer;
