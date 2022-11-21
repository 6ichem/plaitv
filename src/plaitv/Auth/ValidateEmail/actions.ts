import * as Types from "../actionTypes";

export const postValidate = (payload: any) => ({
  type: Types.POST_VALIDATE,
  payload,
});

export const setValidateData = (payload: any) => ({
  type: Types.SET_VALIDATE_DATA,
  payload,
});
