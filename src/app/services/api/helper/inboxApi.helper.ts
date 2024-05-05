import {inboxApiEndPoint} from '../endpoint.api';
import {rootApi} from '../rootApi';
class inboxApi {
  async getInboxUnreadCount() {
    return rootApi('GET', inboxApiEndPoint.unreadCount);
  }
  async getInboxData(payload: any) {
    return rootApi('POST', inboxApiEndPoint.getInboxList, payload);
  }
  async getConversation(payload: any) {
    return rootApi('POST', inboxApiEndPoint.getContactConversation, payload);
  }
  async getQuickReply(payload: any) {
    const url = `${inboxApiEndPoint.quickReply}type=${payload.type}&page=${payload.page}&perPage=${payload.perPage}`;
    return rootApi('GET', url);
  }
  async archiveUnarchive(payload: any) {
    return rootApi('PUT', inboxApiEndPoint.setArchive, payload);
  }
  async importantUnimportant(payload: any) {
    return rootApi('PUT', inboxApiEndPoint.setImportant, payload);
  }
  async readUnread(payload: any) {
    return rootApi('PUT', inboxApiEndPoint.setRead, payload);
  }
  async sendSms(payload: any) {
    return rootApi('POST', inboxApiEndPoint.sendSms, payload);
  }
  async sendEmail(payload: any) {
    return rootApi('POST', inboxApiEndPoint.sendEmail, payload);
  }
  async sendMms(payload: any) {
    return rootApi('POST', inboxApiEndPoint.sendMms, payload);
  }
  async contactLastNumber(contactId: number) {
    return rootApi('GET', inboxApiEndPoint.contactLastNumber, contactId);
  }
}
export default new inboxApi();
