"use client";
import { useState } from "react";

const SelectionButton = ({ text, btnSelected, handleClick }: any) => {
  // eslint-disable-next-line no-unused-vars
  const [isSelected, setIsSelected] = useState(btnSelected);

  return (
    <div onClick={handleClick} className="h-full w-52">
      {isSelected ? (
        <button className="flex h-full w-full items-center justify-center rounded-md bg-light-purple-full text-white">
          {text}
        </button>
      ) : (
        <button className="flex h-full w-full items-center justify-center rounded-md border border-light-purple-full dark:border-none dark:bg-purple-muted">
          {text}
        </button>
      )}
    </div>
  );
};

export default SelectionButton;
