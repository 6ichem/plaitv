import { takeLatest, all, call, put } from "redux-saga/effects";
import * as Types from "./actionTypes";
import { postForgot } from "./ForgotPassword/saga";
import { postLogin, postRefreshToken } from "./Login/saga";
import { postRegister, postResendMail } from "./Register/saga";
import { postCheckToken, postResetPassword } from "./ResetPassword/saga";
import { postValidate } from "./ValidateEmail/saga";
import { ResponseGenerator } from "../../http/types";
import { httpCheckToken } from "../../http/api/auth";
import { setUser } from "./Login/actions";
import { toast } from "react-hot-toast";

export function* getUser() {
  try {
    const resp: ResponseGenerator = yield call(httpCheckToken);

    localStorage.setItem("user", JSON.stringify(resp));

    yield put(setUser(resp));
  } catch (e: any) {
    toast.error(e?.response?.data?.detail, {
      style: { background: "#333", color: "#fff" },
    });
    yield put(setUser(e?.response?.data));
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("access_token_expiry");
    localStorage.removeItem("allow_nsfw");

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }
}

function* watcher() {
  yield all([takeLatest(Types.POST_REGISTER, postRegister)]);
  yield all([takeLatest(Types.POST_LOGIN, postLogin)]);
  yield all([takeLatest(Types.POST_FORGOT, postForgot)]);
  yield all([takeLatest(Types.POST_VALIDATE, postValidate)]);
  yield all([takeLatest(Types.POST_RESEND_MAIL, postResendMail)]);
  yield all([takeLatest(Types.POST_CHECK_RESET, postCheckToken)]);
  yield all([takeLatest(Types.POST_RESET, postResetPassword)]);
  yield all([takeLatest(Types.POST_REFRESH_TOKEN, postRefreshToken)]);
  yield all([takeLatest(Types.GET_USER, getUser)]);
}

export const authSaga = watcher;
