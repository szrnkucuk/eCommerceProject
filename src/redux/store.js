import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk as thunkMiddleware } from "redux-thunk";
import { createLogger } from "redux-logger";
import { clientReducer } from "./clientReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { addressReducer } from "./addressReducer";
import { orderReducer } from "./orderReducer";

const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer,
});

const logger = createLogger({ collapsed: true });

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, logger)));

export default store;
