import toast from "react-hot-toast";
import { put, call } from "redux-saga/effects";
import { createUser, resendVerificationMail } from "../../../http/api/users";
import { ResponseGenerator } from "../../../http/types";

import { setRegisterData } from "./actions";

export function* postRegister({ payload }: any) {
  try {
    const resp: ResponseGenerator = yield call(createUser, payload);

    yield put(setRegisterData(resp));

    toast.success("Signed up successfully!", {
      style: { background: "#333", color: "#fff" },
    });
  } catch (e: any) {
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
