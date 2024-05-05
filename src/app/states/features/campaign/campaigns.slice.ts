import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {commonReducers} from '../../common.reducer';
import {CommonState, commonListStates} from '../../common.state';
import {sliceName} from '../../sliceName.state';
import {payloadType} from '../user/user.interface';

const campaignsSlice = customCreateSlice({
  name: sliceName.campaignsSlice,
  initialState: {
    ...commonListStates,
    search: '',
    folder: '',
    status: '',
    type: 1,
    emailList: [],
  },
  reducers: {
    ...commonReducers,
    storeContactSearchText: (state: CommonState, payload: CustomAnyAction) => {
      state.search = payload.payload;
    },
    storePipelineValue: (state: CommonState, payload: CustomAnyAction) => {
      state.folder = payload.payload;
    },
    updateCampaign: (state: CommonState, payload: payloadType) => {
      state.list[payload.payload.index] = payload.payload.item;
    },
    storeStatusValue: (state: CommonState, payload: CustomAnyAction) => {
      state.status = payload.payload;
    },
    getUserCampaignEmail: () => {},
    saveUserCampaignEmail: (state: CommonState, payload: CustomAnyAction) => {
      state.emailList = payload.payload;
    },
    clearAction: (state: CommonState) => {
      for (const property in commonListStates) {
        state[property] = commonListStates[property];
      }
      state.search = '';
      state.folder = '';
    },
  },
});

export const {
  isGettingAction,
  gettingSuccess,
  gettingError,
  gettingMoreAction,
  refreshingAction,
  storeContactSearchText,
  storeStatusValue,
  clearAction,
  storePipelineValue,
  searchingAction,
  updateCampaign,
  getUserCampaignEmail,
  saveUserCampaignEmail,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  storeStatusValue: Function;
  storeContactSearchText: Function;
  storePipelineValue: Function;
  searchingAction: Function;
  clearAction: Function;
  updateCampaign: Function;
  saveUserCampaignEmail: Function;
  getUserCampaignEmail: Function;
} = campaignsSlice.actions;

export default campaignsSlice.reducer;
