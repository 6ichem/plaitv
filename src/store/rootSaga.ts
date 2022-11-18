import { all } from "redux-saga/effects";
import { loginSaga } from "../plaitv/Login/saga";

export default function* rootSaga() {
  try {
    yield all([loginSaga()]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}
