import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../assets/styles/colors.style.asset';
import {customPadding} from '../assets/styles/global.style.asset';
import {customUseSafeAreaInsets} from '../packages/safeAreaContext.package';
import {customUseDispatch, customUseSelector} from '../packages/redux.package';
import {callStates} from '../states/allSelector.state';
import {typographies} from '../assets/styles/typographies.style.asset';
import _CallModel from '../services/models/_Call.model';
import {timeFormat} from '../utilities/helper.utility';
import CountDown from '../components/core/count-down/CountDown.component';
import CallFilled from '../assets/icons/CallFilled.icon.asset';
import {useCustomNavigation} from '../packages/navigation.package';
import {screens} from '../routes/routeName.route';
import {paramsP} from '../modules/call/CallPreview.module';
import {
  callDisconnectAction,
  inviteCallReject,
} from '../packages/twilio-voice/twilioVoice.helper';
import {updateCallReject} from '../states/features/call/call.slice';
import {
  addItemToList,
  refreshingAction,
} from '../states/features/call/callHistory.slice';
import {useAppProvider} from '../wrappers/app.wrapper';
const CallOverlay: React.FC<{callData?: any}> = ({callData}) => {
  const {top} = customUseSafeAreaInsets();
  const dispatch = customUseDispatch();
  const {name, status, number, type}: any = customUseSelector(callStates);
  const {inviteRef, callRef} = callData || {};
  const {toggleShowCallScreen} = useAppProvider() as any;
  const navigation = useCustomNavigation<any>();
  const statusValue = (
    Object.keys(_CallModel.status) as (keyof typeof _CallModel.status)[]
  ).find(key => _CallModel.status[key] === status);
  const handleNavigation = () => {
    navigation.navigate(screens.callPreview, {inviteRef, callRef} as paramsP);
  };
  const inviteCallRejectCallback = () => {
    dispatch(updateCallReject());
    if (inviteRef.current?._customParameters.showContactId) {
      dispatch(
        addItemToList([
          _CallModel.rejectCall({
            inviteRef: inviteRef.current,
            direction: type,
          }),
        ]),
      );
    } else {
      dispatch(refreshingAction());
    }
    inviteRef.current = null;
    callRef.current = null;
  };
  const callRejectHandler = () => {
    inviteCallReject({
      inviteRef: inviteRef,
      callback: inviteCallRejectCallback,
    });
  };
  const callDisconnectHandler = () => {
    callDisconnectAction({
      callRef: callRef,
      callback: () => {},
    });
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
    toggleShowCallScreen();
  };
  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={[style.container, {paddingTop: top + 20}]}>
      <View>
        <Text style={[typographies.bodySmallBold, {color: colors.white}]}>
          {name || number}
        </Text>
        <View style={style.leftContainer}>
          <Text style={[typographies.bodySmall, {color: colors.gray6}]}>
            {statusValue.charAt(0).toUpperCase() + statusValue.slice(1)}
          </Text>
          <Text style={[typographies.bodySmall, {color: colors.gray6}]}>
            (
            <CountDown
              className={[typographies.bodyXS, {color: colors.gray6}]}
              startValue={
                _CallModel.callTimer.callingTime +
                _CallModel.callTimer.ringingTime +
                _CallModel.callTimer.connectedTime
              }
              endValue={'__infinite__'}
              increment={1}
              callback={() => {}}
              callbackOnEveryUpdate={(value: any) => {
                switch (status) {
                  case _CallModel.status.creating:
                    _CallModel.updateTimerValue('callingTime', value);
                    return;
                  case _CallModel.status.waiting:
                  case _CallModel.status.ringing:
                    _CallModel.updateTimerValue(
                      'ringingTime',
                      value - _CallModel.callTimer.ringingTime,
                    );
                    return;
                  case _CallModel.status.connected:
                  case _CallModel.status.connecting:
                  case _CallModel.status.reconnecting:
                  case _CallModel.status.connected:
                  case _CallModel.status.reconnected:
                    _CallModel.updateTimerValue(
                      'ringingTime',
                      value -
                        (_CallModel.callTimer.ringingTime +
                          _CallModel.callTimer.callingTime),
                    );
                    return;
                }
              }}
              format={(value: any) => timeFormat(value)}
            />
            )
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={callDropHandler}
        style={[style.actionIcon, {transform: [{rotate: '133deg'}]}]}>
        <CallFilled height={16} width={16} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default CallOverlay;

const style = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray0,
    ...customPadding(12, 16, 12, 16),
    flexDirection: 'row',
  },
  leftContainer: {flexDirection: 'row', gap: 8, alignItems: 'center'},
  actionIcon: {
    height: 28,
    width: 28,
    backgroundColor: colors.error1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
