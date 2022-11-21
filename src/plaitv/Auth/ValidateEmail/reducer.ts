import { createReducer } from "../../../store/utils";
import * as Types from "../actionTypes";

const initialState = {
  validateData: null,
};

const validateStrategies = {
  [Types.SET_VALIDATE_DATA]: (state: any, payload: any) => {
    return {
      ...state,
      validateData: payload,
    };
  },
  __default__: (state: any) => state,
};

export const validateState = createReducer(validateStrategies, {
  ...initialState,
});
