import { createSlice } from "@reduxjs/toolkit";

export const Barcode = createSlice({
    name:"barcode",
    initialState:{
        barcode: "" 
    },
    reducers:{
        updateBarcode:(state, action)=>{
            state.barcode = action.payload;
        }
    }
})

export const { updateBarcode } = Barcode.actions;
export default Barcode.reducer;
