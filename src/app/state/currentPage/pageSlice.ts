import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PageSlice {
    currentPage: string;
}

const initialState: PageSlice = {
    currentPage: "coinPage",
};

const pageSlice = createSlice({
    name: "currentPage",
    initialState,
    reducers: {
        setCurrentPage: (state = initialState, action: PayloadAction<string>) => {
            state.currentPage = action.payload;
        }
    },
});

export const { setCurrentPage } = pageSlice.actions;

export default pageSlice.reducer;