import { createReducer } from "../../../store/utils";
import * as Types from "../actionTypes";

const initialState = {
  loginCredentials: {
    username: "",
    password: "",
  },
  loginData: null,
};

const loginStrategies = {
  [Types.SET_LOGIN_CREDS]: (state: any, payload: any) => {
    return {
      ...state,
      loginCredentials: payload,
    };
  },
  [Types.SET_LOGIN_DATA]: (state: any, payload: any) => {
    return {
      ...state,
      loginData: payload,
    };
  },
  __default__: (state: any) => state,
};

export const loginState = createReducer(loginStrategies, {
  ...initialState,
});
