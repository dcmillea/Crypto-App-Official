"use client";

import Image from "next/image";
import Link from "next/link";
import searchIcon from "../../images/fluent_search-24-filled.png";
import darkSearchIcon from "../../images/search_dark.png";
import { useEffect, useRef, useState } from "react";
import useDeviceType from "@/app/hooks/getDeviceScrSize/getDeviceScreenSize";

const SearchBar = () => {
  const [userIsSearching, setUserIsSearching] = useState(false);
  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);
  const deviceType = useDeviceType();
  const isMobile = deviceType === "mobile";

  const [showDisplayList, setShowDisplayList] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [coinList, setCoinList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (!searchBoxRef.current?.contains(e.target)) {
        setUserIsSearching(false);
        setShowDisplayList(false);
      } else if (searchBoxRef.current?.contains(e.target)) {
        setUserIsSearching(true);
        if (searchInputRef.current) {
          setShowDisplayList(true);
          searchInputRef.current.focus();
        }
      }
    };
    document.addEventListener("mousedown", handleMouseClick);
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    setUserIsSearching(true);
    searchInputRef.current.focus();
  };

  const handleItemClick = () => {
    setUserIsSearching(false);
    setShowDisplayList(false);
    searchInputRef.current.blur();
  };

  const handleChange = (text) => {
    setInputValue(text);
    const newList = coinList.filter((el) => {
      return el.id && el.id.toLowerCase().includes(text.toLowerCase());
    });
    setDisplayList(newList);
  };

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
        "https://api.coingecko.com/api/v3/coins/list",
        options,
      );

      const coinFetchJSON = await coinFetch.json();
      setCoinList(coinFetchJSON);
    } catch (e) {
      /* eslint-disable no-console */
      console.log(e);
    }
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
          onChange={(e) => handleChange(e.target.value)}
          ref={searchInputRef}
          className="w-full bg-transparent outline-none"
          type="search"
          placeholder="Search"
          value={inputValue}
        />
        {showDisplayList && (
          <div className="relative flex flex-col items-center justify-center">
            <div
              className="absolute right-0 top-5 z-10 mt-1 max-h-80 w-60 
          overflow-y-auto rounded-lg border-2 border-light-purple-full
          bg-white text-boring-purple shadow-md dark:bg-boring-purple
          dark:text-white"
            >
              <ul>
                {displayList &&
                  displayList.map((el) => (
                    <li onClick={handleItemClick} key={el.id + Math.random()}>
                      <Link href={`/coinPage/${el.id}`}>{el.id}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
