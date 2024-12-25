import { createSlice } from "@reduxjs/toolkit";

export const Category = createSlice({
    name:'categories',
    initialState:{
        category : [],
        allergens : [],
    },
    reducers : {
        updateCategoryIfAdded : (state, action) => {
            state.category = action.payload;
        },
        updateAllergensIfChanged : (state, action) => {
            state.allergens = action.payload
        }
    }
})

export const {updateCategoryIfAdded, updateAllergensIfChanged} = Category.actions;
export default Category.reducer;