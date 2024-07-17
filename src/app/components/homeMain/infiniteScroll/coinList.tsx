"use client";
import { useState, useEffect } from "react";

import CoinItem from "./coinItem";
import CoinItemCategories from "./CoinItemCategory";
import Link from "next/link";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

interface ICoin {
  number: number;
  icon: string;
  name: string;
  abv: string;
  price: number;

  priceChange1Hr: number;
  isPrice1HrUp: boolean;

  priceChange24Hr: number;
  isPrice24HrUp: boolean;

  priceChange7d: number;
  isPrice7dUp: boolean;

  volume24Hr: number;
  totalVolume24Hr: number;
  volumeBarString: string;

  circulatingSupply: number;
  totalCirculatingSupply: number;
  circulatingBarString: string;

  chartData: {
    price: number;
    date: number;
  }[];
}

const CoinList = () => {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const [coinList, setCoinList] = useState<ICoin[]>([]);
  const [page, setPage] = useState(1);

  const handleNegativeDecimal = (num: number) => {
    const numStr = num.toString();
    const modifiedNumStr = numStr.substring(1);
    return parseFloat(modifiedNumStr);
  };

  const get7dChangePercent = (numOld: number, numNew: number) => {
    return ((numNew - numOld) / numOld) * 100;
  };

  const convertToBillions = (num: number) => {
    return parseFloat((num / 1e9).toFixed(2));
  };

  const getPercentageBar = (currentValue: number, maxValue: number) => {
    // Calculate percentage
    const percentage = (currentValue / maxValue) * 100;
    const fillerBarStyle = `${percentage}%`;
    return fillerBarStyle;
  };

  useEffect(() => {
    // Fetch data function
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-M2orPqV361oYPRkZk1xRkWz3",
          mode: "no-cors",
        },
      };
      try {
        // Perform your API call
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h&precision=2`,
          options,
        );
        const data = await response.json();
        const placeHolderArr: ICoin[] = [];
        for (let i = 0; i < data.length; i++) {
          let price1hUp = false;
          let price24hUp = false;
          let price7dUp = false;
          let priceChange1HrResult =
            data[i].price_change_percentage_1h_in_currency;
          let priceChange24HrResult = data[i].price_change_percentage_24h;
          let priceChange7dResult = get7dChangePercent(
            data[i].sparkline_in_7d.price[0],
            data[i].sparkline_in_7d.price[
              data[i].sparkline_in_7d.price.length - 1
            ],
          );

          if (priceChange1HrResult < 0) {
            priceChange1HrResult = handleNegativeDecimal(
              data[i].price_change_percentage_1h_in_currency,
            );
          } else {
            price1hUp = true;
          }
          if (priceChange24HrResult < 0) {
            priceChange24HrResult = handleNegativeDecimal(
              data[i].price_change_percentage_24h,
            );
          } else {
            price24hUp = true;
          }
          if (priceChange7dResult < 0) {
            priceChange7dResult = handleNegativeDecimal(priceChange7dResult);
          } else {
            price7dUp = true;
          }

          const placeHolderChartArr = [];
          for (let j = 0; j < data[i].sparkline_in_7d.price.length; j++) {
            const chartItem = {
              price: data[i].sparkline_in_7d.price[j],
              date: j,
            };
            placeHolderChartArr.push(chartItem);
          }
          const item = {
            number: i + 1,
            icon: data[i].image,
            name: data[i].id,
            abv: data[i].symbol,
            price: data[i].current_price,
            priceChange1Hr: priceChange1HrResult,
            priceChange24Hr: priceChange24HrResult,
            priceChange7d: priceChange7dResult,
            isPrice1HrUp: price1hUp,
            isPrice24HrUp: price24hUp,
            isPrice7dUp: price7dUp,
            volume24Hr: (100 * data[i].total_volume) / data[i].market_cap,
            totalVolume24Hr: convertToBillions(data[i].market_cap),
            volumeBarString: getPercentageBar(
              data[i].total_volume,
              data[i].market_cap,
            ),
            circulatingSupply:
              (100 * data[i].circulating_supply) / data[i].total_supply,
            totalCirculatingSupply: convertToBillions(data[i].total_supply),
            circulatingBarString: getPercentageBar(
              data[i].circulating_supply,
              data[i].total_supply,
            ),
            chartData: placeHolderChartArr,
          };
          placeHolderArr.push(item);
        }
        setCoinList((prev) => [...prev, ...placeHolderArr]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    // Call the async function inside useEffect
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mt-4 w-full">
      <div>
        <CoinItemCategories />
        {coinList.map((el) => {
          return (
            <Link
              key={Math.random() - Math.random()}
              href={`/coinPage/${el.name}`}
            >
              <CoinItem data={el} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CoinList;
