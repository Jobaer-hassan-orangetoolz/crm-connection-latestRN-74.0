import {CustomAnyAction} from '../../../packages/redux.package';

export interface userSliceActions {
  saveGCMToken: Function;
  storeUnreadCount: Function;
  storeUnreadCountSuccess: Function;
  updateUnreadCount: Function;
  getTeamUser: Function;
  getTeamUserSuccess: Function;
  getUserLeadSource: Function;
  getUserLeadSourceSuccess: Function;
  getUserVirtualNumber: Function;
  getUserVirtualNumberSuccess: Function;
  getUserCustomField: Function;
  getUserCustomFieldSuccess: Function;
  storeTwilioAccessInformation: Function;
  getUserStandardPersonalized: Function;
  getUserStandardPersonalizedSuccess: Function;
  setLoadingFalse: Function;
  clearAction: Function;
}
export interface userStates {
  unreadCount: number;
  teamUser: any;
  userLeadSource: any;
  userVNs: any;
  userCustomField: any;
  readyForCall: boolean;
  defaultVN: number | any;
  twilioToken: any;
  identity: any;
  userStandardPersonalizedField: any;
  isLoading: boolean;
  vnLoading: boolean;
  defaultVNGetting: boolean;
  teamUserLoading: boolean;
}

export type payloadType = CustomAnyAction | any;
