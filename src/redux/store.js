import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";
import authReducer from "./authSlice";
import savedItemsReducer from "./savedItemsSlice";

export const store = configureStore({
  reducer: {
    cartReducer,
    productsReducer,
    authReducer,
    savedItemsReducer,
  },
});
