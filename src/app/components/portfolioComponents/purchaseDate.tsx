"use client";
import { useState, useEffect, useRef } from "react";
import { DayPicker, DayClickEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";

type ValuePiece = Date | null;
// eslint-disable-next-line no-unused-vars
type Value = ValuePiece | [ValuePiece, ValuePiece];

const PurchaseDate = ({ handleCoinPurchaseDate }: any) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const initiallySelectedDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initiallySelectedDate,
  );
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    if (modifiers.selected) {
      setSelectedDate(undefined); // Unselect the day if it's already selected
    } else {
      setSelectedDate(day); // Select the day and set it in state
      handleCoinPurchaseDate(day?.toLocaleDateString());
    }
  };

  return (
    <>
      <section
        onClick={handleClick}
        className="flex h-1/6 w-full cursor-pointer items-center justify-between bg-primary-purple pl-2 pr-2 dark:bg-purple-muted"
      >
        <h4 className="text-lg">{selectedDate?.toLocaleDateString()}</h4>
        {showDropDown && (
          <div ref={calendarRef} className="relative w-full">
            <div className="absolute right-20 top-5 z-10 w-full rounded-md bg-primary-purple text-lg text-white dark:bg-primary-purple">
              <DayPicker
                mode="single"
                captionLayout="dropdown"
                numberOfMonths={1}
                weekStartsOn={1}
                selected={selectedDate}
                // onSelect={handleDayClick}
                modifiersStyles={{
                  selected: {
                    backgroundColor: "#D1D1D1",
                    color: "#13121A",
                  },
                }}
                onDayClick={handleDayClick}
              />
            </div>
          </div>
        )}
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

export default PurchaseDate;
