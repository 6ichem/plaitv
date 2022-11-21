import { createReducer } from "../../../store/utils";
import * as Types from "../actionTypes";

const initialState = {
  forgotCredentials: {
    email: "",
  },
  forgotData: null,
};

const forgotStrategies = {
  [Types.SET_FORGOT_CREDS]: (state: any, payload: any) => {
    return {
      ...state,
      forgotCredentials: { email: payload },
    };
  },
  [Types.SET_FORGOT_DATA]: (state: any, payload: any) => {
    return {
      ...state,
      forgotData: payload,
    };
  },
  __default__: (state: any) => state,
};

export const forgotState = createReducer(forgotStrategies, {
  ...initialState,
});
