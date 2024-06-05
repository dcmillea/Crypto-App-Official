"use client";
import NavBarItem from "./navbarItem";
import NavBarMarketCapItem from "./navbarMarketCapItem";
import NavBarCoinVolumeItem from "./navbarCoinVolumeItem";
import NavBarMoneyBar from "./navbarMoneyBar";

// Global Context
import { useGlobalContext } from "@/app/context/store";

// Images below
import lightningPNG from "../../images/circle(10x).png";
import exchangePNG from "../../images/recovery-convert.png";
import bitcoinPNG from "../../images/BTC_icon.png";
import ethereum from "../../images/ETH_icon.png";

// Hooks
import { useState, useEffect } from "react";

const NavBar = () => {
  const { currencyId, setCurrencyId } = useGlobalContext();

  const [data, setData] = useState(null);
  const [marketCap, setMarketCap] = useState(0);
  const [volume, setVolume] = useState("");
  const [volumePercentage, setVolumePercentage] = useState("");
  const [isMarketCapUp, setIsMarketCapUp] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dollarAmountLetter, setDollarAmountLetter] = useState(0);

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
        const locallyStoredCurrency = window.localStorage.getItem(
          "CURRENT_SELECTED_CURRENCY",
        );
        const value = locallyStoredCurrency
          ? JSON.parse(locallyStoredCurrency)
          : "USD";
        setCurrencyId(value);
        setData(result);

        // check to see if market cap is up or down in last 24 hours:
        setIsMarketCapUp(result.data.market_cap_change_percentage_24h_usd >= 0);
        assignVolume(value.toLowerCase());
        assignMarketCap(value.toLowerCase());
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

  useEffect(() => {
    const locallyStoredCurrency = window.localStorage.getItem(
      "CURRENT_SELECTED_CURRENCY",
    );
    const value = locallyStoredCurrency
      ? JSON.parse(locallyStoredCurrency)
      : "USD";
    const valueLowerCase = value.toLowerCase();
    setCurrencyId(valueLowerCase);
    if (data) {
      assignMarketCap(valueLowerCase);
      assignVolume(valueLowerCase);
    }
    setHasError(false);
    setIsLoading(false);
  }, [currencyId]);

  const assignMarketCap = (currencyKey) => {
    const entries = Object.entries(data.data.total_market_cap);
    entries.forEach(([key, value]) => {
      if (key === currencyKey) {
        setDollarAmountLetter(getDollarAmountLetter(value));
        setMarketCap(getMarketCapDecimalString(value));
      }
    });
  };

  const assignVolume = (currencyKey) => {
    const entries2 = Object.entries(data.data.total_volume);
    let totalVol = 0;
    let selectedVal = 0;
    entries2.forEach(([key, value]) => {
      totalVol += value;
      if (key === currencyKey) {
        selectedVal = value;
        const decimalStr = getMarketCapDecimalString(value);
        const letter = getDollarAmountLetter(value);
        const finalStr = decimalStr + letter;
        setVolume(finalStr);
      }
    });
    let percent = selectedVal / totalVol;
    percent = Math.ceil((10000000 * percent) / 6);
    setVolumePercentage(percent);
  };

  const getDollarAmountLetter = (dollarAmount) => {
    let letter = "";
    const decimalNum = dollarAmount / 1000000000000;
    if (decimalNum > 0.9) {
      letter = "T";
    } else if (decimalNum > 0.001) {
      letter = "B";
    } else if (decimalNum > 0.000001) {
      letter = "M";
    } else {
      letter = "X";
    }
    return letter;
  };

  const getMarketCapDecimalString = (value) => {
    const numberWithCommas = value.toLocaleString();
    const firstElement = numberWithCommas.split(",")[0];
    let finalStr = "";
    if (firstElement.length === 3) {
      finalStr = firstElement;
    } else if (firstElement.length == 2) {
      finalStr = firstElement + "." + numberWithCommas.slice(3, 4);
    } else {
      finalStr = firstElement + "." + numberWithCommas.slice(2, 4);
    }
    return finalStr;
  };

  return (
    <div
      className="left-0 right-0 
    top-0 m-0 flex h-10 w-auto items-center justify-center border-b-2 border-light-purple 
    bg-primary-purple pb-7 pt-7 align-middle"
    >
      {data && !hasError && !isLoading && (
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
            text={dollarAmountLetter}
            amount={marketCap}
            isMarketUp={isMarketCapUp}
          />
          <NavBarMoneyBar amount={`$${volume}`} percent={volumePercentage} />
          <NavBarCoinVolumeItem
            amount={Math.round(data.data.market_cap_percentage.btc)}
            img={bitcoinPNG}
            color="#F7931A"
          />
          <NavBarCoinVolumeItem
            amount={Math.round(data.data.market_cap_percentage.eth)}
            img={ethereum}
            color="#627EEA"
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
