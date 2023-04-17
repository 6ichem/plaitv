import { combineReducers } from "redux";
import { registerState } from "./Register/reducer";
import { loginState } from "./Login/reducer";
import { forgotState } from "./ForgotPassword/reducer";
import { validateState } from "./ValidateEmail/reducer";
import { resetState } from "./ResetPassword/reducer";
import { createReducer } from "../../store/utils";
import * as Types from "./actionTypes";

const userState = {
  user: null,
};

const loginStrategies = {
  [Types.SET_USER]: (state: any, payload: any) => {
    return {
      ...state,
      user: payload,
    };
  },
  __default__: (state: any) => state,
};

export const user = createReducer(loginStrategies, {
  ...userState,
});

export const authReducer = combineReducers({
  registerState,
  loginState,
  forgotState,
  validateState,
  resetState,
  user,
});
