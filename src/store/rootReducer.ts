import { combineReducers } from "redux";
import { authReducer } from "../plaitv/Auth/reducer";

export default combineReducers({
  auth: authReducer,
});
