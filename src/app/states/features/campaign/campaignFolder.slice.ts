import {customCreateSlice} from '../../../packages/redux.package';
import {commonReducers} from '../../common.reducer';
import {commonListStates} from '../../common.state';
import {sliceName} from '../../sliceName.state';

const campaignFolders = customCreateSlice({
  name: sliceName.campaignFolderSlice,
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
} = campaignFolders.actions;

export default campaignFolders.reducer;
