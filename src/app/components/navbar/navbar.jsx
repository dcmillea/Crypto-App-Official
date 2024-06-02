"use client";
import NavBarItem from "./navbarItem";
import NavBarMarketCapItem from "./navbarMarketCapItem";
import NavBarCoinVolumeItem from "./navbarCoinVolumeItem";
import NavBarMoneyBar from "./navbarMoneyBar";

// Images below
import lightningPNG from "../../images/circle(10x).png";
import exchangePNG from "../../images/recovery-convert.png";
import bitcoinPNG from "../../images/BTC_icon.png";
import ethereum from "../../images/ETH_icon.png";

// Hooks
import { useState, useEffect } from "react";

const NavBar = () => {
  const [data, setData] = useState(null);
  const [marketCap, setMarketCap] = useState(0);
  const [isMarketCapUp, setIsMarketCapUp] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-M2orPqV361oYPRkZk1xRkWz3",
          },
        };

        setIsLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/global",
          options,
        );
        const result = await response.json();
        setData(result);
        // check to see if market cap is up or down in last 24 hours:
        setIsMarketCapUp(result.data.market_cap_change_percentage_24h_usd >= 0);

        // Get values for market cap in the first few digits
        const marketValues = Object.values(result.data.total_market_cap);
        const newVal = marketValues.reduce((accumulator, current) => {
          return accumulator + current;
        }, 0);
        const convertedNumber = newVal.toString();
        const before = convertedNumber.slice(0, 3);
        const after = convertedNumber.slice(3, 4);
        const decimalPoint = ".";
        const finalStr = before + decimalPoint + after;
        setMarketCap(finalStr);
        setIsLoading(false);
        setHasError(false);
      } catch (error) {
        // console.log("we have a problem!");
        setHasError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="left-0 right-0 
    top-0 m-0 flex h-10 w-auto items-center justify-center border-b-2 border-light-purple 
    bg-primary-purple pb-7 pt-7 align-middle"
    >
      {data && !isLoading && !hasError && (
        <div className="flex w-9/12 items-center justify-evenly">
          <NavBarItem
            text="Coins"
            amount={data.data.active_cryptocurrencies}
            img={lightningPNG}
          />
          <NavBarItem
            text="Exchange"
            amount={data.data.markets}
            img={exchangePNG}
          />
          <NavBarMarketCapItem
            text="T"
            amount={marketCap}
            isMarketUp={isMarketCapUp}
          />
          <NavBarMoneyBar amount="$144B" />
          <NavBarCoinVolumeItem
            amount={Math.round(data.data.market_cap_percentage.btc)}
            img={bitcoinPNG}
            dimension={100}
          />
          <NavBarCoinVolumeItem
            amount={Math.round(data.data.market_cap_percentage.eth)}
            img={ethereum}
            dimension={85}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
