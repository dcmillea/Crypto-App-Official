"use client";

import HomePageTab from "./homePageTab";

// hooks
import { useState } from "react";

export default function HomePageTabContainer() {
  const [isCoinTabSelected, setIsCoinTabSelected] = useState(true);

  const handleClick = (name) => {
    if (name === "coins" && !isCoinTabSelected) {
      setIsCoinTabSelected(true);
    } else if (name === "converter" && isCoinTabSelected) {
      setIsCoinTabSelected(false);
    }
  };

  return (
    // make sure to import back into this home component, may need to change based on
    // infinite scrolling for coins.
    // For mobile, these components should be a nav bar at the bottom of phone
    <div className="mt-12 hidden w-5/12 rounded-md bg-white dark:bg-purple-muted sm:block">
      <div className="mb-1 ml-2 mr-2 mt-1 flex w-full cursor-pointer items-center justify-center">
        <div
          onClick={() => handleClick("coins")}
          className="flex w-full items-center justify-center"
        >
          <HomePageTab text="Coins" isSelected={isCoinTabSelected} />
        </div>
        <div
          onClick={() => handleClick("converter")}
          className="flex w-full items-center justify-center"
        >
          <HomePageTab text="Converter" isSelected={!isCoinTabSelected} />
        </div>
      </div>
    </div>
  );
}
