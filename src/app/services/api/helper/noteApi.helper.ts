import {contactApiEndPoint} from '../endpoint.api';
import {rootApi} from '../rootApi';

class noteApi {
  async getNoteList(payload: {page?: number; perPage?: number; id: number}) {
    const {page = 1, perPage = 10, id = ''} = payload || {};
    const params = `${id}?page=${page}&perPage=${perPage}`;
    return rootApi('GET', contactApiEndPoint.noteList + params);
  }
}
export default new noteApi();
