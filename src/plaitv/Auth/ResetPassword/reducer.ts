import { createReducer } from "../../../store/utils";
import * as Types from "../actionTypes";

const initialState = {
  isTokenValid: null,
  resetPasswordData: null,
  checkTokenData: null,
};

const resetStrategies = {
  [Types.SET_RESET_DATA]: (state: any, payload: any) => {
    return {
      ...state,
      resetPasswordData: payload,
    };
  },
  [Types.SET_CHECK_TOKEN_DATA]: (state: any, payload: any) => {
    return {
      ...state,
      checkTokenData: payload,
    };
  },
  __default__: (state: any) => state,
};

export const resetState = createReducer(resetStrategies, {
  ...initialState,
});
