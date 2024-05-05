import {appEndPoint} from '../endpoint.api';
import {rootApi} from '../rootApi';
class appApi {
  async getAppModifyData() {
    return rootApi('GET_WITHOUT_AUTH', appEndPoint.appData);
  }
}
export default new appApi();
