import * as Types from "./actionTypes";
import { createReducer } from "../../store/utils";

const initialState = {
  credentials: {
    email: "",
    password: "",
  },
};

const loginStrategies = {
  [Types.SET_CREDS]: (state: any, payload: any) => {
    return {
      ...state,
      credentials: payload,
    };
  },
  __default__: (state: any) => state,
};

export const loginReducer = createReducer(loginStrategies, {
  ...initialState,
});
