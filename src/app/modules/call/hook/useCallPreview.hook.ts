import {useEffect, useRef, useState} from 'react';
import {useCustomNavigation} from '../../../packages/navigation.package';
import {
  customUseDispatch,
  customUseSelector,
} from '../../../packages/redux.package';
import {callStates} from '../../../states/allSelector.state';
import {
  toggleKeyboard,
  toggleMute,
  updateCallReject,
  toggleShowShort,
} from '../../../states/features/call/call.slice';
import {
  callDisconnectAction,
  inviteCallAccept,
  inviteCallReject,
} from '../../../packages/twilio-voice/twilioVoice.helper';
import {
  addItemToList,
  refreshingAction,
} from '../../../states/features/call/callHistory.slice';
import _CallModel from '../../../services/models/_Call.model';
import {screens} from '../../../routes/routeName.route';
import {BackHandler} from 'react-native';
import {useAppProvider} from '../../../wrappers/app.wrapper';

const useCallPreview = ({inviteRef, callRef}: any) => {
  const {toggleShowCallScreen} = useAppProvider() as any;
  const dispatch = customUseDispatch();
  const navigation = useCustomNavigation<any>();
  const {
    showKeyboard,
    header,
    name,
    number,
    status,
    type,
    virtualNumber,
    isMute,
  }: any = customUseSelector(callStates);
  const [speakerOn, setSpeakerOn] = useState(false);
  const textInputRef = useRef<any>(null);
  const keyboardRef = useRef<string>('');
  const toggleKeyboardHandler = () => {
    dispatch(toggleKeyboard());
  };
  const toggleMuteHandler = () => {
    dispatch(toggleMute());
  };
  const callReceiveHandler = () => {
    inviteCallAccept({
      inviteRef: inviteRef,
      callRef: callRef,
      dispatch: dispatch,
    });
  };
  const callRejectHandler = () => {
    inviteCallReject({
      inviteRef: inviteRef,
      callback: inviteCallRejectCallback,
    });
  };
  const inviteCallRejectCallback = () => {
    dispatch(updateCallReject());
    if (inviteRef.current?._customParameters.showContactId) {
      dispatch(
        addItemToList([
          _CallModel.rejectCall({
            inviteRef: inviteRef.current,
            direction: _CallModel.callType.incoming,
          }),
        ]),
      );
    } else {
      dispatch(refreshingAction());
    }
    inviteRef.current = null;
    callRef.current = null;
    // navigation.navigate(screens.callHistory);
    navigation.replace(screens.callHistory);
  };
  const callDisconnectHandler = () => {
    callDisconnectAction({
      callRef: callRef,
      callback: () => {},
    });
  };
  const dtmfInputHandler = (value: string) => {
    keyboardRef.current = keyboardRef.current + value;
  };
  const keyPressHandler = (item: string) => {
    keyboardRef.current += item;
    textInputRef.current.setNativeProps({text: keyboardRef.current});
  };
  const callDropHandler = () => {
    if (type === _CallModel.callType.incoming) {
      if (status === _CallModel.status.ringing) {
        callRejectHandler();
      } else {
        callDisconnectHandler();
      }
    } else {
      callDisconnectHandler();
    }
  };
  const handleShowCall = () => {
    dispatch(toggleShowShort(true));
    const callShowShort = (duration: number) => {
      toggleShowCallScreen({
        duration,
        inviteRef,
        callRef,
      });
    };
    switch (status) {
      case _CallModel.status.creating:
        callShowShort(_CallModel.callTimer.callingTime);
        return;
      case _CallModel.status.waiting:
      case _CallModel.status.ringing:
        callShowShort(_CallModel.callTimer.ringingTime);
        return;
      case _CallModel.status.connected:
      case _CallModel.status.connecting:
      case _CallModel.status.reconnecting:
      case _CallModel.status.connected:
      case _CallModel.status.reconnected:
        callShowShort(_CallModel.callTimer.connectedTime);
        return;
    }
  };
  useEffect(() => {
    toggleShowCallScreen();
    dispatch(toggleShowShort(false));
    const backAction = () => {
      handleShowCall();
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLeftIcon = () => {
    handleShowCall();
    navigation.goBack();
  };
  return {
    header,
    showKeyboard,
    name,
    number,
    status,
    type,
    virtualNumber,
    textInputRef,
    toggleKeyboardHandler,
    toggleMuteHandler,
    callReceiveHandler,
    callRejectHandler,
    callDisconnectHandler,
    dtmfInputHandler,
    keyPressHandler,
    navigation,
    isMute,
    callDropHandler,
    handleLeftIcon,
    speakerOn,
    setSpeakerOn,
  };
};

export default useCallPreview;
