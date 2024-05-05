interface customParameter {
  CallerName?: string;
  displayName?: string;
  showContactId?: string | number | null;
  fromNumber?: string | number | null;
  toNumber?: string | number | null;
}
type states = 'pending' | 'accepted' | 'rejected' | string;

export type callStatus =
  | 'creating'
  | 'waiting'
  | 'ringing'
  | 'connecting'
  | 'reconnecting'
  | 'connected'
  | 'reconnected'
  | 'reject'
  | 'disconnect'
  | 'connectionFailed';

export type directionType = 'in' | 'out';

export type incomingCallActionType =
  | 'callInvite'
  | 'callInviteAccepted'
  | 'callInviteRejected'
  | 'cancelledCallInvite'
  | 'error'
  | 'registered'
  | 'undefined'
  | 'disconnect';

export type outgoingCallActionType =
  | 'creating'
  | 'ringing'
  | 'connected'
  | 'connectFailure'
  | 'reconnecting'
  | 'reconnected'
  | 'error'
  | 'undefined';

export interface outgoingCallData {
  contactId?: number | null;
  name?: string;
  to: number | string;
  from: number | string;
  vnId?: number | null;
}

export type ExtractTo<To extends string> = To extends `client:${infer User}`
  ? User
  : To;

interface incomingCall {
  _callSid: string;
  _from: string;
  _to: string;
}
interface outgoingCall {
  from: string;
  to: string;
  name: string;
}

export interface callInviteInterface extends incomingCall {
  _customParameters?: customParameter;
  _state?: states;
  _uuid?: string;
}

export interface callEventInterface {
  _sid?: string;
  _customParameters?: customParameter;
  _state?: states;
  _uuid?: string;
}
export interface callEventActionInterface {
  callConnect?: callEventInterface;
  callInvite?: callInviteInterface;
  data?: outgoingCall;
  actionType?: directionType;
  dispatch?: any;
  callRef?: any;
}
export interface inviteCallAcceptActionInterface {
  inviteRef: any;
  callRef?: any;
  dispatch?: any;
  callback?: Function;
}

export interface callHistoryItem {
  id: number | null;
  contactId: number | null;
  firstName: string | null;
  lastName: string | null;
  number: string;
  toNumber?: string | null;
  fromNumber?: string;
  direction: 'in' | 'out';
  duration: number;
  isMissedCall?: boolean;
  dateTime: string | object;
  count: number;
  isSeparator?: boolean;
  title?: string;
  value?: string;
}

export interface callActions {
  callRef?: any;
  flag?: boolean;
  value?: string | number;
  voiceRef?: any;
  callback?: Function;
}

export type callAudioDeviceType = 'earpiece' | 'speaker' | 'bluetooth';
export type callAudioDeviceName =
  | 'Speakerphone'
  | 'Earpiece'
  | 'Bluetooth'
  | string;
export type audioDevices = {
  name: callAudioDeviceName;
  type: callAudioDeviceType;
  uuid: string;
  [key: string]: any;
};

export interface callAudioDevices {
  selectedDevice: audioDevices;
  audioDevices: Array<audioDevices>;
}
