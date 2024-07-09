"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CoinContainer from "../../components/coinPage/coinContainer";
import ProfitContainer from "../../components/coinPage/profitContainer";
import MarketInfoContainer from "../../components/coinPage/marketInfoContainer";
import Description from "../../components/coinPage/description";
import CryptoLinks from "../../components/coinPage/cryptoLinks";

import { format } from "date-fns";

//Redux
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";

export default function Page({ params }: { params: { coinId: string } }) {
  const currency = useSelector((state: RootState) => state.currency.currency);

  const { coinId } = params;
  const [container1Data, setContainer1Data] = useState({
    name: "",
    symbol: "",
    image: "",
    homePage: "",
  });
  const [container2Data, setContainer2Data] = useState({});
  const [container3Data, setContainer3Data] = useState({});
  const [descriptionText, setDescriptionText] = useState("");
  const [cryptoLinks, setCryptoLinks] = useState([]);

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-M2orPqV361oYPRkZk1xRkWz3",
          mode: "no-cors",
        },
      };

      const coinFetch = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options,
      );
      const coinFetchJSON = await coinFetch.json();

      if (coinFetchJSON) {
        const { id, symbol, image, links, market_data, description } =
          coinFetchJSON;

        if (!market_data) return;
        const item = {
          name: capatalizeFirstLetter(id),
          symbol: symbol,
          image: image.large,
          homePage: links.homepage && links.homepage[0],
        };

        const item2 = {
          currentPrice: findValue(market_data.current_price),
          priceChangePercent:
            market_data &&
            getAbsoluteValue(market_data.price_change_percentage_24h),
          ath: getAbsoluteValue(findValue(market_data.ath) as number),
          atl: getAbsoluteValue(findValue(market_data.atl) as number),
          isMarketUp: isMarketUp(market_data.price_change_percentage_24h),
          athDate: getParsedTimeStamp(findValue(market_data.ath_date)),
          atlDate: getParsedTimeStamp(findValue(market_data.atl_date)),
        };

        const item3 = {
          marketCap:
            market_data.market_cap &&
            findValue(market_data.market_cap).toLocaleString(),
          fullyDilutedValue: findValue(
            market_data.fully_diluted_valuation,
          ).toLocaleString(),
          turnover: (
            market_data.circulating_supply / market_data.total_supply
          ).toLocaleString(),
          totalVolume: findValue(market_data.total_volume).toLocaleString(),
          circulation: market_data.circulating_supply.toLocaleString(),
          maxSupply:
            market_data.max_supply && market_data.max_supply.toLocaleString(),
          circulationPercent: (
            market_data.circulating_supply / market_data.max_supply
          ).toLocaleString(),
        };

        const descriptionParagraph = description.en;
        // Regular expression to match <a> tags and their contents
        const regex = /<a\b[^>]*>(.*?)<\/a>/gi;

        // remove <a> tags and return the text
        const textWithoutLinks = descriptionParagraph.replace(
          regex,
          (match: any, group1: any) => group1,
        );

        const websiteLinks = links.blockchain_site.slice(1, 4);

        setContainer1Data(item);
        setContainer2Data(item2);
        setContainer3Data(item3);
        setDescriptionText(textWithoutLinks);
        setCryptoLinks(websiteLinks);
      }
    } catch (e) {
      /* eslint-disable no-console */
      console.log("there was an error with data fetch process!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function capatalizeFirstLetter(str: string) {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, function (match) {
      return match.toUpperCase();
    });
  }

  const getAbsoluteValue = (num: number) => {
    return Math.abs(num).toFixed(2);
  };

  const isMarketUp = (num: number) => {
    return num > 0;
  };

  const findValue = (data: Object) => {
    return Object.entries(data).find(
      ([key]) => key === currency.toLowerCase(),
    )?.[1];
  };

  const getParsedTimeStamp = (timeStamp: string) => {
    try {
      const date = new Date(timeStamp);
      if (date) {
        return format(date, "EEE, dd MMM yyyy HH:mm:ss 'UTC'");
      }
    } catch (e) {
      return "Date not available!";
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-start border-2 border-white text-light-purple-text dark:text-white">
      <div className="mt-40 flex w-full items-center justify-start text-2xl">
        <div className="flex w-2/6 cursor-pointer items-center justify-start">
          <div className="hidden dark:block">
            <svg
              width="30"
              height="28"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.62865 4.94141L3.57031 9.99974L8.62865 15.0581"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7359 10H3.71094"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="block dark:hidden">
            <svg
              width="30"
              height="28"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.62865 4.94141L3.57031 9.99974L8.62865 15.0581"
                stroke="#353570"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7359 10H3.71094"
                stroke="#353570"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Link href={"/"} className="pl-2 text-xl">
            {capatalizeFirstLetter(params.coinId)} Summary
          </Link>
        </div>
      </div>
      <div className="mt-10 grid h-screen w-full grid-cols-coinPageCols grid-rows-coinPageRows gap-8">
        <div className="grid grid-rows-8 gap-y-4">
          <CoinContainer data={container1Data} />
        </div>
        <div className="grid grid-rows-10 rounded-md bg-white dark:bg-primary-purple">
          <ProfitContainer data={container2Data} />
        </div>
        <div className="col-start-3 col-end-3 row-start-1 row-end-3 rounded-md bg-white dark:bg-primary-purple">
          <MarketInfoContainer data={container3Data} />
        </div>
        <div className="col-start-1 col-end-3 row-start-3 row-end-6 overflow-y-auto rounded-md bg-white-muted dark:bg-main-dark-purple">
          <Description text={descriptionText} />
        </div>
        <div className="col-start-3 col-end-4 row-start-3 row-end-6 rounded-md bg-white-muted dark:bg-main-dark-purple">
          <CryptoLinks arrOfLinks={cryptoLinks} />
        </div>
        {/* <div className="border border-green-500">item #6</div> */}
      </div>
    </div>
  );
}
