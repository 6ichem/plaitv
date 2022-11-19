import * as Types from "./actionTypes";

export const setCredentials = (payload: any) => ({
  type: Types.SET_CREDS,
  payload,
});
