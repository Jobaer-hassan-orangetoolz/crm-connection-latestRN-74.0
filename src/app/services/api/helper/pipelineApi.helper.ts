import {pipelineApiEndPoint} from '../endpoint.api';
import {rootApi} from '../rootApi';

class pipelineApi {
  async getDealList(payload: {
    page?: number;
    perPage?: number;
    type?: number;
    stageId: number;
    pipelineId: number;
  }) {
    const {
      page = 1,
      perPage = 20,
      stageId = -1,
      type = 1,
      pipelineId = -1,
    } = payload || {};
    const params = `?stageId=${stageId}&pipelineId=${pipelineId}&page=${page}&perPage=${perPage}&&type=${type}`;
    return rootApi('GET', pipelineApiEndPoint.dealList + params);
  }
  async getStageList(id: number) {
    return rootApi('GET', pipelineApiEndPoint.stageList + id);
  }
  async getPipelineList() {
    return rootApi('GET', pipelineApiEndPoint.pipelineList);
  }
  async stageWin(payload: {dealId: number; contactId: number; status: number}) {
    return rootApi('PUT', pipelineApiEndPoint.stageWin, payload);
  }
  async moveDeal(payload: any) {
    return rootApi('PUT', pipelineApiEndPoint.moveDeal, payload);
  }
  async addDeal(payload: any) {
    return rootApi('POST', pipelineApiEndPoint.createDeal, payload);
  }
  async addStage(payload: any) {
    return rootApi('POST', pipelineApiEndPoint.addStage, payload);
  }
  async addPipeline(payload: any) {
    return rootApi('POST', pipelineApiEndPoint.addPipeline, payload);
  }
  async editDeal(payload: any) {
    return rootApi('PUT', pipelineApiEndPoint.editDeal, payload);
  }
  async editStage(payload: any) {
    return rootApi('PUT', pipelineApiEndPoint.editStage, payload);
  }
  async deleteDeal(payload: {
    contactId: number;
    dealId: number;
    dealValue: number;
  }) {
    const {contactId, dealId, dealValue} = payload;
    const params = `${contactId}/${dealId}/${dealValue}`;
    return rootApi('DELETE', pipelineApiEndPoint.deleteDeal + params);
  }
}
export default new pipelineApi();
