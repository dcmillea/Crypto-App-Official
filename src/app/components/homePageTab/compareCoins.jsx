"use client";

import Image from "next/image";
import whiteCompareIcon from "../../images/u_comparison.png";
import purpleCompareIcon from "../../images/compare_dark.png";
import xCloseIcon from "../../images/x-close.png";
import xClosePurpleIcon from "../../images/x-close-purp.png";
import { useState } from "react";
import useDeviceType from "../../hooks/getDeviceScrSize/getDeviceScreenSize";

export default function CompareCoins() {
  const [isComparing, setIsComparing] = useState(false);
  const deviceType = useDeviceType();
  const imageSize = deviceType === "mobile" ? 20 : 25;
  const exitText = deviceType === "mobile" ? "Exit" : "Exit Comparison";

  const handleClick = () => {
    if (isComparing) {
      setIsComparing(false);
    } else {
      setIsComparing(true);
    }
  };

  return (
    <div className="mt-5 sm:mt-10">
      <div
        className={`flex ${deviceType === "mobile" ? "items-center" : "items-end"} items-end justify-between`}
      >
        <div
          className={`text-light-purple-text ${deviceType === "mobile" ? "text-xs" : "text-base"} dark:text-grey-nav-text`}
        >
          Select the currency to view statistics
        </div>
        <div
          onClick={handleClick}
          className="flex cursor-pointer items-center justify-center rounded-md bg-white dark:bg-boring-purple"
        >
          <div
            className={`flex items-center justify-between ${deviceType === "mobile" ? " pb-1.5 pl-3 pr-3 pt-1.5" : "pb-3 pl-6 pr-6 pt-3"}`}
          >
            <div className="mr-1 hidden dark:block">
              {!isComparing ? (
                <Image
                  src={whiteCompareIcon}
                  alt="compareIcon"
                  width={imageSize}
                  height={imageSize}
                ></Image>
              ) : (
                <Image
                  src={xCloseIcon}
                  alt="xCloseIcon"
                  width={imageSize}
                  height={imageSize}
                ></Image>
              )}
            </div>
            <div className="mr-1 block dark:hidden">
              {!isComparing ? (
                <Image
                  src={purpleCompareIcon}
                  alt="compareIcon"
                  width={25}
                  height={25}
                ></Image>
              ) : (
                <Image
                  src={xClosePurpleIcon}
                  alt="xCloseIcon"
                  width={25}
                  height={25}
                ></Image>
              )}
            </div>
            <div
              className={`ml-1 ${deviceType === "mobile" ? "text-xs" : "text-base"} text-light-purple-text dark:text-white`}
            >
              {!isComparing ? <div>Compare</div> : <div>{exitText}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
