import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

export const Cart = createSlice({
    name: "cart",
    initialState: {
        cart: savedCart,
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.cart.find(item => item.code == product.code);
            if (existingProduct) {
                existingProduct.qty += 1;
            } else {
                state.cart.push({ ...product, qty: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        decreaseCount: (state, action) => {
            const product = action.payload;
            const existingProduct = state.cart.find(item => item.code == product.code);
            if (existingProduct.qty === 1) {
                state.cart = state.cart.filter(item => item.code != product.code);
            } else {
                existingProduct.qty -= 1;
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        removeFromCart: (state, action) => {
            const product = action.payload;
            state.cart = state.cart.filter(item => item.code != product.code);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
    },
});

export const { addToCart, decreaseCount, removeFromCart } = Cart.actions;
export default Cart.reducer;
