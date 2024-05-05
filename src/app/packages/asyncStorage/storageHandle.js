import {config} from '../../../config';
import {userLocalTimezone} from '../../services/models/_Timezone.modal';
import {
  getData as getDataHelper,
  getObjectData,
  removeFields,
  storeData,
  storeObjectData,
} from './asyncStorage.package';
import {
  IS_LOGGED_IN,
  IS_STORE_GCM_TOKEN,
  LOGIN_CREDENTIALS,
  TEAM_USERS,
  USER_CUSTOM_FIELD,
  USER_LEAD_SOURCE,
  USER_STANDARD_PERSONALIZED_FIELD,
  USER_TIMEZONE,
  USER_TOKEN,
  USER_VIRTUAL_NUMBER,
} from './variables';

class getLocalClass {
  async isLoggedIn() {
    const flag = await getDataHelper(IS_LOGGED_IN);
    if (flag) {
      return flag === 'true' ? true : false;
    }
    return false;
  }
  async getApiToken() {
    const token = await getDataHelper(USER_TOKEN);
    return token;
  }
  async userCredential() {
    const creds = await getObjectData(LOGIN_CREDENTIALS);
    return creds;
  }
  async gcmFlag() {
    const flag = await getDataHelper(IS_STORE_GCM_TOKEN);
    if (flag) {
      return flag === 'true' ? true : false;
    }
    return false;
  }
  async getTeamUser() {
    const jsonString = await getObjectData(TEAM_USERS);
    if (jsonString) {
      const {value, expirationDate} = jsonString;
      if (new Date().getTime() < expirationDate) {
        return value;
      } else {
        return null;
      }
    }
    return null;
  }
  async getUserLeadSource() {
    const jsonString = await getObjectData(USER_LEAD_SOURCE);
    if (jsonString) {
      const {value, expirationDate} = jsonString;
      if (new Date().getTime() < expirationDate) {
        return value;
      } else {
        return null;
      }
    }
    return null;
  }
  async getUserVirtualNumber() {
    const jsonString = await getObjectData(USER_VIRTUAL_NUMBER);
    if (jsonString) {
      const {value, expirationDate} = jsonString;
      if (new Date().getTime() < expirationDate) {
        return value;
      } else {
        return null;
      }
    }
    return null;
  }
  async getUserCustomField() {
    const jsonString = await getObjectData(USER_CUSTOM_FIELD);
    if (jsonString) {
      const {value, expirationDate} = jsonString;
      if (new Date().getTime() < expirationDate) {
        return value;
      } else {
        return null;
      }
    }
    return null;
  }
  async getUserStandardPersonalizedField() {
    const jsonString = await getObjectData(USER_STANDARD_PERSONALIZED_FIELD);
    if (jsonString) {
      const {value, expirationDate} = jsonString;
      if (new Date().getTime() < expirationDate) {
        return value;
      } else {
        return null;
      }
    }
    return null;
  }
  async getUserTimezone() {
    const value = await getDataHelper(USER_TIMEZONE);
    if (value) {
      return value;
    } else {
      return null;
    }
  }
}
class storeLocalClass {
  loggedInFlag(value) {
    storeData(IS_LOGGED_IN, value);
  }
  apiToken(value) {
    storeData(USER_TOKEN, value);
  }
  timezone(value) {
    userLocalTimezone.timezone = value;
    storeData(USER_TIMEZONE, value);
  }
  userCredential(value) {
    storeObjectData(LOGIN_CREDENTIALS, value);
  }
  storeGcmFlag(value) {
    storeData(IS_STORE_GCM_TOKEN, value);
  }
  storeTeamUser(value) {
    const expirationDate =
      new Date().getTime() + config.localStorageDay * 24 * 60 * 60 * 1000;
    const dataToStore = {value, expirationDate};
    storeObjectData(TEAM_USERS, dataToStore);
  }
  storeUserLeadSource(value) {
    const expirationDate =
      new Date().getTime() + config.localStorageDay * 24 * 60 * 60 * 1000;
    const dataToStore = {value, expirationDate};
    storeObjectData(USER_LEAD_SOURCE, dataToStore);
  }
  storeUserVirtualNumber(value) {
    const expirationDate =
      new Date().getTime() + config.localStorageDay * 24 * 60 * 60 * 1000;
    const dataToStore = {value, expirationDate};
    storeObjectData(USER_VIRTUAL_NUMBER, dataToStore);
  }
  storeUserCustomField(value) {
    const expirationDate =
      new Date().getTime() + config.localStorageDay * 24 * 60 * 60 * 1000;
    const dataToStore = {value, expirationDate};
    storeObjectData(USER_CUSTOM_FIELD, dataToStore);
  }
  storeUserStandardPersonalizedField(value) {
    const expirationDate =
      new Date().getTime() + config.localStorageDay * 24 * 60 * 60 * 1000;
    const dataToStore = {value, expirationDate};
    storeObjectData(USER_STANDARD_PERSONALIZED_FIELD, dataToStore);
  }
}
class removeLocalStorage {
  async removeCacheForLogout() {
    await removeFields([
      IS_LOGGED_IN,
      IS_STORE_GCM_TOKEN,
      USER_CUSTOM_FIELD,
      USER_STANDARD_PERSONALIZED_FIELD,
      USER_TIMEZONE,
      USER_TOKEN,
      USER_VIRTUAL_NUMBER,
    ]);
  }
  async removeCache(field) {
    await removeFields([field]);
  }
}
const getLocalData = new getLocalClass();
const storeLocalData = new storeLocalClass();
const removeLocalData = new removeLocalStorage();

export {getLocalData, storeLocalData, removeLocalData};
