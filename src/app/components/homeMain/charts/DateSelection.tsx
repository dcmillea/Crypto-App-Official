"use client";
import DateItem from "./DateItem";
import { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { setDateSelect } from "@/app/state/dateSelect/dateSelectionSlice";

const DateSelection = () => {
  const dispatch = useDispatch();

  const [dateList, setDateList] = useState([
    { text: "1D", isSelected: true },
    { text: "7D", isSelected: false },
    { text: "14D", isSelected: false },
    { text: "1M", isSelected: false },
    { text: "1Q", isSelected: false },
    { text: "1Y", isSelected: false },
    { text: "5Y", isSelected: false },
  ]);

  const handleClick = (text: string) => {
    const newList = dateList.map((el) => {
      if (el.text === text) {
        el.isSelected = true;
        let placeHolderStr = 1;
        if (text === "1D") {
          placeHolderStr = 1;
        } else if (text === "7D") {
          placeHolderStr = 7;
        } else if (text === "14D") {
          placeHolderStr = 14;
        } else if (text === "1M") {
          placeHolderStr = 30;
        } else if (text === "1Q") {
          placeHolderStr = 90;
        } else if (text === "1Y") {
          placeHolderStr = 365;
        } else {
          placeHolderStr = 1825;
        }
        dispatch(setDateSelect(placeHolderStr));
      } else {
        el.isSelected = false;
      }
      return el;
    });
    setDateList(newList);
  };

  return (
    <div className="flex h-28 w-full items-center justify-start">
      <div className="flex h-12 w-5/12 items-center justify-evenly bg-darker-white-40 dark:bg-boring-purple">
        {dateList.map((el) => (
          <DateItem
            key={el.text}
            text={el.text}
            isSelected={el.isSelected}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DateSelection;
