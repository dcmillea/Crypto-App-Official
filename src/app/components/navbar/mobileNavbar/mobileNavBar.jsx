"use client";

import Image from "next/image";
import homeIcon from "../../../images/Overview.png";
import btcExchageIcon from "../../../images/bitcoin-convert.png";
import portfolioIcon from "../../../images/layerBright.png";
import Link from "next/link";

import { useState } from "react";

export default function MobileNavBar() {
  const [isHomeSelected, setIsHomeSelected] = useState(true);
  const [isCoinSelected, setIsCoinSelected] = useState(false);
  const [isPortfolioSelected, setIsPortfolioSelected] = useState(false);

  const handleClick = (name) => {
    if (name === "home" && !isHomeSelected) {
      setIsHomeSelected(true);
      setIsCoinSelected(false);
      setIsPortfolioSelected(false);
    } else if (name === "coin" && !isCoinSelected) {
      setIsHomeSelected(false);
      setIsCoinSelected(true);
      setIsPortfolioSelected(false);
    } else if (name === "portfolio") {
      setIsHomeSelected(false);
      setIsCoinSelected(false);
      setIsPortfolioSelected(true);
    }
  };

  return (
    <div className="fixed bottom-0 mb-2 w-full rounded-md bg-purple-muted-90 pb-5 pt-5 sm:hidden">
      <div className="ml-4 mr-4 mt-2 flex items-center justify-around">
        <Link
          href="/"
          className={`flex w-1/4 flex-col items-center justify-center rounded-md ${isHomeSelected ? "bg-bright-purple-border" : ""}`}
          onClick={() => handleClick("home")}
        >
          <div className="h-10 w-10 flex-col items-center justify-center">
            <Image
              src={homeIcon}
              style={{ width: "100%", height: "100%" }}
              alt="home icon"
            ></Image>
          </div>
          <div className="flex items-center justify-center">Overview</div>
        </Link>
        <Link
          href="/"
          className={`flex w-1/4 flex-col items-center justify-center rounded-md ${isCoinSelected ? "bg-bright-purple-border" : ""}`}
          onClick={() => handleClick("coin")}
        >
          <div className="h-10 w-10 flex-col items-center">
            <Image
              src={btcExchageIcon}
              style={{ width: "100%", height: "100%" }}
              alt="home icon"
            ></Image>
          </div>
          <div className="flex items-center justify-center">Converter</div>
        </Link>
        <Link
          href="/portfolio"
          className={`flex w-1/4 flex-col items-center justify-center rounded-md ${isPortfolioSelected ? "bg-bright-purple-border" : ""}`}
          onClick={() => handleClick("portfolio")}
        >
          <div className="h-10 w-10 flex-col items-center">
            <Image
              src={portfolioIcon}
              style={{ width: "100%", height: "100%" }}
              alt="home icon"
            ></Image>
          </div>
          <div className="flex items-center justify-center">Portfolio</div>
        </Link>
      </div>
    </div>
  );
}
