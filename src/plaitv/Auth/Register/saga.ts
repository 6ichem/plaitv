import toast from "react-hot-toast";
import { put, call } from "redux-saga/effects";
import { createUser, resendVerificationMail } from "../../../http/api/users";
import { ResponseGenerator } from "../../../http/types";
import { SET_REGISTER_LOADER } from "../../Dashboard/actionTypes";

import { setRegisterData } from "./actions";

export function* postRegister({ payload }: any) {
  try {
    yield put({ type: SET_REGISTER_LOADER, payload: true });
    const resp: ResponseGenerator = yield call(createUser, payload);

    yield put(setRegisterData(resp));

    yield put({ type: SET_REGISTER_LOADER, payload: false });

    toast.success("Signed up successfully!", {
      style: { background: "#333", color: "#fff" },
    });
  } catch (e: any) {
    yield put({ type: SET_REGISTER_LOADER, payload: false });

    toast.error(e?.response?.data, {
      style: { background: "#333", color: "#fff" },
    });
    yield put(setRegisterData(e?.response?.data));
  }
}

export function* postResendMail({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(resendVerificationMail, payload);

    yield put(setRegisterData(resp));
  } catch (e: any) {
    yield put(setRegisterData(e?.response?.data));
  }
}
