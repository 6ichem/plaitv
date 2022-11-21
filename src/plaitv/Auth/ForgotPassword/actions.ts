import * as Types from "../actionTypes";

export const postForgot = () => ({
  type: Types.POST_FORGOT,
});

export const setForgotCreds = (payload: any) => ({
  type: Types.SET_FORGOT_CREDS,
  payload,
});

export const setForgotData = (payload: any) => ({
  type: Types.SET_FORGOT_DATA,
  payload,
});
