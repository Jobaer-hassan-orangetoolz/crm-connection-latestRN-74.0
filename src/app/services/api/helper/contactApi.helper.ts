import {contactApiEndPoint} from '../endpoint.api';
import {rootApi} from '../rootApi';

class contactApi {
  async getContactList(payload: {
    page?: number;
    perPage?: number;
    search?: string;
  }) {
    const {page = 1, perPage = 20, search = ''} = payload || {};
    const params = `?page=${page}&perPage=${perPage}&search=${search}`;
    return rootApi('GET', contactApiEndPoint.contactsList + params);
  }
  async getContactDetails(payload: string) {
    return rootApi('GET', contactApiEndPoint.contactsDetails + payload);
  }
  async deleteContact(id: string) {
    return rootApi('DELETE', contactApiEndPoint.deleteContact + id);
  }
  async getContactTagsList(payload: string) {
    return rootApi('GET', contactApiEndPoint.tagLst + payload);
  }
  async getContactCampaign(payload: string) {
    return rootApi('GET', contactApiEndPoint.campaignLists + payload);
  }
  async getContactPipeline(payload: string) {
    return rootApi('GET', contactApiEndPoint.pipelineLists + payload);
  }
  async contactUpdateOwner(contactId: number, ownerId: number) {
    const payload = {
      contactId,
      ownerId,
    };
    return rootApi('PUT', contactApiEndPoint.contactUpdateOwner, payload);
  }
  async contactUpdateSource(contactId: number, sourceId: number) {
    const payload = {
      contactId,
      sourceId,
    };
    return rootApi('PUT', contactApiEndPoint.contactUpdateSource, payload);
  }
  async getContactTask(payload: {
    page?: number;
    perPage?: number;
    type?: string;
    id: number;
  }) {
    const {page = 1, perPage = 20, type = 0, id} = payload || {};
    const params = `${id}?page=${page}&perPage=${perPage}&type=${type}`;
    return rootApi('GET', contactApiEndPoint.taskList + params);
  }
  async contactTaskDone(payload: {
    taskId: number;
    contactId?: number;
    done: boolean;
  }) {
    return rootApi('POST', contactApiEndPoint.contactTaskMarkDone, payload);
  }
  async contactTaskDelete(id: number) {
    return rootApi('DELETE', contactApiEndPoint.contactTaskDelete + id);
  }
  async contactDeleteTag(payload: {tagId: number; contactId: number}) {
    const {tagId, contactId} = payload;
    const params = `?tagId=${tagId}&contactId=${contactId}`;
    return rootApi('DELETE', contactApiEndPoint.contactDeleteTag + params);
  }
  async contactAddTag(payload: {
    tagIds: number[];
    contactId: number;
    isNew?: boolean;
    title?: string;
  }) {
    return rootApi('POST', contactApiEndPoint.contactAddTag, payload);
  }
  async contactCampaignPauseResume(payload: {
    type: 'pause' | 'resume' | 'unsubscribe';
    campaignId: number;
    contactId: number;
  }) {
    return rootApi(
      'PUT',
      contactApiEndPoint.contactCampaignPauseResume,
      payload,
    );
  }
  async contactUpdateTask(payload: any) {
    return rootApi('PUT', contactApiEndPoint.contactUpdateTask, payload);
  }
  async contactAddTask(payload: any) {
    return rootApi('POST', contactApiEndPoint.contactAddTask, payload);
  }
  async contactCustomFieldList(id: number) {
    return rootApi('GET', contactApiEndPoint.contactCustomFieldList + id);
  }
  async contactDeleteDeal(dealId: number, contactId: number) {
    const params = `?contactId=${contactId}&dealId=${dealId}`;
    return rootApi('DELETE', contactApiEndPoint.contactDealDelete + params);
  }
  async contactUpdateDeal(id: number, dealId: number) {
    const params = `?id=${id}&dealId=${dealId}`;
    return rootApi('DELETE', contactApiEndPoint.contactDealDelete + params);
  }
  async addContact(payload: object) {
    return rootApi('POST', contactApiEndPoint.addContact, payload);
  }
  async editContact(payload: object) {
    return rootApi('PUT', contactApiEndPoint.editContact, payload);
  }
  async addNote(payload: {contactId: number | string; note: string}) {
    return rootApi('POST', contactApiEndPoint.addNote, payload);
  }
}
export default new contactApi();
