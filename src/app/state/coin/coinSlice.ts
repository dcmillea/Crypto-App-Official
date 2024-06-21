import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CurrencySlice {
    currentCoin: string;
    currentCoinAbv: string;
    coinPrice: number;
    coinId: string;
    coinVolume: number;
}

const initialState: CurrencySlice = {
    currentCoin: "Bitcoin",
    currentCoinAbv: "BTC",
    coinPrice: 0,
    coinId: "bitcoin",
    coinVolume: 0,
};

const coinSlice = createSlice({
    name: "coin",
    initialState,
    reducers: {
        setCurrentCoin: (state, action: PayloadAction<string>) => {
            state.currentCoin = action.payload;
        },
        setCurrentCoinAbv: (state, action: PayloadAction<string>) => {
            state.currentCoinAbv = action.payload;
        },
        setCoinPrice: (state, action: PayloadAction<number>) => {
            state.coinPrice = action.payload;
        },
        setCoinId: (state, action: PayloadAction<string>) => {
            state.coinId = action.payload;
        },
        setCoinVolume: (state, action: PayloadAction<number>) => {
            state.coinPrice = action.payload;
        }
    },
});

export const { setCurrentCoin, setCurrentCoinAbv, setCoinPrice, setCoinId, setCoinVolume } = coinSlice.actions;

export default coinSlice.reducer;