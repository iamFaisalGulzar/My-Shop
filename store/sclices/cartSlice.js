import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      cartItems: [
        {
          cartItem: {
            title: "",
            description: "",
            price: 0,
            inStock: 0,
            imageUrl: "",
          },
          quantity: 0,
        },
      ],
      numOfItems: 0,
      totalPrice: 0,
      userId: "",
    },
  },
  reducers: {
    addItemToCart(state, { payload }) {
      console.log("payLoad: ", payload);
      state.cart.cartItems = payload.cart.cartItems;
      state.cart.numOfItems = payload.cart.numberOfItems;
      state.cart.totalPrice = payload.cart.totalPrice;
      state.cart.userId = payload.cart.userId;
    },

    unsetUserCart(state) {
      state.cart = {
        cartItems: [
          {
            cartItem: {
              title: "",
              description: "",
              price: 0,
              inStock: 0,
              imageUrl: "",
            },
            quantity: 0,
          },
        ],
        numOfItems: 0,
        totalPrice: 0,
        userId: "",
      };
    },
  },
});

export const { addItemToCart, unsetUserCart } = cartSlice.actions;
export default cartSlice;
