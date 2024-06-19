// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//     loading: false,
//     data: {},
//     error: '',
// }

// const globalDataSlice = createSlice({
//     name: "globalData",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchGlobalData.pending, (state) => {
//             state.loading = true
//         })
//         builder.addCase(fetchGlobalData.fulfilled, (state, action) => {
//             state.loading = false
//             state.data = action.payload
//             state.error = ''
//         })
//         builder.addCase(fetchGlobalData.rejected, (state, action) => {
//             state.loading = false
//             state.data = {},
//             state.error = "error loading data"
//         })
//     }
// })

// export const fetchGlobalData = createAsyncThunk(
//     "globalCurrencyData/fetchGlobalData",
//     async() => {
//         const options = {
//             method: "GET",
//             headers: {
//               accept: "application/json",
//               "x-cg-demo-api-key": "CG-M2orPqV361oYPRkZk1xRkWz3",
//             },
//           };
//           const response = await fetch(
//             "https://api.coingecko.com/api/v3/global",
//             options,
//           );
//           const result = await response.json();
//         const newObject = {
//             activeCoins: result.date.active_cryptocurrencies,
//             exchanges: result.date.makets,
//             marketCap24Hr: result.date.market_cap_change_percentage_24h_usd,

//         };  
//         return newObject;
//     }
// )