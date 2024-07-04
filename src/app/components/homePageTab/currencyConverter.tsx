"use client";
import { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(getCurrentDate());
  }, []);

  const getCurrentDate = () => {
    const currentDate = new Date();

    // Get components of the date and time
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Adding leading zero if single digit
    const day = ("0" + currentDate.getDate()).slice(-2); // Adding leading zero if single digit
    const year = ("" + currentDate.getFullYear()).slice(-2); // Taking last two digits of the year

    const hours = ("0" + currentDate.getHours()).slice(-2); // Adding leading zero if single digit
    const minutes = ("0" + currentDate.getMinutes()).slice(-2); // Adding leading zero if single digit

    // Format the date and time string
    return `${month}/${day}/${year}, ${hours}:${minutes}`;
  };

  return (
    <div className="mt-5 sm:mt-10">
      <div className="flex w-full flex-col items-start justify-between">
        <div className="text-lg text-light-purple-text dark:text-white">
          Online Currency Converter
        </div>
        <div className="text-sm text-light-purple-text dark:text-grey-date-text">
          {date}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
