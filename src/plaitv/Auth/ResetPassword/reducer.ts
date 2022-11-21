import { createReducer } from "../../../store/utils";
import * as Types from "../actionTypes";

const initialState = {
  isTokenValid: null,
  resetPasswordData: null,
};

const resetStrategies = {
  [Types.SET_RESET_DATA]: (state: any, payload: any) => {
    return {
      ...state,
      resetPasswordData: payload,
    };
  },
  __default__: (state: any) => state,
};

export const resetState = createReducer(resetStrategies, {
  ...initialState,
});
