import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { fetchAPi } from "./apis/API";
import { setupListeners } from "@reduxjs/toolkit/query";
import CartSlice from "./slices/CartSlice";
import UserSlice from "./slices/UserSlice";
import CompanySlice from "./slices/CompanySlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import LoaderSlice from "./slices/LoaderSlice";
import StateTaxSlice from "./slices/StateTaxSlice";

const persistConfig = {
  key: "rauch-root",
  storage,
  whitelist: ["user", "cart"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    cart: CartSlice,
    user: UserSlice,
    loader: LoaderSlice,
    statetax: StateTaxSlice,
    company: CompanySlice,
    [fetchAPi.reducerPath]: fetchAPi.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(fetchAPi.middleware);
  },
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
