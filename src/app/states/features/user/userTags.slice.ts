import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {commonReducers} from '../../common.reducer';
import {CommonState, commonListStates} from '../../common.state';
import {sliceName} from '../../sliceName.state';

const userTagsSlice = customCreateSlice({
  name: sliceName.userTagsSlice,
  initialState: {...commonListStates, search: ''},
  reducers: {
    ...commonReducers,
    storeTagsSearchText: (state: CommonState, payload: CustomAnyAction) => {
      state.search = payload.payload;
    },
    clearAction: (state: CommonState) => {
      for (const property in commonListStates) {
        state[property] = commonListStates[property];
      }
      state.search = '';
    },
  },
});

export const {
  isGettingAction,
  gettingSuccess,
  gettingError,
  gettingMoreAction,
  refreshingAction,
  storeTagsSearchText,
  clearAction,
  searchingAction,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  storeTagsSearchText: Function;
  searchingAction: Function;
  clearAction: Function;
} = userTagsSlice.actions;

export default userTagsSlice.reducer;
