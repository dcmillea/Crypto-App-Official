"use client";

//Redux
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import CoinConverterBlock from "./coinConverterBlock";

import Image from "next/image";
import switcherIconLight from "../../images/switcherIcon.png";
import switcherIconDark from "../../images/SwitcherIconDark.png";

// Chart Imports
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ICoinData {
  name: string;
  id: string;
  abbreviation: string;
  image: string;
  currentPrice: number;
  date: string;
}

type TValue = number | string;
type TName = string;
interface CustomTooltipProps extends TooltipProps<TValue, TName> {
  active: any;
  payload: any;
  label: any;
}

const CoinConvertContainer = () => {
  const [sellingCoin, setSellingCoin] = useState("bitcoin");
  const [buyingCoin, setBuyingCoin] = useState("ethereum");
  const [sellingCoinUserAmount, setSellingCoinUserAmount] = useState(0);
  const [buyingCoinUserAmount, setBuyingCoinUserAmount] = useState(0);
  const [sellingCoinData, setSellingCoinData] = useState<ICoinData>();
  const [buyingCoinData, setBuyingCoinData] = useState<ICoinData>();
  const [chartData, setChartData] = useState<
    { price: any; date: string }[] | undefined
  >(undefined);
  const [globalCoinList, setGlobalCoinList] = useState<ICoinData[]>([]);

  const currency = useSelector((state: RootState) => state.currency.currency);
  const dateSelect = useSelector((state: RootState) => state.dateSelect.date);

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-M2orPqV361oYPRkZk1xRkWz3",
        },
      };
      const lowerCaseCurrency = currency.toLowerCase();
      const globalCoinFetch = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${lowerCaseCurrency}`,
        options,
      );

      let placeHolderCoinId = "";
      const pricePlaceHolderArrChart: {
        price: any;
        date: string;
      }[] = [];
      let updatedSellingCoinData = null;
      let updatedBuyingCoinData = null;
      const updatedPlaceHolderArr: ICoinData[] = [];
      const globalFetchResult = await globalCoinFetch.json();
      globalFetchResult.map((el: any) => {
        const item = {
          name: el.id.charAt(0).toUpperCase() + el.id.slice(1).toLowerCase(),
          id: el.id,
          abbreviation: el.symbol.toUpperCase(),
          image: el.image,
          currentPrice: el.current_price,
          date: formatDate(el.last_updated),
        };
        if (el.id === sellingCoin) {
          updatedSellingCoinData = item;
        } else if (el.id === buyingCoin) {
          updatedBuyingCoinData = item;
          placeHolderCoinId = item.id;
        } else {
          updatedPlaceHolderArr.push(item);
        }
      });

      // Update state outside the map function
      if (updatedSellingCoinData) {
        setSellingCoinData(updatedSellingCoinData);
      }
      if (updatedBuyingCoinData) {
        setBuyingCoinData(updatedBuyingCoinData);
      }
      setGlobalCoinList(updatedPlaceHolderArr);

      const priceChartData = await fetch(
        `https://api.coingecko.com/api/v3/coins/${placeHolderCoinId}/market_chart?vs_currency=${lowerCaseCurrency}&days=${dateSelect}`,
        options,
      );
      if (!priceChartData.ok) {
        throw new Error("Failed to fetch data");
      }
      const newPriceData = await priceChartData.json();
      for (let i = 0; i < newPriceData.prices.length; i++) {
        const date = format(new Date(newPriceData.prices[i][0]), "MMM do");
        const item = {
          price: newPriceData.prices[i][1],
          date: date,
        };
        pricePlaceHolderArrChart.push(item);
      }
      setChartData(pricePlaceHolderArrChart);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currency, dateSelect, buyingCoin, sellingCoin]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return format(date, "MMMM do"); // 'MMMM' for full month name, 'do' for day with ordinal suffix
  };

  const handleSwitchClick = () => {
    // in here switch the selling coin or the buying coin then update useEffect
    const coinPlaceHolder = sellingCoin;
    setSellingCoin(buyingCoin);
    setBuyingCoin(coinPlaceHolder);
  };

  const handleCoinClick = (containerType: string, coinId: string) => {
    if (containerType === "You Sell") {
      setSellingCoin(coinId);
    } else if (containerType === "You Buy") {
      setBuyingCoin(coinId);
    }
  };

  // handle conversion
  const handleValueChange = (amountOfCoins: number, id: string) => {
    if (id === "You Sell") {
      setSellingCoinUserAmount(amountOfCoins);
      if (
        sellingCoinData?.currentPrice !== undefined &&
        buyingCoinData?.currentPrice !== undefined
      ) {
        const dollarAmount = amountOfCoins * sellingCoinData.currentPrice;
        const newAmount = Number(
          (dollarAmount / buyingCoinData.currentPrice).toFixed(5),
        );
        setBuyingCoinUserAmount(newAmount);
      }
    } else {
      setBuyingCoinUserAmount(amountOfCoins);
      if (
        buyingCoinData?.currentPrice !== undefined &&
        sellingCoinData?.currentPrice !== undefined
      ) {
        const dollarAmount = amountOfCoins * buyingCoinData.currentPrice;
        const newAmount = Number(
          (dollarAmount / sellingCoinData.currentPrice).toFixed(5),
        );
        setSellingCoinUserAmount(newAmount);
      }
    }
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md border border-purple-muted-90 bg-light-purple p-2 shadow-lg">
          <p className="text-black dark:text-light-grey-chart-text">{`${label}`}</p>
          {payload.map((item: any) => (
            <p
              key={Math.random()}
              className="text-black dark:text-light-grey-chart-text"
            >
              {`${item.name}: ${item.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between">
        <CoinConverterBlock
          inputAmount={sellingCoinUserAmount}
          handleValueChange={handleValueChange}
          data={sellingCoinData}
          titleText="You Sell"
          globalCoinList={globalCoinList}
          handleCoinClick={handleCoinClick}
        />
        <div
          onClick={handleSwitchClick}
          className="relative mt-4 flex cursor-pointer items-center justify-center"
        >
          <Image
            src={switcherIconDark}
            alt="Switcher Icon"
            width={50}
            height={50}
            className="block dark:hidden" // Hide in dark mode
          />
          <Image
            src={switcherIconLight}
            alt="Switcher Icon"
            width={50}
            height={50}
            className="hidden dark:block" // Show in dark mode
          />
        </div>
        <CoinConverterBlock
          inputAmount={buyingCoinUserAmount}
          handleValueChange={handleValueChange}
          data={buyingCoinData}
          titleText="You Buy"
          globalCoinList={globalCoinList}
          handleCoinClick={handleCoinClick}
        />
      </div>
      <div className="mt-10 flex h-full w-full flex-col items-center justify-center bg-white p-8 dark:bg-dark-blue-chart-bg">
        <div className="mt-4 flex h-80 w-full flex-grow items-center justify-center text-2xl text-light-purple-text dark:text-white">
          {chartData && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={chartData}
                margin={{
                  right: 0,
                  left: 0,
                }}
              >
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  minTickGap={30}
                  tickMargin={0}
                  axisLine={false}
                  interval={"preserveStartEnd"}
                  allowDataOverflow
                />
                <YAxis hide={true} scale="log" domain={["auto", "auto"]} />
                <Tooltip
                  content={CustomTooltip as any}
                  cursor={{
                    stroke: "#8884d8",
                    strokeWidth: 2,
                    strokeDasharray: "3 3",
                  }}
                />
                <defs>
                  <linearGradient id="colorBv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9D62D9" stopOpacity={1} />
                    <stop offset="95%" stopColor="#B374F2" stopOpacity={0.3} />
                  </linearGradient>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7474F2" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#7474F2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#7474F2"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                  // activeDot={{ stroke: "#8884d8", strokeWidth: 1, fill: "white" }}
                />
                <Legend
                  verticalAlign="top"
                  align="left"
                  height={100}
                  width={1000}
                  iconSize={0}
                  payload={[
                    {
                      value: `${sellingCoinData?.id} [${sellingCoinData?.abbreviation}] to ${buyingCoinData?.id} [${buyingCoinData?.abbreviation}]`,
                      type: "line",
                      id: "ID01",
                    },
                  ]}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinConvertContainer;
