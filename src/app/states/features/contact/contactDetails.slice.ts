import {
  CustomAnyAction,
  customCreateSlice,
} from '../../../packages/redux.package';
import {sliceName} from '../../sliceName.state';
interface selector {
  isLoading: boolean;
  data: object | null;
  refreshing: boolean;
  isGetting: boolean;
}
const initialState: selector = {
  isLoading: true,
  data: null,
  isGetting: false,
  refreshing: false,
};
const contactDetailsSlice = customCreateSlice({
  name: sliceName.contactDetailsSlice,
  initialState,
  reducers: {
    refreshingContactDetails: (state: selector) => {
      state.refreshing = true;
    },
    isGettingContactDetails: (state: selector) => {
      state.isLoading = true;
    },
    storeContactDetails: (state: selector, payload: CustomAnyAction) => {
      state.data = payload.payload;
      state.isGetting = true;
      state.isLoading = false;
      state.refreshing = false;
    },
    errorContactDetails: (state: selector) => {
      state.data = initialState.data;
      state.isGetting = true;
      state.isLoading = false;
      state.refreshing = false;
    },
    clearAction: (state: selector) => {
      for (const property in initialState) {
        (state as any)[property] = (initialState as any)[property];
      }
    },
  },
});

export const {
  refreshingContactDetails,
  isGettingContactDetails,
  storeContactDetails,
  errorContactDetails,
  clearAction,
}: {
  refreshingContactDetails: Function;
  isGettingContactDetails: Function;
  storeContactDetails: Function;
  errorContactDetails: Function;
  clearAction: Function;
} = contactDetailsSlice.actions;

export default contactDetailsSlice.reducer;
