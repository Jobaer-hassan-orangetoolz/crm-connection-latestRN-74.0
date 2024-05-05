const {PermissionsAndroid} = require('react-native');

/* permission */
const hasPermission = async () => {
  return await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
};

const notificationPermission = async () => {
  try {
    const hasPermissionFlag = await hasPermission();
    if (hasPermissionFlag) {
      return true;
    }
    const permissionResponse = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return permissionResponse === PermissionsAndroid.RESULTS.GRANTED;
  } catch (_) {
    return false;
  }
};
/* permission */

export {hasPermission, notificationPermission};
