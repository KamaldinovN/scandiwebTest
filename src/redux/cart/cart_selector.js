export const getProducts = (state) => [...new Set(state.cart.products)];
