import {config} from '../../../../config';
import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import _CallModel from '../../../services/models/_Call.model';
import {sliceName} from '../../sliceName.state';

interface reducers {
  toggleKeyboard: Function;
  toggleMute: Function;
  updateIncomingInfo: Function;
  updateCallAccept: Function;
  updateCallReject: Function;
  updateOutgoingInfo: Function;
  storeCallInfo: Function;
  toggleCallStatus: Function;
  reset: Function;
  toggleShowShort: Function;
}
interface states {
  status: number;
  header: string | null;
  name: string | null;
  number: string;
  contactId: string | number;
  virtualNumberId: string | number | null;
  virtualNumber: string | number | null;
  type: string | number;
  dtmf: string | null;
  isMute: boolean;
  isHold: boolean;
  isSpeaker: boolean;
  showShort: boolean;
  showKeyboard: boolean;
  inviteInfo: any;
  callInfo: any;
}

const callStates: states = {
  status: _CallModel.status.default,
  header: config.agencyName,
  name: '',
  number: '',
  contactId: '',
  virtualNumberId: null,
  virtualNumber: null,
  type: _CallModel.callType.default,
  dtmf: '',
  isMute: false,
  isHold: false,
  isSpeaker: false,
  showShort: false,
  showKeyboard: false,
  inviteInfo: null,
  callInfo: null,
};

const callSlice = customCreateSlice({
  name: sliceName.callSlice,
  initialState: callStates,
  reducers: {
    toggleKeyboard: (state: states) => {
      state.showKeyboard = !state.showKeyboard;
    },
    toggleMute: (state: states) => {
      state.isMute = !state.isMute;
    },
    updateIncomingInfo: (state: states, payload: CustomAnyAction) => {
      const {
        payload: {contactId, name, number, inviteInfo},
      } = payload;
      state.status = _CallModel.status.ringing;
      state.type = _CallModel.callType.incoming;
      state.header = config.agencyName;
      state.contactId = contactId;
      state.name = name;
      state.number = number;
      state.inviteInfo = inviteInfo;
    },
    updateCallAccept: (state: states, payload?: CustomAnyAction) => {
      state.status = _CallModel.status.connected;
      if (payload && payload.payload) {
        state.callInfo = payload.payload;
      }
    },
    updateCallReject: (state: states) => {
      state.status = _CallModel.status.reject;
      /* TODO: may be reset call object */
    },
    updateOutgoingInfo: (state: states, payload: CustomAnyAction) => {
      const {
        payload: {contactId, name, number, from, vnId},
      } = payload;
      state.status = _CallModel.status.waiting;
      state.type = _CallModel.callType.outgoing;
      state.header = config.agencyName;
      state.contactId = contactId;
      state.name = name;
      state.number = number;
      state.virtualNumber = from;
      state.virtualNumberId = vnId;
    },
    storeCallInfo: (state: states, payload: CustomAnyAction) => {
      const {
        payload: {callRef},
      } = payload;
      state.callInfo = callRef;
    },
    toggleCallStatus: (state: states, payload: CustomAnyAction) => {
      state.status = payload.payload;
    },
    toggleShowShort: (state: states, payload: CustomAnyAction) => {
      state.showShort = payload.payload;
    },
    reset: (state: states) => {
      for (const property in callStates) {
        (state as any)[property] = (callStates as any)[property];
      }
    },
  },
});
export const {
  toggleKeyboard,
  toggleMute,
  updateIncomingInfo,
  updateCallAccept,
  updateCallReject,
  updateOutgoingInfo,
  storeCallInfo,
  toggleCallStatus,
  reset,
  toggleShowShort,
}: reducers = callSlice.actions;
export default callSlice.reducer;
