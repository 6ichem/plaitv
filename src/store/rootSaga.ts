import { all } from "redux-saga/effects";
import { authSaga } from "../plaitv/Auth/saga";

export default function* rootSaga() {
  try {
    yield all([authSaga()]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}
