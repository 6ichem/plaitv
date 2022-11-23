import { takeLatest, all } from "redux-saga/effects";
import * as Types from "./actionTypes";
import { postForgot } from "./ForgotPassword/saga";
import { postLogin } from "./Login/saga";
import { postRegister, postResendMail } from "./Register/saga";
import { postCheckToken, postResetPassword } from "./ResetPassword/saga";
import { postValidate } from "./ValidateEmail/saga";

function* watcher() {
  yield all([takeLatest(Types.POST_REGISTER, postRegister)]);
  yield all([takeLatest(Types.POST_LOGIN, postLogin)]);
  yield all([takeLatest(Types.POST_FORGOT, postForgot)]);
  yield all([takeLatest(Types.POST_VALIDATE, postValidate)]);
  yield all([takeLatest(Types.POST_RESEND_MAIL, postResendMail)]);
  yield all([takeLatest(Types.POST_CHECK_RESET, postCheckToken)]);
  yield all([takeLatest(Types.POST_RESET, postResetPassword)]);
}

export const authSaga = watcher;
