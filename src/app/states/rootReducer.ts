import {customCombineReducers} from '../packages/redux.package';
import authSlice from './features/auth/auth.slice';
import inboxSlice from './features/inbox/inbox.slice';
import campaignFolderSlice from './features/campaign/campaignFolder.slice';
import campaignsSlice from './features/campaign/campaigns.slice';
import aboutContactSlice from './features/contact/aboutContact.slice';
import contactDetailsSlice from './features/contact/contactDetails.slice';
import contactNoteSlice from './features/contact/contactNote.slice';
import contactScheduleSlice from './features/contact/contactSchedule.slice';
import contactTaskSlice from './features/contact/contactTask.slice';
import contactsSlice from './features/contact/contacts.slice';
import dashboardSlice from './features/dashboard/dashboard.slice';
import dealFolderSlice from './features/deal/pipeline.slice';
import dealStagesSlice from './features/deal/dealStages.slice';
import taskSlice from './features/task/task.slice';
import userSlice from './features/user/user.slice';
import userTagsSlice from './features/user/userTags.slice';
import {sliceName} from './sliceName.state';
import eachMessageSlice from './features/inbox/eachMessage.slice';
import bottomSheetSlice from './features/bottomSheet/bottomSheet.slice';
import callHistorySlice from './features/call/callHistory.slice';
import quickReplySlice from './features/inbox/quickReply.slice';
import callSlice from './features/call/call.slice';

const rootReducer = customCombineReducers({
  [sliceName.authSlice]: authSlice,
  [sliceName.taskSlice]: taskSlice,
  [sliceName.inboxSlice]: inboxSlice,
  [sliceName.contactsSlice]: contactsSlice,
  [sliceName.contactScheduleSlice]: contactScheduleSlice,
  [sliceName.contactNoteSlice]: contactNoteSlice,
  [sliceName.contactTaskSlice]: contactTaskSlice,
  [sliceName.aboutContactSlice]: aboutContactSlice,
  [sliceName.userSlice]: userSlice,
  [sliceName.eachMessageSlice]: eachMessageSlice,
  [sliceName.contactDetailsSlice]: contactDetailsSlice,
  [sliceName.userTagsSlice]: userTagsSlice,
  [sliceName.dashboardSlice]: dashboardSlice,
  [sliceName.campaignFolderSlice]: campaignFolderSlice,
  [sliceName.campaignsSlice]: campaignsSlice,
  [sliceName.pipeline]: dealFolderSlice,
  [sliceName.dealStagesSlice]: dealStagesSlice,
  [sliceName.bottomSheetSlice]: bottomSheetSlice,
  [sliceName.callHistorySlice]: callHistorySlice,
  [sliceName.quickReplySlice]: quickReplySlice,
  [sliceName.callSlice]: callSlice,
});
export default rootReducer;
