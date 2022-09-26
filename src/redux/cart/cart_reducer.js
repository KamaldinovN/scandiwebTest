import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct(state, { payload }) {
      if (state.products?.find((obj) => obj.name === payload.name)) {
        alert(`Already in cart`);
      } else state.products.push(payload);
    },
    deleteItem(state, { payload }) {
      state.products = state.products.filter((item) => item.id !== payload);
    },
  },
});

export const { addProduct, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
