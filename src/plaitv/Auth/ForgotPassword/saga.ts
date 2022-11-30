import { put, call, select } from "redux-saga/effects";
import { forgotPassword } from "../../../http/api/auth";
import { ResponseGenerator } from "../../../http/types";
import { SET_FORGOT_PASS_LOADER } from "../../Dashboard/actionTypes";

import { setForgotCreds, setForgotData } from "./actions";

export function* postForgot({ payload }: any) {
  try {
    yield put({ type: SET_FORGOT_PASS_LOADER, payload: true });
    const {
      auth: {
        forgotState: { forgotCredentials },
      },
    } = yield select((state) => state);
    const { email } = forgotCredentials;

    const resp: ResponseGenerator = yield call(forgotPassword, { email });

    yield put(setForgotData(resp));
    yield put({ type: SET_FORGOT_PASS_LOADER, payload: false });
  } catch (e: any) {
    yield put({ type: SET_FORGOT_PASS_LOADER, payload: false });
    yield put(setForgotData(e?.response?.data));
  }
}
