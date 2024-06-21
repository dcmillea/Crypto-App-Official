import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IDateSelectSlice {
    date: number;
}

const initialState: IDateSelectSlice = {
    date: 1,
};

const DateSelectSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        setDateSelect: (state = initialState, action: PayloadAction<number>) => {
            state.date = action.payload;
        }
    },
});

export const { setDateSelect } = DateSelectSlice.actions;

export default DateSelectSlice.reducer;