import { createSlice } from "@reduxjs/toolkit";
import warning from "react-redux/es/utils/warning";

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
        (item) => item.uniqueID !== Number(payload)
      );
    },
    quantityAdd(state, { payload }) {
      let index = state.products.findIndex(
        (elem) => elem.uniqueID === Number(payload)
      );
      state.products[index].quantity += 1;
    },
    quantityDel(state, { payload }) {
      let index = state.products.findIndex(
        (elem) => elem.uniqueID === Number(payload)
      );
      state.products[index].quantity -= 1;
    },
    setActive(state, { payload }) {
      if (payload[0] === undefined) {
        return warning("It`s not from cart");
      } else {
        let indexProd = state.products.findIndex(
          // eslint-disable-next-line
          (elem) => elem.uniqueID === payload[0]
        );
        let indexAttr = state.products[indexProd]?.attributes.findIndex(
          (elem) => elem.id === payload[1]
        );
        let index = state.products[indexProd]?.attributes[
          indexAttr
        ].items.findIndex((elem) => elem.id === payload[2]);
        state.products[indexProd]?.attributes[indexAttr].items.map(
          (elem) => (elem.isActive = false)
        );
        if (state.products[indexProd]?.attributes[indexAttr]) {
          state.products[indexProd].attributes[indexAttr].items[
            index
          ].isActive = true;
        }
      }
    },
  },
});

export const { addProduct, deleteItem, quantityAdd, quantityDel, setActive } =
  cartSlice.actions;

export default cartSlice.reducer;
