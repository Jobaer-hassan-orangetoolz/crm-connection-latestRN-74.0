import {callEndPoint} from '../endpoint.api';
import {rootApi} from '../rootApi';

class callHistoryApi {
  async getCallHistoryApi(payload) {
    return rootApi(
      'GET',
      `${callEndPoint.getCallHistory}?page=${payload.page}&perPage=${payload.perPage}`,
    );
  }
}
export default new callHistoryApi();
