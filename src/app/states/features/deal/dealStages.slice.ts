import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {commonReducers} from '../../common.reducer';
import {CommonState, commonListStates} from '../../common.state';
import {sliceName} from '../../sliceName.state';
import {payloadType} from '../user/user.interface';

const dealStagesSlice = customCreateSlice({
  name: sliceName.dealStagesSlice,
  initialState: {
    ...commonListStates,
    dealStats: {},
    pipeline: {},
    isLoading: true,
  },
  reducers: {
    ...commonReducers,
    storeDealStats: (state: CommonState, payload: CustomAnyAction) => {
      state.dealStats = payload.payload;
    },
    storePipelineValue: (state: CommonState, payload: CustomAnyAction) => {
      state.pipeline = payload.payload;
    },
    updateDealStage: (state: CommonState, payload: payloadType) => {
      const {index = -1, item = {}} = payload.payload;
      if (index === 0 && index) {
        state.list[index] = item;
        return;
      } else {
        const findItem = state.list.find((_item: any) => {
          return _item.id === item.id;
        });
        const indexOf = state.list.indexOf(findItem);
        state.list[indexOf] = item;
      }
    },

    clearAction: (state: CommonState) => {
      for (const property in commonListStates) {
        state[property] = commonListStates[property];
      }
      state.search = '';
      state.folder = '';
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
  searchingAction,
  storePipelineValue,
  updateDealStage,
  storeDealStats,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  storePipelineValue: Function;
  searchingAction: Function;
  clearAction: Function;
  updateDealStage: Function;
  storeDealStats: Function;
} = dealStagesSlice.actions;

export default dealStagesSlice.reducer;
