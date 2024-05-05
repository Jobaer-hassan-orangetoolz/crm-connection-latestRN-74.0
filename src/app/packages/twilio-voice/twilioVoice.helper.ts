import {
  callActions,
  callAudioDevices,
  callEventActionInterface,
  inviteCallAcceptActionInterface,
} from '../../modules/splash/interface/call.interface';
import {updateCallAccept} from '../../states/features/call/call.slice';
import {CustomCall} from './twilioVoice.package';

/* for voice event */
const registerTwilioVoice = async (voice: any, token: any) => {
  await voice.register(token);
};
const unRegisterTwilioVoice = async (voice: any, token: any) => {
  await voice.unregister(token);
};
const handleAddEventListener = async (voice: any) => {
  voiceOnRegister(voice);
  voiceOnCallInvite(voice);
  voiceOnError(voice);
  voiceOnCallInviteAccepted(voice);
  voiceOnCallInviteRejected(voice);
  voiceOnCancelledCallInvite(voice);
};
/* for call event */
const makeCallHandler = async (
  voice: any,
  data: any,
  callRef: any,
  dispatch: any,
  {createCallRef: callRes}: any,
) => {
  const callConnectResponse = await voice.connect(data.token, {
    contactHandle: data.identity,
    params: {
      recipientType: 'client',
      To: data.to,
      From: data.from,
    },
  });
  if (callConnectResponse) {
    callRes.current.uuid = callConnectResponse._uuid;
    callRes.current.customParameters = callConnectResponse._customParameters;
    callRes.current.sid = callConnectResponse._sid;
    callRes.current.from = data.from;
    callRes.current.to = data.to;
    callRes.current.isMuted = false;
    callRes.current.isOnHold = false;
    createCallEvent({
      callConnect: callConnectResponse,
      data,
      actionType: 'out',
      callRef,
      dispatch,
    });
  } else {
    /* reset all call related states */
  }
};

const createCallEvent = ({
  callConnect: callOut,
  callInvite: callIn,
  data,
  actionType = 'in',
  dispatch,
  callRef,
}: callEventActionInterface) => {
  const newCallRes = new CustomCall({
    uuid: actionType === 'in' ? callIn._uuid : callOut._uuid,
    customParameters:
      actionType === 'in'
        ? callIn._customParameters
        : callOut._customParameters,
    from: actionType === 'in' ? callIn._from : data.from,
    sid: actionType === 'in' ? callIn._callSid : callOut._sid,
    to: actionType === 'in' ? callIn._to : data.to,
    isMuted: false,
    isOnHold: false,
  });
  if (newCallRes) {
    callRef.current = newCallRes;
    callOnRinging(newCallRes);
    callOnConnected(newCallRes, dispatch);
    callOnDisconnected(newCallRes);
    callOnConnectFailure(newCallRes);
    callOnReconnecting(newCallRes);
    callOnReconnected(newCallRes);
  } else {
    callCreateError();
  }
};

export {registerTwilioVoice, unRegisterTwilioVoice, handleAddEventListener};
export {makeCallHandler};

/* voice event */
const voiceOnRegister = async (voice: any) => {
  voice.on('registered', () => {
    console.log('device registered');
  });
};
const voiceOnCallInvite = async (voice: any) => {
  voice.on('callInvite', (callInvite: any) => {
    global.inviteCallHandler(callInvite, 'callInvite');
  });
};
const voiceOnError = async (voice: any) => {
  voice.on('error', (error: any) => {
    global.inviteCallHandler(error, 'error');
  });
};
const voiceOnCallInviteAccepted = async (voice: any) => {
  voice.on('callInviteAccepted', (callInviteAccepted: any) => {
    global.inviteCallHandler(callInviteAccepted, 'callInviteAccepted');
  });
};
const voiceOnCallInviteRejected = async (voice: any) => {
  voice.on('callInviteRejected', (callInviteRejected: any) => {
    global.inviteCallHandler(callInviteRejected, 'callInviteRejected');
  });
};
const voiceOnCancelledCallInvite = async (voice: any) => {
  voice.on('cancelledCallInvite', (cancelledCallInvite: any) => {
    global.inviteCallHandler(cancelledCallInvite, 'cancelledCallInvite');
  });
};
/* call event */
const callOnRinging = async (call: any) => {
  call.on('ringing', () => {
    global.outgoingCallHandler('', 'ringing');
  });
};
const callOnConnected = async (call: any, dispatch: any) => {
  call.on('connected', () => {
    dispatch(updateCallAccept(call));
  });
};
const callOnDisconnected = async (call: any) => {
  call.on('disconnected', () => {
    global.inviteCallHandler(call, 'disconnect');
  });
};
const callOnConnectFailure = async (call: any) => {
  call.on('connectFailure', () => {});
};
const callOnReconnecting = async (call: any) => {
  call.on('reconnecting', () => {});
};
const callOnReconnected = async (call: any) => {
  call.on('reconnected', () => {});
};
const callCreateError = async () => {};

