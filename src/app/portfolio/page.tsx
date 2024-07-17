"use client";

import { useEffect, useState } from "react";

import BaseButton from "../components/common/Button";
import CoinTemplate from "../components/portfolioComponents/coinTemplate";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import useCoinAssets from "../hooks/fetchHook/fetchCoinAssetData";

interface ICoinData {
  id: string;
  symbol: string;
  image: string;
  totalValue: number;
  purchasePercentChange: number;
  purchaseDate: string;
  currentPrice: number;
  percentChange24Hr: number;
  marketcapVSvolume: number;
  circVSmaxSupply: number;
}

const PortfolioPage = () => {
  const [data, setData] = useState<ICoinData[]>([]);
  const reduxPortfolioCoins = useSelector(
    (state: RootState) => state.portfolioCoins.portfolioCoins,
  );

  // eslint-disable-next-line no-unused-vars
  const { coinAssets, isLoading, hasError } = useCoinAssets();

  function capitalizeString(str: string) {
    return str.toLowerCase().replace(/(?:^|\s|-)\S/g, function (match) {
      return match.toUpperCase();
    });
  }

  const getPurchasePercentChange = (
    purchasePrice: number,
    currentPrice: number,
  ) => {
    return ((currentPrice - purchasePrice) / purchasePrice) * 100;
  };

  useEffect(() => {
    const storedCoins = localStorage.getItem("SAVED_COINS");
    const placeHolderArr: ICoinData[] = [];
    if (coinAssets && storedCoins) {
      const parsedCoins = JSON.parse(storedCoins);
      parsedCoins.forEach((pc: any) => {
        coinAssets.forEach((ac: any) => {
          if (pc.coinName === ac.id) {
            const item = {
              id: capitalizeString(ac.id),
              symbol: ac.symbol.toUpperCase(),
              image: ac.image,
              totalValue: pc.coinValue * ac.current_price,
              purchasePercentChange: getPurchasePercentChange(
                pc.coinPurchasePrice,
                ac.current_price,
              ),
              purchaseDate: pc.coinPurchaseDate,
              currentPrice: ac.current_price,
              percentChange24Hr: ac.price_change_percentage_24h,
              marketcapVSvolume: ac.total_volume / ac.market_cap,
              circVSmaxSupply: ac.circulating_supply / ac.max_supply,
            };
            placeHolderArr.push(item);
          }
        });
      });
    }
    setData(placeHolderArr);
  }, [reduxPortfolioCoins, coinAssets]);

  return (
    <section className="mt-44 flex h-screen w-full flex-col">
      <header className="flex items-center justify-between">
        <h3 className="text-2xl text-black dark:text-white">Portfolio</h3>
        <BaseButton text="Add Asset" />
      </header>
      <div className="mt-24 flex w-full flex-col">
        {data && data.length > 0 ? (
          data.map((el) => (
            <div key={Math.random() + Math.random()} className="mb-4 mt-4">
              <CoinTemplate data={el} />
            </div>
          ))
        ) : (
          <p className="flex items-center justify-center text-2xl text-black dark:text-white">
            No Coins in your portfolio. Click -Add Asset- in the top right
            corner to start...
          </p>
        )}
      </div>
    </section>
  );
};

export default PortfolioPage;
