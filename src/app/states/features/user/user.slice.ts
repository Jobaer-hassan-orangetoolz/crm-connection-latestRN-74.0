import {customCreateSlice} from '../../../packages/redux.package';
import {sliceName} from '../../sliceName.state';
import {payloadType, userSliceActions, userStates} from './user.interface';

const authStates: userStates = {
  unreadCount: 0,
  teamUser: [],
  userLeadSource: [],
  userVNs: [],
  userCustomField: [],
  readyForCall: false,
  defaultVN: '',
  twilioToken: '',
  identity: '',
  userStandardPersonalizedField: [],
  isLoading: false,
  defaultVNGetting: false,
  vnLoading: false,
  teamUserLoading: false,
};

const userSlice: any = customCreateSlice({
  name: sliceName.userSlice,
  initialState: authStates,
  reducers: {
    saveGCMToken: () => {},
    storeUnreadCount: () => {},
    storeUnreadCountSuccess: (state: userStates, payload: payloadType) => {
      state.isLoading = false;
      state.unreadCount = payload.payload;
    },
    updateUnreadCount: (state: userStates, payload: payloadType) => {
      state.isLoading = false;
      const newCount = (state.unreadCount += payload.payload);
      if (newCount < 0) {
        state.unreadCount = 0;
        return;
      }
      state.unreadCount = newCount;
    },
    getTeamUser: (state: userStates, payload: payloadType) => {
      state.isLoading = payload.payload ? payload.payload : false;
    },
    getTeamUserSuccess: (state: userStates, payload: payloadType) => {
      state.teamUser = payload.payload;
      state.isLoading = false;
    },
    getUserLeadSource: (state: userStates) => {
      state.teamUserLoading = true;
    },
    getUserLeadSourceSuccess: (state: userStates, payload: payloadType) => {
      state.userLeadSource = payload.payload;
      state.isLoading = false;
      state.teamUserLoading = false;
    },
    getUserVirtualNumber: (state: userStates) => {
      state.vnLoading = true;
    },
    getUserVirtualNumberSuccess: (state: userStates, payload: payloadType) => {
      state.userVNs = payload.payload;
      state.isLoading = false;
      state.vnLoading = false;
      state.defaultVNGetting = true;
    },
    getUserCustomField: (state: userStates, payload: payloadType) => {
      state.isLoading = payload.payload ? payload.payload : false;
    },
    getUserCustomFieldSuccess: (state: userStates, payload: payloadType) => {
      state.userCustomField = payload.payload;
    },
    storeTwilioAccessInformation: (state: userStates, payload: payloadType) => {
      const {payload: params} = payload;
      state.readyForCall = params.readyForCall;
      if (params.readyForCall) {
        state.defaultVN = params.defaultVN;
        state.identity = params.identity;
        state.twilioToken = params.twilioToken;
      }
      state.isLoading = false;
    },
    getUserStandardPersonalized: () => {},
    getUserStandardPersonalizedSuccess: (
      state: userStates,
      payload: payloadType,
    ) => {
      state.userStandardPersonalizedField = payload.payload;
      state.isLoading = false;
    },
    setLoadingFalse: (state: userStates) => {
      state.isLoading = false;
    },
    clearAction: (state: userStates) => {
      for (const property in authStates) {
        (state as any)[property] = (authStates as any)[property];
      }
    },
  },
});

export const {
  saveGCMToken,
  storeUnreadCount,
  storeUnreadCountSuccess,
  updateUnreadCount,
  getTeamUser,
  getTeamUserSuccess,
  getUserLeadSource,
  getUserLeadSourceSuccess,
  getUserVirtualNumber,
  getUserVirtualNumberSuccess,
  getUserCustomField,
  getUserCustomFieldSuccess,
  storeTwilioAccessInformation,
  getUserStandardPersonalized,
  getUserStandardPersonalizedSuccess,
  setLoadingFalse,
  clearAction,
}: userSliceActions = userSlice.actions;

export default userSlice.reducer;
