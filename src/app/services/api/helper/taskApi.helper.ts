import {taskApiEndPoint} from '../endpoint.api';
import {rootApi} from '../rootApi';

class taskApi {
  async getTaskList(payload: {page?: number; perPage?: number; type?: string}) {
    const {page = 1, perPage = 20, type = 1} = payload || {};
    const params = `?page=${page}&perPage=${perPage}&type=${type}`;
    return rootApi('GET', taskApiEndPoint.tasksList + params);
  }
}
export default new taskApi();
