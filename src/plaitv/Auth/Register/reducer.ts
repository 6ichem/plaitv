import { createReducer } from "../../../store/utils";
import * as Types from "../actionTypes";

const initialState = {
  registerCredentials: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  registerData: null,
  resendData: null,
};

const registerStrategies = {
  [Types.SET_REGISTER_CREDS]: (state: any, payload: any) => {
    return {
      ...state,
      registerCredentials: payload,
    };
  },
  [Types.SET_REGISTER_DATA]: (state: any, payload: any) => {
    return {
      ...state,
      registerData: payload,
    };
  },
  [Types.POST_RESEND_MAIL]: (state: any, payload: any) => {
    return {
      ...state,
      resendData: payload,
    };
  },
  __default__: (state: any) => state,
};

export const registerState = createReducer(registerStrategies, {
  ...initialState,
});
