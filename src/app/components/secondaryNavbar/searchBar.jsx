"use client";

import Image from "next/image";
import searchIcon from "../../images/fluent_search-24-filled.png";
import darkSearchIcon from "../../images/search_dark.png";
import { useEffect, useRef, useState } from "react";

const SearchBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [userIsSearching, setUserIsSearching] = useState(false);
  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);

  // Typically in all web applications the window is defined
  // But it is not doing so here, so you could get thrown
  // errors for this, but just note during build you will
  // not get the window is undefined
  // console.log(window.innerWidth);
  if (typeof window !== "undefined") {
    window.onload = () => {
      setIsMobile(true);
    };
  }

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (!searchBoxRef.current.contains(e.target)) {
        setUserIsSearching(false);
      } else {
        setUserIsSearching(true);
        searchInputRef.current.focus();
      }
    };
    document.addEventListener("mousedown", handleMouseClick);
  });

  const handleClick = () => {
    searchInputRef.current.focus();
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
        className={`ml-2 w-9/12 sm:block ${isMobile && !userIsSearching ? "hidden" : "block"}`}
      >
        <input
          ref={searchInputRef}
          className="w-full bg-transparent outline-none"
          type="search"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
