const {CustomNetInfo} = require('./netinfo.package');

const netInfoEventListener = callback => {
  return CustomNetInfo.addEventListener(state => callback(state));
};
const hasInternetConnection = async () => {
  let flag = false;
  const {isConnected, isInternetReachable, type} = await CustomNetInfo.fetch();
  if (isConnected && isInternetReachable && type !== '' && type !== 'none') {
    flag = true;
  }
  return flag;
};
export {netInfoEventListener, hasInternetConnection};
