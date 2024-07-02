"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CoinSearchBar from "./coinSearchBar";

// eslint-disable-next-line no-unused-vars
type HandleValueChangeType = (num: number, str: string) => void;

const CoinConverterBlock: React.FC<{
  data?: {
    name: string;
    id: string;
    abbreviation: string;
    image: string;
    currentPrice: number;
  };
  globalCoinList: {
    name: string;
    id: string;
    abbreviation: string;
    image: string;
    currentPrice: number;
    date: string;
  }[];
  // eslint-disable-next-line no-unused-vars
  handleCoinClick: (containerType: string, coin: string) => void;
  titleText?: string;
  handleValueChange: HandleValueChangeType;
  inputAmount: number;
}> = ({
  data,
  titleText,
  handleValueChange,
  inputAmount,
  globalCoinList,
  handleCoinClick,
}) => {
  const [isCoinInputActive, setIsCoinInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(inputAmount.toString());
  }, [inputAmount]);

  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      if (!searchInputRef.current?.contains(e.target as Node)) {
        setIsCoinInputActive(false);
      } else if (searchInputRef.current?.contains(e.target as Node)) {
        setIsCoinInputActive(true);
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    document.addEventListener("mousedown", handleMouseClick);

    // clean up
    return () => {
      document.removeEventListener("mousedown", handleMouseClick);
    };
  }, []);

  const handleSubmit = () => {
    setIsCoinInputActive(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isNaN(Number(value))) {
      if (titleText !== undefined) {
        handleValueChange(Number(value), titleText ?? "You Sell");
      }
      setInputValue(inputAmount.toString());
    }
  };

  const openInputSearch = () => {
    setIsCoinInputActive(!isCoinInputActive);
  };

  return (
    <div
      style={{ width: "48%" }}
      className="mt-4 flex items-center justify-center rounded-lg bg-white text-light-purple-text dark:bg-dark-blue-chart-bg dark:text-white"
    >
      <div className="flex w-11/12 flex-col items-center justify-center">
        <div className="mt-2 flex w-full items-center justify-start">
          {titleText}
        </div>
        <div className="mb-3 flex h-32 w-full items-center justify-between">
          {data &&
            (isCoinInputActive ? (
              <>
                <div
                  ref={searchInputRef}
                  className="mt-10 flex w-1/2 items-center justify-start text-2xl"
                >
                  <CoinSearchBar
                    data={globalCoinList}
                    handleCoinClick={handleCoinClick}
                    handleSubmit={handleSubmit}
                    text={titleText}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mt-10 flex h-full w-1/2 items-center justify-start text-2xl">
                  <Image
                    src={`${data?.image}`}
                    width={40}
                    height={40}
                    alt="icon"
                  />
                  <div
                    onClick={openInputSearch}
                    ref={searchInputRef}
                    className="ml-2"
                  >
                    {data?.id}
                  </div>
                  <div className="ml-2">{`[${data?.abbreviation}]`}</div>
                </div>
                <div className="mt-10 flex w-1/3 items-center justify-end text-2xl">
                  <input
                    className="w-full bg-white text-right outline-none dark:bg-dark-blue-chart-bg"
                    value={inputValue}
                    onChange={(e) => handleChangeInput(e)}
                    type="text"
                  />
                </div>
              </>
            ))}
        </div>
        <hr className="w-full border border-light-purple-text dark:border-white" />
        <div className="mb-5 mt-5 flex w-full items-center justify-start">
          1 {data?.abbreviation} = ${data?.currentPrice}
        </div>
      </div>
    </div>
  );
};

export default CoinConverterBlock;
