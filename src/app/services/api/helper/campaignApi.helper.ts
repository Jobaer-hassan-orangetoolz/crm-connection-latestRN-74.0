import {campaignApiEndPoint} from '../endpoint.api';
import {rootApi} from '../rootApi';

class campaignApi {
  async getCampaignList(payload: {
    page?: number;
    perPage?: number;
    search?: string;
    folder?: number;
    status?: string;
    type?: number;
  }) {
    const {
      page = 1,
      perPage = 20,
      search = '',
      folder = '',
      status = '',
      type = 1,
    } = payload || {};
    const body = {
      page,
      perPage,
      type,
      status,
      search,
      folder,
    };
    return rootApi('POST', campaignApiEndPoint.campaignsList, body);
  }
  async getCampaignFolder() {
    return rootApi('GET', campaignApiEndPoint.campaignFolder);
  }
  async getCampaignDetails(id: number = -1) {
    return rootApi('GET', campaignApiEndPoint.campaignDetails + id);
  }
  async updateCampaign(payload: any) {
    return rootApi('PUT', campaignApiEndPoint.updateCampaign, payload);
  }
  async addCampaign(payload: any) {
    return rootApi('POST', campaignApiEndPoint.addCampaign, payload);
  }
  async campaignContactList(payload: any) {
    return rootApi('GET', campaignApiEndPoint.campaignContactList + payload);
  }
  async addContactToCampaign(payload: any) {
    return rootApi('POST', campaignApiEndPoint.addContactToCampaign, payload);
  }
  async validateCampaign(payload: any) {
    return rootApi('GET', campaignApiEndPoint.validateCampaign + payload);
  }
  async getCampaignEmail(payload: any) {
    return rootApi('GET', campaignApiEndPoint.getCampaignEmail, payload);
  }
}
export default new campaignApi();
