import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICoinAssets {
    portfolioCoins: Array<Object>;
}

const initialState: ICoinAssets = {
    portfolioCoins: [{}],
};

const coinAssetSlice = createSlice({
    name: "portfolioCoins",
    initialState,
    reducers: {
        setPortfolioCoins: (state = initialState, action: PayloadAction<Object[]>) => {
            state.portfolioCoins = action.payload;
        }
    },
});

export const { setPortfolioCoins } = coinAssetSlice.actions;

export default coinAssetSlice.reducer;