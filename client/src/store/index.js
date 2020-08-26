import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import loading from "./reducers/loading";
import user from "./reducers/user";
import auth from "./reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      loading,
      user,
      auth,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
