import {dummyDataLink} from '../../dummy-data/dummyDataLink';
import {dashboardApiEndPoint} from '../endpoint.api';
import {rootApi} from '../rootApi';

class dashboardApi {
  async getDashboardActivity(payload: any) {
    const {timeFrame, userType, type} = payload || {};
    const params = `?timeFrame=${timeFrame}&userType=${userType}&type=${type}`;
    return rootApi('GET', dashboardApiEndPoint.getDealReport + params);
  }
  async getDashboardTask() {
    //     return rootApi('GET', contactApiEndPoint.contactsList + params);
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          status: true,
          body: dummyDataLink.getDashboardData.task.data,
        });
      }, 3000);
    });
    //     return rootApi('GET', contactApiEndPoint.contactsDetails + payload);
  }
}
export default new dashboardApi();
