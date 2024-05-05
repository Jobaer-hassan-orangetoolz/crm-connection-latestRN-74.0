import {config} from '../../../../config';
import {authApiEndPoint, userApiEndPoint} from '../endpoint.api';
import {rootApi} from '../rootApi';
class userApi {
  async tryUserLogin(payload) {
    return rootApi('POST_WITHOUT_AUTH', authApiEndPoint.login, payload);
  }
  async getProfileData() {
    return rootApi('GET', userApiEndPoint.profile);
  }
  async storeFCMToken(payload) {
    const {id, token} = payload;
    return rootApi('POST', userApiEndPoint.device, {
      deviceId: id.toString(),
      deviceType: config.deviceType,
      gcmToken: token.toString(),
    });
  }
  async getTeamUser() {
    return rootApi('GET', userApiEndPoint.teamUser);
  }
  async getUserLeadSource() {
    return rootApi('GET', userApiEndPoint.userLeadSource);
  }
  async getUserVirtualNumber() {
    return rootApi('GET', userApiEndPoint.userVirtualNumber);
  }
  async getUserCustomField() {
    return rootApi('GET', userApiEndPoint.userCustomField);
  }
  async getUserTwilioAccessToken() {
    return rootApi(
      'GET',
      userApiEndPoint.userTwilioAccessToken + '?type=fcm&timeLimit=86400',
    );
  }
  async getUserStandardPersonalizedField() {
    return rootApi('GET', userApiEndPoint.userStandardPersonalizedField);
  }
  async updateProfile(payload) {
    return rootApi('PUT', userApiEndPoint.updateProfile, payload);
  }
  async getUserTags(payload) {
    const {page = 1, perPage = 10, search = '', id} = payload || {};
    const params = `?page=${page}&perPage=${perPage}&search=${search}${
      id && `&contactId=${id}`
    }`;
    return rootApi('GET', userApiEndPoint.userTagsList + params);
  }
  async updateProfileImage(fromData) {
    return rootApi(
      'POST_FROM_DATA',
      userApiEndPoint.updateProfileImage,
      fromData,
    );
  }
}
export default new userApi();
