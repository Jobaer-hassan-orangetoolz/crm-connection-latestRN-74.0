import {commonReducers} from './../../common.reducer';
import {CommonState, commonListStates} from './../../common.state';
import {customCreateSlice} from '../../../packages/redux.package';
import {sliceName} from '../../sliceName.state';
import _CallModel from '../../../services/models/_Call.model';
const callHistoryStates = {
  ...commonListStates,
  perPage: 100,
};
const callHistorySlice = customCreateSlice({
  name: sliceName.callHistorySlice,
  initialState: callHistoryStates,
  reducers: {
    ...commonReducers,
    addItemToList: (state: CommonState, payload: any) => {
      state.list = [...payload.payload, ...state.list];
    },
    gettingSuccess: (state: CommonState, action: any) => {
      const {payload} = action;
      const list = _CallModel.modifyCallHistoryData(payload, state.list);
      state.gettingMore = false;
      state.refreshing = false;
      state.isGetting = true;
      state.isLoading = false;
      state.list = [...list];
      state.page = state.page + 1;
      state.hasMore = payload.length >= state.perPage ? true : false;
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
  addItemToList,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  clearAction: Function;
  addItemToList: Function;
} = callHistorySlice.actions;
export default callHistorySlice.reducer;
