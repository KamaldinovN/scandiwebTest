import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct(state, { payload }) {
      state.products.push(payload);
    },
    deleteItem(state, { payload }) {
      state.products = state.products.filter(
        // eslint-disable-next-line
        (item) => item.uniqueID != payload
      );
    },
    quantityAdd(state, { payload }) {
      // eslint-disable-next-line
      let index = state.products.findIndex((elem) => elem.uniqueID == payload);
      state.products[index].quantity += 1;
    },
    quantityDel(state, { payload }) {
      // eslint-disable-next-line
      let index = state.products.findIndex((elem) => elem.uniqueID == payload);
      state.products[index].quantity -= 1;
    },
  },
});

export const { addProduct, deleteItem, quantityAdd, quantityDel } =
  cartSlice.actions;

export default cartSlice.reducer;
