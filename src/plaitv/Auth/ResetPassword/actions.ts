import * as Types from "../actionTypes";

export const postReset = (payload: any) => ({
  type: Types.POST_RESET,
  payload,
});

export const setResetData = (payload: any) => ({
  type: Types.SET_RESET_DATA,
  payload,
});
