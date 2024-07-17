import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currency/currencySlice";
import coinSlice from "./coin/coinSlice";
import dateSelectionSlice from "./dateSelect/dateSelectionSlice";
import compareCoinSlice from "./compareCoin/compareCoinSlice";
import pageSlice from "./currentPage/pageSlice";
import marketChartSlice from "./marketChartData/marketChartSlice";
import assetSlice from "./assets/assetSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      currency: currencySlice,
      currentCoin: coinSlice,
      dateSelect: dateSelectionSlice,
      compareCoins: compareCoinSlice,
      currentPage: pageSlice,
      marketChartData: marketChartSlice,
      portfolioCoins: assetSlice, 
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];