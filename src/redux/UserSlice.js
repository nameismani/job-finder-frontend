import { createSlice } from "@reduxjs/toolkit";

import { users } from "../utils/data";

const initialState = {
  user: JSON.parse(window?.localStorage.getItem("userInfo")) ?? {}//JSON.parse(window?.localStorage.getItem("userInfo")) ?? users[1],
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      console.log(action.payload.user)
      console.log(state.user)
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
      localStorage?.removeItem("userInfo");
    },
  },
});
// https://stackoverflow.com/questions/72632200/how-to-get-data-from-api-using-axios-in-redux-toolkit to upload
export default userSlice.reducer;
// export const {login,logout } = userSlice.actions
export function Login(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.login({user}));
  };
}

export function Logout() {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.logout());
  };
}