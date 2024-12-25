import { createSlice } from "@reduxjs/toolkit";

export const TempoState = createSlice({
    name: "tempoState",
    initialState: {
        tempoState: [],
    },
    reducers: {
        updateTempoState: (state, action) => {
            state.tempoState = action.payload;
        },
    },
});


export const {updateTempoState} = TempoState.actions;
export default TempoState.reducer;