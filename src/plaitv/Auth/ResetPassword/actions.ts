import * as Types from "../actionTypes";

export const postReset = (payload: any) => ({
  type: Types.POST_RESET,
  payload,
});

export const postCheckToken = (payload: any) => ({
  type: Types.POST_CHECK_RESET,
  payload,
});

export const setCheckTokenData = (payload: any) => ({
  type: Types.SET_CHECK_TOKEN_DATA,
  payload,
});

export const setResetData = (payload: any) => ({
  type: Types.SET_RESET_DATA,
  payload,
});
