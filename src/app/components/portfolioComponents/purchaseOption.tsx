"use client";
import { useState, useRef, useEffect } from "react";

const PurchaseOption = ({ handleCoinInputAmount }: any) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (!isNaN(Number(val))) {
      setInputValue(val); // Update input value state
      handleCoinInputAmount(val);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        inputRef.current.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  return (
    <section
      onClick={handleClick}
      className="flex h-1/6 w-full cursor-pointer items-center justify-between bg-primary-purple pl-2 pr-2 dark:bg-purple-muted"
    >
      <input
        ref={inputRef}
        className="focus-outline-dashed h-3/4 w-1/2 border-none bg-primary-purple dark:bg-purple-muted"
        type="number"
        placeholder="enter purchase amount..."
        value={inputValue}
        onChange={handleChange}
      />
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
  );
};

export default PurchaseOption;
