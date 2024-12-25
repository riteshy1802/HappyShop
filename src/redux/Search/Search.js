import { createSlice } from "@reduxjs/toolkit";

export const Search = createSlice({
    name:"search",
    initialState:{
        search:[]
    },
    reducers:{
        replaceSearchList : (state,action) => {
            state.search = action.payload;
        }
    }
})

export const {replaceSearchList} = Search.actions;
export default Search.reducer;