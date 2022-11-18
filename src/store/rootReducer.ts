import { combineReducers } from "redux";
import { loginReducer } from "../plaitv/Login/reducer";

export default combineReducers({
  login: loginReducer,
});
