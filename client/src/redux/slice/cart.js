import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
  },
  reducers: {
    updateCartTotalQuantity: (state, action) => {
      state.count = action.payload;
    },
    addToCart: (state, action) => {state.count = action.payload},
    subtractToCart: (state, action) => {state.count = action.payload}
  },
});

export const {
  updateCartTotalQuantity,
  addToCart,
  subtractToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
