"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import useCoinAssets from "../../hooks/fetchHook/fetchCoinAssetData";
import DropDownOption from "./dropDownOption";
import PurchaseOption from "./purchaseOption";
import PurchaseDate from "./purchaseDate";
import SelectionButton from "./selectionButton";
import { format } from "date-fns";

// Redux
import { useDispatch } from "react-redux";
import { setPortfolioCoins } from "../../state/assets/assetSlice";

// Local Storage
import useLocalStorageCoinInfo from "../../hooks/localStorage/useLocalStorageCoinInfo";

interface IPopUpTemplateProps {
  handleClick: () => void;
  successClick: () => void;
  failureClick: () => void;
}

const PopUpCoinTemplate: React.FC<IPopUpTemplateProps> = ({
  handleClick,
  successClick,
  failureClick,
}) => {
  const dispatch = useDispatch();
  const [savedCoins, setSavedCoins] = useLocalStorageCoinInfo();
  const [selectedCoin, setSelectedCoin] = useState({
    name: "",
    id: "",
    image: "",
    symbol: "",
  });

  const getCurrentDate = () => {
    const currentDate = new Date(); // Get current date object
    const formattedDate = format(currentDate, "MM/dd/yyyy"); // Format the date
    return formattedDate;
  };

  const [coinSaveAmount, setCoinSaveAmount] = useState(0);
  const [coinPurchaseDate, setCoinPurchaseDate] =
    useState<string>(getCurrentDate());
  const [coinPurchasePrice, setCoinPurchasePrice] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const { coinAssets, isLoading, hasError } = useCoinAssets();

  useEffect(() => {
    if (coinAssets !== undefined) {
      if (coinAssets[0] !== undefined) {
        setSelectedCoin(coinAssets[0]);
        setCoinPurchasePrice(coinAssets[0].current_price);
      }
    }
  }, [isLoading]);

  const handleCoinChange = (id: string) => {
    coinAssets.map((el) => {
      if (el.id === id) {
        setSelectedCoin(el);
        setCoinPurchasePrice(el.current_price);
      }
    });
  };

  const handleCoinInputAmount = (amount: number) => {
    setCoinSaveAmount(amount);
  };

  const handleCoinPurchaseDate = (date: string) => {
    setCoinPurchaseDate(date);
  };

  const handleSaveCoinClick = () => {
    let name;
    let date;
    let amount;
    if (coinSaveAmount !== 0 && coinPurchaseDate !== "") {
      if (selectedCoin && selectedCoin.id !== "") {
        name = selectedCoin.id;
      } else {
        name = "bitcoin";
      }
      date = coinPurchaseDate;
      amount = coinSaveAmount;
      const newCoin = {
        coinName: name,
        coinValue: amount,
        coinPurchasePrice: coinPurchasePrice,
        coinPurchaseDate: date,
      };
      // setPortfolioLocalStorageCoins([...portfolioCoins, name]);
      const updatedSavedCoins = [...savedCoins, newCoin];
      setSavedCoins(updatedSavedCoins);
      dispatch(setPortfolioCoins(updatedSavedCoins));
      successClick();
      handleClick();
      // then save to local storage --> because we can then grab it from local storage
      // to make API call using their id's
    } else {
      failureClick();
    }
  };

  const canRenderPreviewCan =
    selectedCoin.image !== "" &&
    selectedCoin.name !== "" &&
    selectedCoin.symbol !== "";

  return (
    <section className="bg-primary fixed left-0 top-0 z-50 h-full w-full bg-light-purple dark:bg-white-muted-50">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-2/4 w-7/12 flex-col items-center justify-center rounded-md bg-white p-6 text-light-purple-full dark:bg-main-dark-purple dark:text-white">
          <header className="flex h-1/5 w-full items-center justify-between">
            <h3 className="text-xl font-medium">Select coins</h3>
            <button className="hidden dark:block" onClick={handleClick}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke="white"
                  style={{ stroke: "white", strokeOpacity: 1 }}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.17188 14.8299L14.8319 9.16992"
                  stroke="white"
                  style={{ stroke: "white", strokeOpacity: 1 }}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.8319 14.8299L9.17188 9.16992"
                  stroke="white"
                  style={{ stroke: "white", strokeOpacity: 1 }}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="block dark:hidden" onClick={handleClick}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke="#6161D6"
                  style={{ stroke: "#6161D6", strokeOpacity: 1 }}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.17188 14.8299L14.8319 9.16992"
                  stroke="#6161D6"
                  style={{ stroke: "#6161D6", strokeOpacity: 1 }}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.8319 14.8299L9.17188 9.16992"
                  stroke="#6161D6"
                  style={{ stroke: "#6161D6", strokeOpacity: 1 }}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </header>
          <div className="flex h-full w-full items-center justify-between">
            <div className="flex h-full w-1/3 flex-col items-center justify-center bg-dark-blue-chart-bg">
              {canRenderPreviewCan && (
                <>
                  <div className="flex h-20 w-20 items-center justify-center rounded-md bg-weird-purple">
                    <Image
                      src={selectedCoin.image}
                      alt="coinIcon"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex h-20 w-full items-center justify-center">
                    <h4 className="text-center text-2xl">
                      {selectedCoin.name}{" "}
                      {`[${selectedCoin.symbol.toUpperCase()}]`}
                    </h4>
                  </div>
                </>
              )}
            </div>
            <div className="flex h-full w-7/12 flex-col items-center justify-between pl-4">
              <DropDownOption
                text="Select Coins"
                coinAssets={coinAssets}
                handleCoinChange={handleCoinChange}
              />
              <PurchaseOption handleCoinInputAmount={handleCoinInputAmount} />
              <PurchaseDate handleCoinPurchaseDate={handleCoinPurchaseDate} />
              <div className="flex h-1/5 w-full items-center justify-between">
                <SelectionButton
                  text="Cancel"
                  btnSelected={false}
                  handleClick={handleClick}
                />
                <SelectionButton
                  text="Save and Continue"
                  btnSelected={true}
                  handleClick={handleSaveCoinClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopUpCoinTemplate;
