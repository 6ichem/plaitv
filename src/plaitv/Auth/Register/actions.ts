import * as Types from "../actionTypes";

export const postRegister = (payload: any) => ({
  type: Types.POST_REGISTER,
  payload,
});

export const postResendMail = (payload: any) => ({
  type: Types.POST_RESEND_MAIL,
  payload,
});

export const setRegisterCreds = (payload: any) => ({
  type: Types.SET_REGISTER_CREDS,
  payload,
});

export const setRegisterData = (payload: any) => ({
  type: Types.SET_REGISTER_DATA,
  payload,
});
