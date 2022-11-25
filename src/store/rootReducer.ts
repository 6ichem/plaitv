import { combineReducers } from "redux";
import { authReducer } from "../plaitv/Auth/reducer";
import { modalState } from "../plaitv/Dashboard/reducer";

export default combineReducers({
  auth: authReducer,
  modal: modalState,
});
