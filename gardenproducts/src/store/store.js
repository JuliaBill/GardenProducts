import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import filterReducer from "./slices/filterSlice";
import { apiSlice } from "./slices/apiSlice";

// import cartReducer from "./slices/cartSlice";
// import likedProductsReducer from "./slices/likedProductsSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  theme: themeReducer,
  filter: filterReducer,
  // cart: cartReducer,
  // likedProducts: likedProductsReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware), 
});

export const persistor = persistStore(store);
