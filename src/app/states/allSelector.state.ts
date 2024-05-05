import {sliceName} from './sliceName.state';

export const authStates = (state: any) => state[sliceName.authSlice];
export const userTz = (state: any) => state[sliceName.authSlice].timezone;
export const taskStates = (state: any) => state[sliceName.taskSlice];
export const inboxStates = (state: any) => state[sliceName.inboxSlice];
export const eachMessageStates = (state: any) =>
  state[sliceName.eachMessageSlice];
export const contactsStates = (state: any) => state[sliceName.contactsSlice];
export const contactTaskStates = (state: any) =>
  state[sliceName.contactTaskSlice];
export const contactNoteStates = (state: any) =>
  state[sliceName.contactNoteSlice];
export const contactScheduleStates = (state: any) =>
  state[sliceName.contactScheduleSlice];
export const aboutContactStates = (state: any) =>
  state[sliceName.aboutContactSlice];
export const userStates = (state: any) => state[sliceName.userSlice];
export const contactDetailsStates = (state: any) =>
  state[sliceName.contactDetailsSlice];
export const inboxUnreadCount = (state: any) =>
  state[sliceName.userSlice].unreadCount;
export const userTagsStates = (state: any) => state[sliceName.userTagsSlice];
export const campaignFolderStates = (state: any) =>
  state[sliceName.campaignFolderSlice];
export const campaignsStates = (state: any) => state[sliceName.campaignsSlice];
export const dealStagesStates = (state: any) =>
  state[sliceName.dealStagesSlice];
export const pipelineStates = (state: any) => state[sliceName.pipeline];
export const dashboardStates = (state: any) => state[sliceName.dashboardSlice];
export const bottomSheetStates = (state: any) =>
  state[sliceName.bottomSheetSlice];
export const callHistoryStates = (state: any) =>
  state[sliceName.callHistorySlice];
export const quickReplyStates = (state: any) =>
  state[sliceName.quickReplySlice];
export const callStates = (state: any) => state[sliceName.callSlice];
