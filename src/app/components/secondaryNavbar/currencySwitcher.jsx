"use client";

import moneyIcon from "../../images/cryptocurrency_usd.png";
import moneyIconDark from "../../images/moneyIcon_dark.png";
import downArrow from "../../images/Down (Small).png";
import downArrowDark from "../../images/downArrow_dark.png";
import Image from "next/image";

import { useGlobalContext } from "@/app/context/store";

import { useState, useEffect, useRef } from "react";

const CurrencySwitcher = () => {
  const { setCurrencyId } = useGlobalContext();

  const [showDropDown, setShowDropDown] = useState(false);
  const [currencyList, setCurrencyList] = useState([
    {
      name: "USD",
      isSelected: true,
    },
    {
      name: "GBP",
      isSelected: false,
    },
    {
      name: "EUR",
      isSelected: false,
    },
    {
      name: "BTC",
      isSelected: false,
    },
    {
      name: "ETH",
      isSelected: false,
    },
  ]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isMounted, setIsMounted] = useState(false);
  const dropDownMenuRef = useRef(null);

  useEffect(() => {
    const handleMouseClickOff = (e) => {
      if (!dropDownMenuRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleMouseClickOff);
  });

  useEffect(() => {
    if (isMounted) {
      window.localStorage.setItem(
        "CURRENT_SELECTED_CURRENCY",
        JSON.stringify(selectedCurrency),
      );
      const newList = currencyList.map((el) => {
        if (el.name === selectedCurrency) {
          el.isSelected = true;
          setCurrencyId(el);
        } else {
          el.isSelected = false;
        }
        return el;
      });
      setCurrencyList(newList);
    }
  }, [selectedCurrency, isMounted]);

  useEffect(() => {
    const locallyStoredCurrency = window.localStorage.getItem(
      "CURRENT_SELECTED_CURRENCY",
    );
    const value = locallyStoredCurrency
      ? JSON.parse(locallyStoredCurrency)
      : "USD";
    setSelectedCurrency(value);
    setIsMounted(true);
    setCurrencyId(value);
  }, []);

  const handleDropDownClick = () => {
    setShowDropDown(!showDropDown);
  };

  const handleCurrencySelectClick = (id) => {
    const newList = currencyList.map((el) => {
      if (el.name === id) {
        el.isSelected = true;
        setSelectedCurrency(el.name);
      } else {
        el.isSelected = false;
      }
      return el;
    });
    setCurrencyList(newList);
    setShowDropDown(!showDropDown);
  };

  return (
    <div
      ref={dropDownMenuRef}
      onClick={handleDropDownClick}
      className="mr-5 flex h-10 w-2/12 cursor-pointer items-center justify-evenly rounded-md border-border-small border-light-purple bg-darker-white-40 dark:bg-main-dark-purple"
    >
      <div className="flex h-6 w-6 items-center justify-center">
        <Image className="hidden dark:block" src={moneyIcon} alt="moneyIcon" />
        <Image
          className="block dark:hidden"
          src={moneyIconDark}
          alt="moneyIcon"
        />
      </div>
      <div className="text-text-currency-grey dark:text-text-currency-muted-white">
        {selectedCurrency}
      </div>
      <div className="flex h-4 w-4 items-center justify-center">
        <Image className="hidden dark:block" src={downArrow} alt="downArrow" />
        <Image
          className="block dark:hidden"
          src={downArrowDark}
          alt="downArow"
        />
      </div>
      {showDropDown && (
        <div className="absolute top-32 animate-dropDownIn rounded-md border-border-small border-light-purple bg-darker-white-40 text-text-currency-grey dark:bg-main-dark-purple dark:text-text-currency-muted-white">
          <ul>
            {currencyList.map((el) => (
              <li
                className="pl-10 pr-10"
                onClick={() => handleCurrencySelectClick(el.name)}
                key={el.name}
              >
                {el.isSelected && (
                  <div className="absolute left-2 inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                )}
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySwitcher;
