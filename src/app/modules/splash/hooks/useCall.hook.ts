import {useRef} from 'react';
import {PermissionsAndroid} from 'react-native';
import {CustomVoice} from '../../../packages/twilio-voice/twilioVoice.package';
import {config} from '../../../../config';
import userApiHelper from '../../../services/api/helper/userApi.helper';
import {apiResponse} from '../../../services/api/api.interface';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {storeTwilioAccessInformation} from '../../../states/features/user/user.slice';
import {
  createCallEvent,
  handleAddEventListener,
  makeCallHandler,
  registerTwilioVoice,
  speakerCallAction,
} from '../../../packages/twilio-voice/twilioVoice.helper';
import {callStates, userStates} from '../../../states/allSelector.state';
import {
  callInviteInterface,
  incomingCallActionType,
  outgoingCallActionType,
  outgoingCallData,
} from '../interface/call.interface';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {screens} from '../../../routes/routeName.route';
import {paramsP} from '../../call/CallPreview.module';
import {
  toggleCallStatus,
  toggleShowShort,
  updateCallAccept,
  updateIncomingInfo,
  updateOutgoingInfo,
} from '../../../states/features/call/call.slice';
import _CallModel from '../../../services/models/_Call.model';
import {
  addItemToList,
  refreshingAction,
} from '../../../states/features/call/callHistory.slice';
import {useAppProvider} from '../../../wrappers/app.wrapper';
import {
  isEmpty,
  showAlertWithOneAction,
} from '../../../utilities/helper.utility';
import {messages} from '../../../assets/js/messages.message';

declare global {
  var inviteCallHandler: (data: any, type: incomingCallActionType) => void;
  var speakerCall: () => void;
  var outgoingCallHandler: (
    data: outgoingCallData | any,
    type?: outgoingCallActionType,
  ) => void;
}

