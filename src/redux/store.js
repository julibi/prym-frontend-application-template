import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { signUpReducer } from "./signUp/reducer";
import { signUpMiddleware } from "./signUp/middlewares";

const middlewares = [signUpMiddleware];

const rootReducer = combineReducers({
  signUp: signUpReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
export { store };
