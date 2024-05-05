import {config} from '../../../config';

const frontEndUrl = config.frontEndUrl;
const backEndUrl = config.backEndUrl;

const moduleName = {
  user: '/user',
  inbox: '/inbox',
  contact: '/contact',
  campaign: '/campaign',
  task: '/task',
  pipeline: '/pipeline',
  contactBackend: '/contact',
  campaignBackend: '/campaign',
  inboxBackend: '/inbox',
  conversationBackend: '/conversation',
  dashboard: '/dashboard',
  call: '/call',
};
const appEndPoint = {
  appData: frontEndUrl + '/get-modify-content-data',
};
const authApiEndPoint = {
  login: frontEndUrl + '/login',
};
const userApiEndPoint = {
  profile: frontEndUrl + moduleName.user + '/profile',
  device: frontEndUrl + moduleName.user + '/device-token',
  teamUser: frontEndUrl + moduleName.user + '/team-list',
  userLeadSource: frontEndUrl + moduleName.user + '/contact-lead-source',
  userVirtualNumber: frontEndUrl + moduleName.user + '/virtual-number',
  userCustomField: frontEndUrl + moduleName.user + '/custom-field',
  userTwilioAccessToken: frontEndUrl + moduleName.user + '/twilio-access-token',
  userStandardPersonalizedField:
    frontEndUrl + moduleName.user + '/standard-personalized-fields',
  userTagsList: frontEndUrl + '/tag/list',
  updateProfileImage: frontEndUrl + moduleName.user + '/profile-image',
  updateProfile: frontEndUrl + moduleName.user + '/profile',
};
const inboxApiEndPoint = {
  getInboxList: backEndUrl + moduleName.inboxBackend + '/list',
  unreadCount: frontEndUrl + moduleName.inbox + '/unread-message-count',
  getContactConversation:
    backEndUrl +
    moduleName.conversationBackend +
    moduleName.inboxBackend +
    '/contact-conversation-list',
  quickReply: frontEndUrl + '/quick-reply/get-list?',
  setArchive: frontEndUrl + moduleName.inbox + '/update-archive-status',
  setImportant: frontEndUrl + moduleName.inbox + '/update-important-status',
  setRead: frontEndUrl + moduleName.inbox + '/update-read-status',
  sendSms: frontEndUrl + moduleName.inbox + '/send-sms',
  sendEmail: frontEndUrl + moduleName.inbox + '/send-email',
  sendMms: frontEndUrl + moduleName.inbox + '/send-mms',
  contactLastNumber:
    frontEndUrl + moduleName.inbox + 'get-contact-last-connection/',
};

const contactApiEndPoint = {
  contactsList: backEndUrl + moduleName.contactBackend + '/list',
  contactsDetails: frontEndUrl + moduleName.contact + '/details/',
  tagLst: frontEndUrl + moduleName.contact + '/tag-list/',
  deleteContact: frontEndUrl + moduleName.contact + '/delete/',
  campaignLists: frontEndUrl + moduleName.contact + '/campaign-count/',
  pipelineLists: frontEndUrl + moduleName.contact + '/deal-count/',
  noteList: frontEndUrl + moduleName.contact + '/contact-note-list/',
  taskList: frontEndUrl + moduleName.contact + '/contact-task-list/',
  contactTaskMarkDone:
    frontEndUrl + moduleName.contact + '/contact-task-mark-done',
  contactTaskDelete: frontEndUrl + moduleName.contact + '/delete-contact-task/',
  contactDeleteTag: frontEndUrl + moduleName.contact + '/delete-tag',
  contactAddTag: frontEndUrl + moduleName.contact + '/add-contact-tag',
  contactUpdateTask: frontEndUrl + moduleName.contact + '/edit-contact-task',
  contactAddTask: frontEndUrl + moduleName.contact + '/add-contact-task',
  contactCampaignPauseResume:
    frontEndUrl + moduleName.contact + '/campaign-contact-pause-resume',
  contactCustomFieldList:
    frontEndUrl + moduleName.contact + '/custom-field-list/',
  contactDealDelete: frontEndUrl + moduleName.contact + '/delete-contact-deal',
  contactUpdateOwner: frontEndUrl + moduleName.contact + '/lead-owner-update',
  contactUpdateSource: frontEndUrl + moduleName.contact + '/lead-source-update',
  addContact: backEndUrl + moduleName.contactBackend + '/create-new-contact',
  editContact: frontEndUrl + moduleName.contact + '/edit-contact',
  addNote: frontEndUrl + moduleName.contact + '/add-note',
};
const campaignApiEndPoint = {
  campaignsList: backEndUrl + moduleName.campaignBackend + '/list',
  campaignFolder: frontEndUrl + moduleName.campaign + '/folder',
  campaignDetails: frontEndUrl + moduleName.campaign + '/details/',
  updateCampaign: frontEndUrl + moduleName.campaign + '/update',
  addCampaign: frontEndUrl + moduleName.campaign + '/add',
  campaignContactList: frontEndUrl + moduleName.campaign + '/contact-list',
  addContactToCampaign: frontEndUrl + moduleName.campaign + '/add-contact',
  validateCampaign:
    frontEndUrl + moduleName.campaign + '/start-validation?campaignId=',
  getCampaignEmail: frontEndUrl + moduleName.campaign + '/from-email-list',
};
const taskApiEndPoint = {
  tasksList: frontEndUrl + moduleName.task + '/list',
};
const pipelineApiEndPoint = {
  pipelineList: frontEndUrl + moduleName.pipeline + '/list',
  stageList: frontEndUrl + moduleName.pipeline + '/get-stage-list?pipelineId=',
  dealList: frontEndUrl + moduleName.pipeline + '/get-deal-list',
  addPipeline: frontEndUrl + moduleName.pipeline + '/add-pipeline',
  addStage: frontEndUrl + moduleName.pipeline + '/add-stage',
  addDeal: frontEndUrl + moduleName.pipeline + '/add-deal',
  moveDeal: frontEndUrl + moduleName.pipeline + '/deal-move',
  stageWin: frontEndUrl + moduleName.pipeline + '/deal-mark-as-win-lost',
  createDeal: frontEndUrl + moduleName.pipeline + '/create-deal',
  createPipeline: frontEndUrl + moduleName.pipeline + '/add-pipeline',
  createStage: frontEndUrl + moduleName.pipeline + '/add-stage',
  editStage: frontEndUrl + moduleName.pipeline + '/edit-stage',
  editDeal: frontEndUrl + moduleName.pipeline + '/edit-deal',
  deleteDeal: frontEndUrl + moduleName.pipeline + '/delete-deal/',
};
const dashboardApiEndPoint = {
  getDealReport: frontEndUrl + moduleName.dashboard + '/get-deal-value-report',
};
const callEndPoint = {
  getCallHistory: frontEndUrl + moduleName.call + '/call-history',
};
export {
  appEndPoint,
  authApiEndPoint,
  userApiEndPoint,
  inboxApiEndPoint,
  contactApiEndPoint,
  campaignApiEndPoint,
  taskApiEndPoint,
  pipelineApiEndPoint,
  dashboardApiEndPoint,
  callEndPoint,
};
