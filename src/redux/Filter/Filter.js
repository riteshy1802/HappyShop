import { createSlice } from "@reduxjs/toolkit";

export const Filter = createSlice({
    name:"filters",
    initialState:{
        category:"Shuffled",
        sortBy:"random",
        nutriGrade:"default",
        energy:"default",
        allergicItems:[],
    },
    reducers:{
        updateFilters:(state,action)=>{
            const {key, value} = action.payload;
            state[key] = value
        }
    }
})

export const { updateFilters } = Filter.actions;
export default Filter.reducer;