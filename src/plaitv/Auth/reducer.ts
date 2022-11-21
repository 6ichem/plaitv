import { combineReducers } from "redux";
import { registerState } from "./Register/reducer";
import { loginState } from "./Login/reducer";
import { forgotState } from "./ForgotPassword/reducer";
import { validateState } from "./ValidateEmail/reducer";
import { resetState } from "./ResetPassword/reducer";

export const authReducer = combineReducers({
  registerState,
  loginState,
  forgotState,
  validateState,
  resetState,
});