/* action handler */
const inviteCallAccept = ({
  inviteRef,
  callRef,
  dispatch,
}: inviteCallAcceptActionInterface) => {
  if (inviteRef.current) {
    inviteRef.current.accept();
    createCallEvent({
      callInvite: inviteRef.current,
      dispatch,
      callRef,
    });
  }
};
const inviteCallReject = ({
  inviteRef,
  callback,
}: inviteCallAcceptActionInterface) => {
  if (inviteRef.current) {
    inviteRef.current.reject();
    callback();
    return;
  }
};
/*  */
const callDisconnectAction = async ({callRef, callback}: callActions) => {
  if (callRef.current) {
    await callRef.current.disconnect();
    callback();
  }
};
const muteCallAction = ({callRef, flag}: callActions) => {
  if (callRef.current) {
    callRef.current.mute(flag);
  }
};
const holdCallAction = ({callRef, flag}: callActions) => {
  if (callRef.current) {
    callRef.current.hold(flag);
  }
};
const sendDtmfAction = ({callRef, value}: callActions) => {
  if (callRef.current) {
    callRef.current.sendDigits(value);
  }
};
const speakerCallAction = ({voiceRef}: callActions) => {
  if (voiceRef) {
    voiceRef
      .getAudioDevices()
      .then(async ({audioDevices, selectedDevice}: callAudioDevices) => {
        let selectedDeviceItem = null;
        for (const item of audioDevices) {
          if (selectedDevice.type.toLowerCase() === 'speaker') {
            if (item.type.toLowerCase() === 'bluetooth') {
              selectedDeviceItem = item;
              break;
            } else {
              if (item.type.toLowerCase() !== 'speaker') {
                selectedDeviceItem = item;
              }
            }
          } else {
            if (item.type.toLowerCase() === 'speaker') {
              selectedDeviceItem = item;
              break;
            }
          }
        }
        try {
          if (selectedDeviceItem) {
            await selectedDeviceItem.select();
          }
        } catch (error: any) {
          console.log('Error selecting audio device:', error);
        }
      });
  }
};

export {
  inviteCallAccept,
  inviteCallReject,
  muteCallAction,
  sendDtmfAction,
  speakerCallAction,
  holdCallAction,
  callDisconnectAction,
  createCallEvent,
};

/*
onRinging: () => {
          dispatch(
            updateStateAction({
              callState: RINGING,
            })
          );
        },
        onConnected: () => {
          dispatch(
            updateStateAction({
              callState: CONNECTED,
            })
          );
        },
        onDisconnected: () => {
          dispatch(
            updateStateAction({
              callState: DISCONNECT,
            })
          );
          callTimer.callingTime = 0;
          callTimer.ringingTime = 0;
          callTimer.connectedTime = 0;

          setTimeout(() => {
            dispatch(
              updateStateAction({
                callState: DEFAULT,
                callScreen: CALL_SCREEN_DIALER,
              })
            );
          }, 2000);
        },
        onConnectFailure: () => {
          dispatch(
            updateStateAction({
              callState: DISCONNECT,
            })
          );
          callTimer.callingTime = 0;
          callTimer.ringingTime = 0;
          callTimer.connectedTime = 0;

          setTimeout(() => {
            dispatch(
              updateStateAction({
                callState: DEFAULT,
                callScreen: CALL_SCREEN_DIALER,
              })
            );
          }, 2000);
        },
        onReconnecting: () => {
          dispatch(
            updateStateAction({
              callState: RECONNECTING,
            })
          );
        },
        onReconnected: () => {
          dispatch(
            updateStateAction({
              callState: RECONNECTED,
            })
          );
        },
        onFailed: () => {
          dispatch(
            updateStateAction({
              callState: DISCONNECT,
            })
          );
          callTimer.callingTime = 0;
          callTimer.ringingTime = 0;
          callTimer.connectedTime = 0;

          setTimeout(() => {
            dispatch(
              updateStateAction({
                callState: DEFAULT,
                callScreen: CALL_SCREEN_DIALER,
              })
            );
          }, 2000);
        },

*/
