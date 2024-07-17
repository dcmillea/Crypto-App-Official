"use client";

import { useState, useEffect, useRef } from "react";

const DropDownOption = ({ coinAssets, handleCoinChange }: any) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("");
  const coinSelectRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        coinSelectRef.current &&
        !coinSelectRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function capitalizeWords(text: string) {
    // Split the sentence into words using spaces or dashes as delimiters
    const words = text.split(/[\s-]+/);

    // Capitalize the first letter of each word
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back into a sentence with spaces or dashes
    const capitalizedSentence = capitalizedWords.join(" ");

    return capitalizedSentence;
  }

  const handleCoinClick = (id: string) => {
    setSelectedCoin(capitalizeWords(id));
    handleCoinChange(id);
    handleClick();
  };

  return (
    <>
      <section
        onClick={handleClick}
        className="flex h-1/6 w-full cursor-pointer items-center justify-between bg-primary-purple pl-2 pr-2 dark:bg-purple-muted"
      >
        <h4 className="text-lg">
          {selectedCoin ? <>{selectedCoin}</> : <>Bitcoin</>}
        </h4>
        <div ref={coinSelectRef} className="relative w-1/2">
          {showDropDown && (
            <div className="absolute right-40 top-4 z-10 h-40 w-full overflow-y-auto rounded-md bg-primary-purple text-lg text-white dark:bg-primary-purple">
              <ul>
                {coinAssets &&
                  coinAssets.map((el: any) => (
                    <div
                      className="ml-2 mr-2 cursor-pointer"
                      onClick={() => handleCoinClick(el.id)}
                      key={Math.random()}
                    >
                      {el.name}
                      <hr />
                    </div>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <svg
            className="mr-2 w-2 rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="#ffffff"
              d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default DropDownOption;
