import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage";
import logger from "redux-logger";

import cartReducer from "./cart/cart_reducer";

const cartPersistConfig = {
  key: "cart",
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = configureStore({
  reducer: {
    cart: persistReducer(cartPersistConfig, rootReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV === "development",
});

const persistor = persistStore(store);
// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };
