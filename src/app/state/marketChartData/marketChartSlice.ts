import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ChartData {
  price1: number;
  price2: number;
  date: string;
}

interface ChartSlice {
    marketChartData: ChartData[];
}

const initialState: ChartSlice = {
    marketChartData: [
      {
        price1: 0,
        price2: 0,
        date: "",
      },
    ],
  };

const marketChartDataSlice = createSlice({
    name: "chartData",
    initialState,
    reducers: {
        setMarketChartData: (state = initialState, action: PayloadAction<ChartData[]>) => {
            state.marketChartData = action.payload;
        }
    },
});

export const { setMarketChartData } = marketChartDataSlice.actions;

export default marketChartDataSlice.reducer;