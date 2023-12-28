import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cart";
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
