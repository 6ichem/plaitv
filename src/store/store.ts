import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
  : [];

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), ...devTools)
);

sagaMiddleware.run(rootSaga);

export default store;
