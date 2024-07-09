"use client";
import React from "react";
import { useEffect, useState } from "react";

// Time formatting imports
import { format } from "date-fns";

// Redux
import { RootState } from "../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { setCoinPrice, setCoinVolume } from "@/app/state/coin/coinSlice";

import ChartContent from "../charts/Chart";
import VolumeChart from "../charts/volumeChart";

interface IPriceBigData {
  data: {
    price1: number;
    price2: number;
    date: string;
  }[];
}

interface IVolumeBigData {
  data: {
    volume1: number;
    volume2: number;
    date: string;
  }[];
}

interface IVolData {
  volume: number;
}

interface IPriceData {
  price: number;
}

interface IDateData {
  date: string;
}

const ChartContainer = () => {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const currentCoin = useSelector(
    (state: RootState) => state.currentCoin.currentCoin,
  );

  const dateSelect = useSelector((state: RootState) => state.dateSelect.date);
  const isComparing = useSelector(
    (state: RootState) => state.compareCoins.isComparingCoins,
  );
  const comparedCoinsArr = useSelector(
    (state: RootState) => state.compareCoins.comparedCoins,
  );
  const coinId = useSelector((state: RootState) => state.currentCoin.coinId);
  const dispatch = useDispatch();

  const [priceDataSet, setPriceDataSet] = useState<IPriceBigData>({
    data: [
      { price1: 0, price2: 0, date: "" }, // Initial data structure
    ],
  });
  const [volumeDataSet, setVolumeDataSet] = useState<IVolumeBigData>({
    data: [
      { volume1: 0, volume2: 0, date: "" }, // Initial data structure
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-M2orPqV361oYPRkZk1xRkWz3",
          mode: "no-cors",
        },
      };
      if (isComparing) {
        const lowerCaseCurrency = currency.toLowerCase();
        const volPlaceHolderArr: IVolData[] = [];
        const pricePlaceHolderArr: IPriceData[] = [];
        const datePlaceHolderArr: IDateData[] = [];
        // fetch the data for the first option
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${(comparedCoinsArr[0] as { id: string }).id}/market_chart?vs_currency=${lowerCaseCurrency}&days=${dateSelect}`,
          options,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        for (let i = 0; i < data.prices.length; i++) {
          const date = format(new Date(data.prices[i][0]), "MMM do");
          const itemVol = {
            volume: data.total_volumes[i][1],
          };
          const itemPrice = {
            price: data.prices[i][1],
          };
          const itemDate = {
            date: date,
          };
          datePlaceHolderArr.push(itemDate);
          volPlaceHolderArr.push(itemVol);
          pricePlaceHolderArr.push(itemPrice);
        }
        const volPlaceHolderArr2: IVolData[] = [];
        const pricePlaceHolderArr2: IPriceData[] = [];
        const datePlaceHolderArr2: IDateData[] = [];
        const response2 = await fetch(
          `https://api.coingecko.com/api/v3/coins/${(comparedCoinsArr[1] as { id: string }).id}/market_chart?vs_currency=${lowerCaseCurrency}&days=${dateSelect}`,
          options,
        );
        if (!response2.ok) {
          throw new Error("Failed to fetch data");
        }
        const data2 = await response2.json();
        for (let i = 0; i < data2.prices.length; i++) {
          const date = format(new Date(data2.prices[i][0]), "MMM do");
          const itemVol = {
            volume: data2.total_volumes[i][1],
          };
          const itemPrice = {
            price: data2.prices[i][1],
          };
          const itemDate = {
            date: date,
          };
          volPlaceHolderArr2.push(itemVol);
          pricePlaceHolderArr2.push(itemPrice);
          datePlaceHolderArr2.push(itemDate);
        }
        const finalPriceList: {
          price1: number;
          price2: number;
          date: string;
        }[] = [];
        for (let i = 0; i < pricePlaceHolderArr.length; i++) {
          let price2 = 0;
          const price1 = pricePlaceHolderArr[i].price;
          if (pricePlaceHolderArr2[i]) {
            price2 = pricePlaceHolderArr2[i].price;
          } else {
            price2 = 0;
          }
          const date = datePlaceHolderArr[i].date;

          finalPriceList.push({
            price1: price1,
            price2: price2,
            date: date,
          });
        }
        setPriceDataSet({
          data: finalPriceList,
        });
        const finalVolumeList: {
          volume1: number;
          volume2: number;
          date: string;
        }[] = [];
        for (let i = 0; i < volPlaceHolderArr.length; i++) {
          let volume2 = 0;
          const volume1 = volPlaceHolderArr[i].volume;
          if (volPlaceHolderArr2[i]) {
            volume2 = volPlaceHolderArr2[i].volume;
          } else {
            volume2 = 0;
          }
          const date = datePlaceHolderArr2[i].date;

          finalVolumeList.push({
            volume1: volume1,
            volume2: volume2,
            date: date,
          });
        }
        setVolumeDataSet({
          data: finalVolumeList,
        });
        // fetch the data for the second option
      } else {
        const lowerCaseCoin = coinId.toLowerCase();
        const lowerCaseCurrency = currency.toLowerCase();
        const volPlaceHolderArr: IVolData[] = [];
        const pricePlaceHolderArr: IPriceData[] = [];
        const datePlaceHolderArr: IDateData[] = [];
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${lowerCaseCoin}/market_chart?vs_currency=${lowerCaseCurrency}&days=${dateSelect}`,
          options,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        for (let i = 0; i < data.prices.length; i++) {
          const date = format(new Date(data.prices[i][0]), "MMM do");
          const itemVol = {
            volume: data.total_volumes[i][1],
          };
          const itemPrice = {
            price: data.prices[i][1],
          };
          const itemDate = {
            date: date,
          };
          datePlaceHolderArr.push(itemDate);
          volPlaceHolderArr.push(itemVol);
          pricePlaceHolderArr.push(itemPrice);
        }
        dispatch(
          setCoinPrice(
            pricePlaceHolderArr[pricePlaceHolderArr.length - 1].price,
          ),
        );
        dispatch(
          setCoinVolume(volPlaceHolderArr[volPlaceHolderArr.length - 1].volume),
        );
        const finalPriceList: {
          price1: number;
          price2: number;
          date: string;
        }[] = [];
        for (let i = 0; i < pricePlaceHolderArr.length; i++) {
          const price1 = pricePlaceHolderArr[i].price;
          const price2 = 0;
          const date = datePlaceHolderArr[i].date;

          finalPriceList.push({
            price1: price1,
            price2: price2,
            date: date,
          });
        }
        setPriceDataSet({
          data: finalPriceList,
        });
        const finalVolumeList: {
          volume1: number;
          volume2: number;
          date: string;
        }[] = [];
        for (let i = 0; i < volPlaceHolderArr.length; i++) {
          const volume1 = volPlaceHolderArr[i].volume;
          const volume2 = 0;
          const date = datePlaceHolderArr[i].date;

          finalVolumeList.push({
            volume1: volume1,
            volume2: volume2,
            date: date,
          });
        }
        setVolumeDataSet({
          data: finalVolumeList,
        });
      }
    };

    fetchData();
  }, [currency, currentCoin, dateSelect, comparedCoinsArr]);

  return (
    <div className="flex h-96 w-full">
      <div className="mr-3 h-full w-full">
        <ChartContent data={priceDataSet.data} />
      </div>
      <div className="ml-3 h-full w-full">
        <VolumeChart data={volumeDataSet.data} />
      </div>
    </div>
  );
};

export default ChartContainer;
