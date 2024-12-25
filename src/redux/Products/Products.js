import { createSlice } from "@reduxjs/toolkit";

export const Products = createSlice({
    name: 'product',
    initialState: {
        image_url: "",
        image_packaging_url: "",
        image_nutrition_url: "",
        image_ingredients_url: "",
        product_name_en: "",
        product_name: "",
        brands: "",
        nutriscore_grade: "",
        nova_group: "",
        code: "",
        ingredients_tags: [],
        nutriments: "",
        labels: "",
        categories: "",
        quantity: "",
        price:0,
        discount:0,
        discountedPrice:0,
        qty:0,
    },
    reducers: {
        updateProductDetails: (state, action) => {
            // console.log("Updating state with payload:", action.payload);
            Object.assign(state, action.payload);
        },
    }
});

export const { updateProductDetails } = Products.actions;
export default Products.reducer;
