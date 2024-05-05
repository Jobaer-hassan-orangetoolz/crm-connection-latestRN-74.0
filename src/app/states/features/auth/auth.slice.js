const {customCreateSlice} = require('../../../packages/redux.package');
const {sliceName} = require('../../sliceName.state');

const authStates = {
  userInfo: null,
  timezone: null,
};

const authSlice = customCreateSlice({
  name: sliceName.authSlice,
  initialState: authStates,
  reducers: {
    storeUserData: (state, payload) => {
      state.userInfo = payload.payload;
      state.timezone = payload.payload.timezone;
    },
    updateUserData: (state, payload) => {
      state.userInfo = payload.payload;
    },
    clearAction: state => {
      state.userInfo = authStates.userInfo;
      state.timezone = authStates.timezone;
    },
  },
});
export const {storeUserData, updateUserData, clearAction} = authSlice.actions;
export default authSlice.reducer;
