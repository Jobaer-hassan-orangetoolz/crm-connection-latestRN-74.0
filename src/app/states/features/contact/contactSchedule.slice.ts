import {customCreateSlice} from '../../../packages/redux.package';
import {commonReducers} from '../../common.reducer';
import {commonListStates} from '../../common.state';
import {sliceName} from '../../sliceName.state';

const contactScheduleSlice = customCreateSlice({
  name: sliceName.contactScheduleSlice,
  initialState: {...commonListStates},
  reducers: {
    ...commonReducers,
  },
});

export const {
  isGettingAction,
  gettingSuccess,
  gettingError,
  gettingMoreAction,
  refreshingAction,
  clearAction,
}: {
  isGettingAction: Function;
  gettingSuccess: Function;
  gettingError: Function;
  refreshingAction: Function;
  gettingMoreAction: Function;
  clearAction: Function;
} = contactScheduleSlice.actions;

export default contactScheduleSlice.reducer;
