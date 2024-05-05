import {payloadType} from './../user/user.interface';
import {commonReducers} from './../../common.reducer';
import {CommonState, commonListStates} from './../../common.state';
import {customCreateSlice} from '../../../packages/redux.package';
import {sliceName} from '../../sliceName.state';
const initialStates = {
  ...commonListStates,
};
const eachMessageSlice = customCreateSlice({
  name: sliceName.eachMessageSlice,
  initialState: initialStates,
  reducers: {
    ...commonReducers,
    storeNewMessageInConversation: (
      state: CommonState,
      payload: payloadType,
    ) => {
      const item = payload.payload;
      state.list.unshift(item);
    },
  },
});
export const {
  isGettingAction,
  gettingSuccess,
  gettingError,
  gettingMoreAction,
  refreshingAction,
  clearAction,
  storeNewMessageInConversation,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  clearAction: Function;
  storeNewMessageInConversation: Function;
} = eachMessageSlice.actions;
export default eachMessageSlice.reducer;
