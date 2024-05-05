class _Call {
  TIMER_CALLING = 'callingTime';
  TIMER_RINGING = 'ringingTime';
  TIMER_RECEIVE = 'connectedTime';
  callType = {
    incoming: 1, //'in',
    outgoing: 2, //'out',
    default: '',
  };
  status = {
    creating: 0,
    waiting: 1,
    ringing: 2,
    connecting: 3,
    reconnecting: 4,
    connected: 5,
    reconnected: 6,
    reject: 7,
    disconnect: 8,
    connectionFailed: 9,
    cancel: 10,
    default: 11,
  };
  callTimer = {
    callingTime: 0,
    ringingTime: 0,
    connectedTime: 0,
  };
  status_title = {
    [this.status.creating]: 'Checking permission',
    [this.status.waiting]: 'Please wait',
    [this.status.ringing]: 'Ringing',
    [this.status.connecting]: 'Connecting',
    [this.status.reconnecting]: 'Reconnecting',
    [this.status.connected]: 'Connected',
    [this.status.reconnected]: 'Reconnected',
    [this.status.reject]: 'Rejected',
    [this.status.disconnect]: 'Disconnected',
    [this.status.connectionFailed]: 'Connection Failed',
    [this.status.cancel]: 'Cancel',
    [this.status.default]: '---',
  };
  updateTimerValue = (type, value) => {
    this.callTimer[type] = value;
  };
  incrementTimer = (type, value) => {
    this.callTimer[type] = this.callTimer[type] + value;
  };
  decrementTimer = (type, value) => {
    this.callTimer[type] = this.callTimer[type] - value;
  };
  missedCall = ({inviteRef, direction}) => {
    return {
      id: null,
      callDirection: direction,
      contactId: inviteRef._customParameters.showContactId,
      firstName: inviteRef._customParameters.displayName,
      lastName: '',
      contactNumber: inviteRef._from,
      createdAt: new Date().toISOString(),
      count: 0,
      callDuration: 0,
      isMissedCall: true,
      data: inviteRef,
    };
  };
  rejectCall = ({inviteRef, direction}) => {
    return {
      id: null,
      callDirection: direction,
      contactId: inviteRef._customParameters.showContactId,
      firstName: inviteRef._customParameters.displayName,
      lastName: '',
      contactNumber: inviteRef._from,
      createdAt: new Date().toISOString(),
      count: 0,
      callDuration: 0,
      isMissedCall: false,
      data: inviteRef,
    };
  };
  disconnectCall = ({inviteRef, direction}) => {
    return {
      id: null,
      callDirection: direction,
      contactId: inviteRef._customParameters.showContactId,
      firstName: inviteRef._customParameters.displayName,
      lastName: '',
      contactNumber: inviteRef._from,
      createdAt: new Date().toISOString(),
      isMissedCall: false,
      count:
        this.callTimer.callingTime +
        this.callTimer.ringingTime +
        this.callTimer.connectedTime,
      callDuration:
        this.callTimer.callingTime +
        this.callTimer.ringingTime +
        this.callTimer.connectedTime,
      data: inviteRef,
      contact: {
        firstName: inviteRef._customParameters.displayName,
        lastName: '',
        number: inviteRef._from,
      },
    };
  };
  resetTimer = callFlag => {
    if (callFlag === this.status.default) {
      this.callTimer.connectedTime = 0;
      this.callTimer.callingTime = 0;
      this.callTimer.ringingTime = 0;
    }
  };
  modifyCallHistoryData = (data, previous) => {
    const previousData = [...previous];
    const previousDataLength = previousData.length;
    const dataLength = data.length;
    let lastData = null;

    if (previousDataLength > 0) {
      lastData = {...previousData[previousDataLength - 1]};
    }
    for (let index = 0; index < dataLength; index++) {
      const eachData = {...data[index], count: 1};
      if (lastData && lastData.contact_id === eachData.contact_id) {
        if (lastData.count) {
          lastData.count = lastData.count + 1;
        } else {
          lastData.count = 2;
        }
        previousData[previousData.length - 1] = {
          ...previousData[previousData.length - 1],
          count: lastData.count,
        };
      } else {
        lastData = {...eachData};
        previousData.push(eachData);
      }
    }
    return previousData;
  };
}
export default new _Call();
