import {customCreateSlice} from '../../../packages/redux.package';
import {sliceName} from '../../sliceName.state';
import {payloadType} from '../user/user.interface';
export interface bottomSheetInterface {
  data: any[];
  getData: boolean;
  name: string;
}
const initialState: bottomSheetInterface = {
  data: [],
  getData: false,
  name: '',
};
const contactTaskSlice = customCreateSlice({
  name: sliceName.bottomSheetSlice,
  initialState,
  reducers: {
    storeBottomSheetData: (
      state: bottomSheetInterface,
      payload: payloadType,
    ) => {
      const {data = [], name = ''} = payload.payload || {};
      state.data = data;
      state.name = name || '';
      state.getData = payload.payload ? true : false;
    },
  },
});

export const {
  storeBottomSheetData,
}: {
  storeBottomSheetData: Function;
} = contactTaskSlice.actions;

export default contactTaskSlice.reducer;
