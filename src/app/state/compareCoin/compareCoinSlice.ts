import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CompareCoinsSlice {
    isComparingCoins: boolean;
    comparedCoins: Array<object>;
}

const initialState: CompareCoinsSlice = {
    isComparingCoins: false,
    comparedCoins: [
    {
        name: "Bitcoin",
        id: "bitcoin"
    },
    {
        name: "Ethereum",
        id: "ethereum"
    },
],
};

const comparisonSlice = createSlice({
    name: "comparison",
    initialState,
    reducers: {
        setIsComaringCoins: (state = initialState, action: PayloadAction<boolean>) => {
            state.isComparingCoins = action.payload;
        },
        setComparedCoins: (state = initialState, action: PayloadAction<object[]>) => {
            state.comparedCoins = action.payload;
        }
    },
});

export const { setIsComaringCoins, setComparedCoins } = comparisonSlice.actions;

export default comparisonSlice.reducer;