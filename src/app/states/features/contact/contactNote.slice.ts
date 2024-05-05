import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {commonReducers} from '../../common.reducer';
import {CommonState, commonListStates} from '../../common.state';
import {sliceName} from '../../sliceName.state';

const contactTaskSlice = customCreateSlice({
  name: sliceName.contactNoteSlice,
  initialState: {...commonListStates},
  reducers: {
    ...commonReducers,
    addContactNote: (state: CommonState, payload: CustomAnyAction) => {
      const {item} = payload.payload;
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
  addContactNote,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  clearAction: Function;
  addContactNote: Function;
} = contactTaskSlice.actions;

export default contactTaskSlice.reducer;
