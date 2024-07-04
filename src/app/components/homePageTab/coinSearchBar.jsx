"use client";

import Image from "next/image";
import searchIcon from "../../images/fluent_search-24-filled.png";
import darkSearchIcon from "../../images/search_dark.png";
import { useEffect, useRef, useState } from "react";
import useDeviceType from "@/app/hooks/getDeviceScrSize/getDeviceScreenSize";

const CoinSearchBar = ({ data, handleCoinClick, text, handleSubmit }) => {
  const [userIsSearching, setUserIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [coinList, setCoinList] = useState([]);
  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);
  const deviceType = useDeviceType();
  const isMobile = deviceType === "mobile";

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (!searchBoxRef.current?.contains(e.target)) {
        setUserIsSearching(false);
      } else if (searchBoxRef.current?.contains(e.target)) {
        setUserIsSearching(true);
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    document.addEventListener("mousedown", handleMouseClick);
  });

  const handleClick = () => {
    setUserIsSearching(true);
    searchInputRef.current.focus();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredList = data.filter((coin) => {
      const coinName = coin.id.toLowerCase();
      const searchValue = value.toLowerCase();

      if (coinName.includes(searchValue)) {
        return coin;
      }
    });

    setCoinList(filteredList);
  };

  const itemClicked = (id, text) => {
    handleCoinClick(text, id);
    handleSubmit();
  };

  return (
    <div
      onClick={handleClick}
      ref={searchBoxRef}
      className={`sm:11/12 mr-5 flex h-10 items-center justify-between rounded-md 
    border-border-small border-light-purple bg-darker-white-40 pl-2 pr-2 
    text-light-purple-text outline-none dark:bg-main-dark-purple
     dark:text-grey-nav-text sm:h-10 
     ${userIsSearching && isMobile ? "w-11/12" : " w-auto"}`}
    >
      <div className="flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7">
        <Image
          className="hidden dark:block"
          src={searchIcon}
          alt="companyLogo"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <Image
          className="block dark:hidden"
          src={darkSearchIcon}
          alt="companyLogo"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div
        className={`ml-2 w-9/12 ${isMobile && !userIsSearching ? "hidden" : "block"}`}
      >
        <input
          ref={searchInputRef}
          className="w-full bg-transparent outline-none"
          type="search"
          placeholder="Search"
          onChange={handleInputChange}
          value={inputValue}
        />
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute right-0 top-5 z-10 mt-1 max-h-60 w-60 overflow-y-auto rounded-lg border-2 border-light-purple-full bg-white text-boring-purple shadow-md dark:bg-boring-purple dark:text-white">
          <ul>
            {data &&
              coinList.map((el) => (
                <li
                  onClick={() => itemClicked(el.id, text)} // here we are gonna handle the switching of elements on the click
                  className="flex cursor-pointer items-center justify-start"
                  key={el.currentPrice}
                >
                  <div className="flex h-10 w-10 items-center justify-center">
                    <Image
                      src={el.image}
                      alt="coin-icon"
                      height={30}
                      width={30}
                    />
                  </div>
                  <div className="mr-2">{el.id}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoinSearchBar;
