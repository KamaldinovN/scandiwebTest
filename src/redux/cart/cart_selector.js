export const getProducts = (state) => [...new Set(state.cart.cart.products)];
