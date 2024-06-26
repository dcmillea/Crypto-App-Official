import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currency/currencySlice";
import coinSlice from "./coin/coinSlice";
import dateSelectionSlice from "./dateSelect/dateSelectionSlice";
import compareCoinSlice from "./compareCoin/compareCoinSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      currency: currencySlice,
      currentCoin: coinSlice,
      dateSelect: dateSelectionSlice,
      compareCoins: compareCoinSlice,
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];