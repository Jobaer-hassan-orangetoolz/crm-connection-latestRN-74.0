import {customSagaAll} from '../packages/redux.package';
import inboxSaga from '../services/features/inbox/inbox.saga';
import campaignFolderSaga from '../services/features/campaign/campaignFolder.saga';
import campaignsSaga from '../services/features/campaign/campaigns.saga';
import aboutContactSaga from '../services/features/contact/aboutContact.saga';
import contactDetailsSaga from '../services/features/contact/contactDetails.saga';
import contactNoteSaga from '../services/features/contact/contactNote.saga';
import contactTaskSaga from '../services/features/contact/contactTask.saga';
import contactsSaga from '../services/features/contact/contacts.saga';
import dashboardSaga from '../services/features/dashboard/dashboard.saga';
import pipelineSaga from '../services/features/deal/pipeline.saga';
import dealStagesSaga from '../services/features/deal/dealStage.saga';
import taskSaga from '../services/features/task/task.saga';
import userSaga from '../services/features/user/user.saga';
import eachMessageSaga from '../services/features/inbox/eachMessage.saga';
import userTagsSaga from '../services/features/user/userTags.saga';
import callHistorySaga from '../services/features/call/callHistory.saga';
import quickReplySaga from '../services/features/inbox/quickReply.saga';

export default function* rootSaga() {
  yield customSagaAll([
    taskSaga(),
    inboxSaga(),
    contactsSaga(),
    contactNoteSaga(),
    contactTaskSaga(),
    aboutContactSaga(),
    userSaga(),
    eachMessageSaga(),
    contactDetailsSaga(),
    userTagsSaga(),
    dashboardSaga(),
    campaignFolderSaga(),
    campaignsSaga(),
    dealStagesSaga(),
    pipelineSaga(),
    callHistorySaga(),
    quickReplySaga(),
  ]);
}