const useCallHook = () => {
  const dispatch = customUseDispatch();
  const navigation = useCustomNavigation<any>();
  const {twilioToken, identity}: any = customUseSelector(userStates);
  const {showShort, type: _direction}: any = customUseSelector(callStates);
  const {toggleShowCallScreen} = useAppProvider() as any;
  const voiceRef = useRef(new CustomVoice()).current;
  const inviteRef = useRef<any>(null);
  const callRef = useRef<any>(null);
  const createCallRef = useRef<object>({
    uuid: '',
    customParameters: '',
    from: '',
    sid: '',
    to: '',
    isMuted: false,
    isOnHold: false,
  });
  /* may be used ref for token, identity, from */
  /*
  remove event listener
  handle outgoing call
  handle incoming call
  handle action event: mute, speak, dtmf, hold, register, unregister
  */
  global.inviteCallHandler = (data: any, type: incomingCallActionType) =>
    incomingCall(data, type);
  const incomingCall = (
    data: callInviteInterface,
    type: incomingCallActionType,
  ) => {
    if (type === 'callInvite') {
      inviteRef.current = data;
      dispatch(
        updateIncomingInfo({
          status: _CallModel.status.ringing,
          header: config.agencyName,
          name: data._customParameters.displayName,
          number: data._from,
          contactId: data._customParameters.showContactId,
          type: _CallModel.callType.incoming,
          inviteInfo: data,
        }),
      );
      createCallEvent({
        callInvite: inviteRef.current,
        dispatch,
        callRef,
      });
      navigation.navigate(screens.callPreview, {
        inviteRef: inviteRef,
        callRef: callRef,
      } as paramsP);
      return;
    }
    if (type === 'callInviteAccepted') {
      dispatch(updateCallAccept());
      return;
    }
    if (type === 'cancelledCallInvite') {
      if (inviteRef.current?._customParameters.showContactId) {
        dispatch(
          addItemToList([
            _CallModel.missedCall({
              inviteRef: inviteRef.current,
              direction: _direction,
            }),
          ]),
        );
      } else {
        dispatch(refreshingAction());
      }
      inviteRef.current = null;
      callRef.current = null;
      if (!showShort) {
        navigation.replace(screens.callHistory);
      }
      toggleShowCallScreen();
      dispatch(toggleShowShort(false));
      return;
    }
    if (type === 'error') {
      inviteRef.current = null;
      callRef.current = null;
      if (showShort) {
        navigation.replace(screens.callKeyboard);
      }
      return;
    }
    if (type === 'disconnect') {
      if (inviteRef.current?._customParameters.showContactId) {
        dispatch(
          addItemToList([
            _CallModel.disconnectCall({
              inviteRef: inviteRef.current,
              direction: _direction,
            }),
          ]),
        );
      } else {
        dispatch(refreshingAction());
      }
      dispatch(toggleCallStatus(_CallModel.status.disconnect));
      inviteRef.current = null;
      callRef.current = null;
      toggleShowCallScreen();
      _CallModel.resetTimer(_CallModel.status.default);
      try {
        setTimeout(() => {
          if (!showShort) {
            navigation.replace(screens.callHistory);
          }
        }, 0);
      } catch (_) {}
    }
  };
  global.outgoingCallHandler = (
    data: outgoingCallData,
    type: outgoingCallActionType,
  ) => outgoingCall(data, type);
  const outgoingCall = async (
    data: outgoingCallData,
    type: outgoingCallActionType,
  ) => {
    switch (type) {
      case 'creating':
        if (isEmpty(twilioToken)) {
          return showAlertWithOneAction({
            title: messages.wentWrong,
            body: messages.setUpCallEnvError,
          });
        }
        dispatch(
          updateOutgoingInfo({
            contactId: data.contactId,
            name: data.name,
            number: data.to,
            vnId: data.vnId,
          }),
        );
        dispatch(toggleCallStatus(_CallModel.status.creating));
        await makeCallHandler(
          voiceRef,
          {
            token: twilioToken,
            identity: identity,
            to: data.to,
            from: data.from,
          },
          callRef,
          dispatch,
          {createCallRef: createCallRef},
        );
        navigation.navigate(screens.callPreview, {
          inviteRef,
          callRef: callRef,
        } as paramsP);
        return;
      default:
        dispatch(toggleCallStatus((_CallModel.status as any)[type]));
        return;
    }
  };
  const initCallEnvironment = async () => {
    const hasPer = await checkPermission();
    if (!hasPer) {
      const reqPer = await requestPermission();
      if (reqPer) {
        await serverAccessToken();
      }
    } else {
      await serverAccessToken();
    }
  };
  global.speakerCall = () => {
    speakerCallAction({voiceRef, callRef});
  };
  const checkPermission = async () => {
    try {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      return hasPermission;
    } catch (_) {
      return false;
    }
  };
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: config.title + ' App Record Permission',
          message: config.title + ' App needs record permission ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      return false;
    } catch (_) {
      return false;
    }
  };
  const serverAccessToken = async () => {
    try {
      const {status, body}: apiResponse =
        await userApiHelper.getUserTwilioAccessToken();
      if (status) {
        dispatch(
          storeTwilioAccessInformation({
            readyForCall: true,
            defaultVN: body.from,
            identity: body.identity,
            twilioToken: body.token,
          }),
        );
        await handleAddEventListener(voiceRef);
        await registerTwilioVoice(voiceRef, body.token);
      } else {
        dispatch(storeTwilioAccessInformation({readyForCall: false}));
      }
    } catch (_) {
      dispatch(storeTwilioAccessInformation({readyForCall: false}));
    }
  };

  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   global.outgoingCallHandler(
  //   //     {
  //   //       to: '16698001186',
  //   //       from: '+12109609517',
  //   //     },
  //   //     'creating',
  //   //   );
  //   // }, 5000);
  // }, []);

  return {initCallEnvironment};
};
export default useCallHook;
