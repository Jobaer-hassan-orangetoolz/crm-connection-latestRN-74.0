import React from 'react';
import Container from '../../layouts/Container.layout';
import IconWithTextHeader from '../../components/core/headers/IconWithTextHeader.app.component';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {callPreviewStyles as styles} from './styles/callPreview.style';
import {typographies} from '../../assets/styles/typographies.style.asset';
import {keypads} from '../../assets/js/dropdown.data';
import CallFilled from '../../assets/icons/CallFilled.icon.asset';
import DialerIcon from '../../assets/icons/Dialer.icon.asset';
import VoiceIcon from '../../assets/icons/Voice.icon.asset';
import {formatPhoneNumber, timeFormat} from '../../utilities/helper.utility';
import ContactImage from '../../components/app/ContactImage.app.component';
import {placeholders} from '../../assets/js/placeholders.message';
import {colors} from '../../assets/styles/colors.style.asset';
import useCallPreview from './hook/useCallPreview.hook';
import _CallModel from '../../services/models/_Call.model';
import CountDown from '../../components/core/count-down/CountDown.component';
import {muteCallAction} from '../../packages/twilio-voice/twilioVoice.helper';
import SpeakerIcon from '../../assets/icons/Speaker.icon.asset';
import {customPadding} from '../../assets/styles/global.style.asset';

export interface paramsP {
  inviteRef?: any;
  callRef?: any;
}
interface routeP {
  params?: paramsP;
}
interface callPreviewP {
  route?: routeP;
}

const CallPreview: React.FC<callPreviewP> = ({
  route: {params: {inviteRef, callRef} = {}},
}) => {
  const {
    keyPressHandler,
    header,
    showKeyboard,
    name,
    number,
    status,
    type,
    virtualNumber,
    textInputRef,
    callReceiveHandler,
    toggleKeyboardHandler,
    toggleMuteHandler,
    isMute,
    callDropHandler,
    handleLeftIcon,
    speakerOn,
    setSpeakerOn,
  } = useCallPreview({
    inviteRef,
    callRef,
  });

  const renderEachKey = (item: any, index: any) => {
    return (
      <TouchableOpacity
        style={styles.eachKey}
        onPress={() => keyPressHandler(item.toString())}
        key={index}
        activeOpacity={0.3}>
        <Text style={typographies.headingLarge}>{item}</Text>
      </TouchableOpacity>
    );
  };
  const renderStatus = () => {
    return (
      <Text style={styles.statusText}>{_CallModel.status_title[status]}</Text>
    );
  };
  return (
    <Container>
      <IconWithTextHeader
        text={header}
        controlLeftIcon={handleLeftIcon}
        rightComponent={
          status === _CallModel.status.connected ? (
            <TouchableOpacity
              activeOpacity={0.3}
              style={{...customPadding(5, 5, 5, 5)}}
              onPress={() => {
                setSpeakerOn(!speakerOn);
                global.speakerCall();
              }}>
              <SpeakerIcon fill={speakerOn ? colors.gray0 : colors.gray6} />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
      />
      <View style={styles.container}>
        <View style={[styles.infoWrp, showKeyboard ? styles.flexRow : {}]}>
          <ContactImage name={name} size="120" />
          <View style={[styles.textWrp, showKeyboard ? styles.textWrpAlt : {}]}>
            <View
              style={[styles.textCon, showKeyboard ? styles.textConAlt : {}]}>
              <Text style={typographies.headingMedium}>
                {name || placeholders.noNameFound}
              </Text>
              {status === _CallModel.callType.incoming && virtualNumber && (
                <Text style={[typographies.bodyXS, styles.vnText]}>
                  VN: {virtualNumber}
                </Text>
              )}
              <Text style={styles.number}>{formatPhoneNumber(number)}</Text>
            </View>
            {renderStatus()}
            {status !== _CallModel.status.reject &&
              status !== _CallModel.status.ringing &&
              status !== _CallModel.status.disconnect &&
              status !== _CallModel.status.connectionFailed &&
              status !== _CallModel.status.cancel &&
              status !== _CallModel.status.default && (
                <Text style={styles.statusText}>
                  <CountDown
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
                        case _CallModel.status.waiting:
                          if (type === _CallModel.callType.outgoing) {
                            _CallModel.updateTimerValue('callingTime', value);
                          }
                          return;
                        case _CallModel.status.connected:
                        case _CallModel.status.connecting:
                        case _CallModel.status.reconnecting:
                        case _CallModel.status.connected:
                        case _CallModel.status.reconnected:
                          _CallModel.updateTimerValue(
                            'connectedTime',
                            value -
                              (_CallModel.callTimer.ringingTime +
                                _CallModel.callTimer.callingTime),
                          );
                          return;
                      }
                    }}
                    format={(value: any) => timeFormat(value)}
                  />
                </Text>
              )}
            {type === _CallModel.callType.outgoing &&
              status === _CallModel.status.ringing && (
                <Text style={styles.statusText}>
                  <CountDown
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
                        case _CallModel.status.ringing:
                          _CallModel.updateTimerValue(
                            'ringingTime',
                            value - _CallModel.callTimer.callingTime,
                          );
                          return;
                      }
                    }}
                    format={(value: any) => timeFormat(value)}
                  />
                </Text>
              )}
          </View>
        </View>
        <View>
          <View
            style={[
              styles.inputWrp,
              status === _CallModel.status.connected && showKeyboard
                ? styles.visible
                : styles.notVisible,
            ]}>
            <TextInput
              editable={false}
              ref={textInputRef}
              textAlign="center"
              style={[typographies.headingLarge, styles.textInput]}
            />
          </View>
          <View
            style={[
              styles.footerWrp,
              status === _CallModel.status.connected && showKeyboard
                ? styles.elevation
                : {},
            ]}>
            <View style={styles.keyWrp}>
              {status === _CallModel.status.connected &&
                showKeyboard &&
                keypads.map((item, index) => renderEachKey(item, index))}
              {status === _CallModel.status.connected && (
                <TouchableOpacity
                  activeOpacity={0.3}
                  onPress={() => {
                    muteCallAction({callRef: callRef, flag: !isMute});
                    toggleMuteHandler();
                  }}
                  style={[
                    styles.actionIcon,
                    isMute ? styles.voiceInactive : {},
                  ]}>
                  <VoiceIcon height={24} width={24} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={callDropHandler}
                style={[
                  styles.actionIcon,
                  styles.callIconReject,
                  {transform: [{rotate: '133deg'}]},
                ]}>
                <CallFilled height={24} width={24} />
              </TouchableOpacity>
              {type === _CallModel.callType.incoming &&
                status === _CallModel.status.ringing && (
                  <TouchableOpacity
                    activeOpacity={0.3}
                    style={[styles.actionIcon, styles.callIconReceive]}
                    onPress={callReceiveHandler}>
                    <CallFilled height={24} width={24} />
                  </TouchableOpacity>
                )}
              {status === _CallModel.status.connected && (
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={[styles.actionIcon, showKeyboard && styles.activeIcon]}
                  onPress={toggleKeyboardHandler}>
                  <DialerIcon
                    height={24}
                    fill={showKeyboard ? colors.white : colors.gray0}
                    width={24}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};
export default CallPreview;
