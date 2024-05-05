import {commonReducers} from './../../common.reducer';
import {CommonState, commonListStates} from './../../common.state';
import {customCreateSlice} from '../../../packages/redux.package';
import {sliceName} from '../../sliceName.state';
import {payloadType} from '../user/user.interface';
const quickReplyStates = {
  ...commonListStates,
  type: 1,
};
const quickReplySlice = customCreateSlice({
  name: sliceName.quickReplySlice,
  initialState: quickReplyStates,
  reducers: {
    ...commonReducers,
    storeType: (state: CommonState, action: payloadType) => {
      const {payload} = action;
      state.type = payload.type;
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
  storeType,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  clearAction: Function;
  storeType: Function;
} = quickReplySlice.actions;
export default quickReplySlice.reducer;
