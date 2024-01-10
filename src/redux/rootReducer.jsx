import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";

const rootReducer = combineReducers({
  user: userSlice,
});

export { rootReducer };