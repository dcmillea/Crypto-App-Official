"use client";
import NavBarItem from "./navbarItem";
import NavBarMarketCapItem from "./navbarMarketCapItem";
import NavBarCoinVolumeItem from "./navbarCoinVolumeItem";
import NavBarMoneyBar from "./navbarMoneyBar";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

// Images below
import lightningPNG from "../../images/circle(10x).png";
import exchangePNG from "../../images/recovery-convert.png";
import bitcoinPNG from "../../images/BTC_icon.png";
import ethereum from "../../images/ETH_icon.png";

// Hooks
import { useState, useEffect } from "react";

const NavBar = () => {
  const currency = useSelector((state: RootState) => state.currency.currency);

  const [data, setData] = useState(null);
  const [marketCap, setMarketCap] = useState("");
  const [volume, setVolume] = useState("");
  const [volumePercentage, setVolumePercentage] = useState(0);
  const [isMarketCapUp, setIsMarketCapUp] = useState<boolean | null>(null);
  /* eslint-disable no-unused-vars */
  const [hasError, setHasError] = useState(false);
  /* eslint-disable no-unused-vars */
  const [isLoading, setIsLoading] = useState(false);
  const [dollarAmountLetter, setDollarAmountLetter] = useState("");

  // fetch data
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
        setIsLoading(false);
        setHasError(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      assignMarketCap(currency.toLowerCase());
      assignVolume(currency.toLowerCase());
    }
  }, [data, currency]);

  const assignMarketCap = (currencyKey: string) => {
    const entries = Object.entries((data as any).data.total_market_cap);
    entries.forEach(([key, value]) => {
      if (key === currencyKey) {
        setDollarAmountLetter(getDollarAmountLetter(value as number));
        setMarketCap(getMarketCapDecimalString(value as number));
      }
    });
  };

  const assignVolume = (currencyKey: string) => {
    const entries2 = Object.entries((data as any).data.total_volume);
    let totalVol = 0;
    let selectedVal = 0;
    entries2.forEach(([key, value]) => {
      totalVol += value as number;
      if (key === currencyKey) {
        selectedVal = value as number;
        const decimalStr = getMarketCapDecimalString(value as number);
        const letter = getDollarAmountLetter(value as number);
        const finalStr = decimalStr + letter;
        setVolume(finalStr);
      }
    });
    let percent = selectedVal / totalVol;
    percent = Math.ceil((10000000 * percent) / 6);
    setVolumePercentage(percent);
  };

  const getDollarAmountLetter = (dollarAmount: number) => {
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

  const getMarketCapDecimalString = (value: number) => {
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
    top-0 m-0 flex h-10 items-center justify-center border-b-2 border-light-purple bg-primary-purple 
    pb-7 pt-7 align-middle sm:w-auto"
    >
      {data && (
        <div className="flex w-full max-w-screen-xl items-center justify-evenly sm:w-9/12">
          <div className="hidden sm:block">
            <NavBarItem
              text="Coins"
              amount={(data as any).data.active_cryptocurrencies}
              img={lightningPNG}
            />
          </div>
          <div className="hidden sm:block">
            <NavBarItem
              text="Exchange"
              amount={(data as any).data.markets}
              img={exchangePNG}
            />
          </div>
          <div className="hidden sm:block">
            <NavBarMarketCapItem
              text={dollarAmountLetter}
              amount={marketCap}
              isMarketUp={isMarketCapUp!}
            />
          </div>
          <div>
            <NavBarMoneyBar amount={`$${volume}`} percent={volumePercentage} />
          </div>
          <div>
            <NavBarCoinVolumeItem
              amount={Math.round((data as any).data.market_cap_percentage.btc)}
              img={bitcoinPNG.src}
              color="#F7931A"
              dimension={100}
            />
          </div>
          <div className="mr-2 sm:mr-0">
            <NavBarCoinVolumeItem
              amount={Math.round((data as any).data.market_cap_percentage.eth)}
              img={ethereum.src}
              color="#627EEA"
              dimension={100}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
