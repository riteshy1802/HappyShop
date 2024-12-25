import { createSlice } from "@reduxjs/toolkit";

export const CategoryBasedFetching = createSlice({
    name:"categoryBasedFetching",
    initialState:{
        categoryBasedFetching:"",
    },
    reducers:{
        updateCategoryBasedFetching:(state,action)=>{
            state.categoryBasedFetching = action.payload;
        }
    }
})

export const {updateCategoryBasedFetching} = CategoryBasedFetching.actions;
export default CategoryBasedFetching.reducer;