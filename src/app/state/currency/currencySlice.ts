import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CurrencySlice {
    currency: string;
}

const initialState: CurrencySlice = {
    currency: "usd",
};

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        changeCurrency: (state = initialState, action: PayloadAction<string>) => {
            state.currency = action.payload;
        }
    },
});

export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;