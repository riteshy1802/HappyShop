import { createSlice } from "@reduxjs/toolkit";

let savedProducts = [];

try {
    savedProducts = JSON.parse(localStorage.getItem("fetchedProducts")) || [];
} catch (error) {
    console.log(error);
}

export const ProductHome = createSlice({
    name: "allProducts",
    initialState: {
        allProducts: savedProducts
    },
    reducers: {
        updateProductsArray: (state, action) => {
            const newProducts = action.payload.filter(newProduct => 
                !state.allProducts.some(existingProduct => 
                    existingProduct.code === newProduct.code
                )
            );
            
            state.allProducts = [...state.allProducts, ...newProducts];
            localStorage.setItem("fetchedProducts", JSON.stringify(state.allProducts));
        }
    }
});

export const { updateProductsArray } = ProductHome.actions;
export default ProductHome.reducer;