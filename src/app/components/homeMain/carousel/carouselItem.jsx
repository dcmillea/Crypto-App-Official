"use client";
import PropTypes from "prop-types";

import useDeviceType from "../../../hooks/getDeviceScrSize/getDeviceScreenSize";
import Image from "next/image";
import { useState } from "react";

const CarouselItem = ({ data }) => {
  const [isSelected, setIsSelected] = useState(false);
  const deviceType = useDeviceType();
  const isMobile = deviceType === "mobile";

  return (
    <div className={`${isMobile ? "h-10 w-20" : "w-60"}`}>
      <div
        onClick={() => setIsSelected(!isSelected)}
        className={`${isSelected ? "bg-gradient-to-b from-bright-puprle to-bright-purple-border drop-shadow-purp-glow" : "bg-white dark:bg-purple-muted"} 
          flex w-full items-center justify-center rounded-md`}
      >
        <div
          className={`${isMobile ? "mb-2 ml-1 mr-1 mt-2" : "m-2"} flex w-full items-center justify-center`}
        >
          <div
            className={`flex ${isMobile ? "h-6 justify-center" : "h-14 justify-start"} w-full items-center`}
          >
            <div className={`${isMobile ? "ml-1.5 w-full" : "mr-4"}`}>
              <Image
                src={data.image}
                alt="icon"
                width={`${isMobile ? "20" : "50"}`}
                height={`${isMobile ? "20" : "50"}`}
              />
            </div>
            <div
              className={`flex w-full flex-col ${isMobile ? "items-center" : "items-start"} justify-between`}
            >
              <div className="flex flex-col">
                <div
                  className={`flex ${isSelected ? "text-white" : "text-black"} items-center justify-center whitespace-pre-line dark:text-white`}
                >
                  {isMobile ? (
                    <div className="mr-1 flex items-center justify-center text-sm">
                      {data.abbreviation}
                    </div>
                  ) : (
                    `${data.name} [${data.abbreviation}]`
                  )}
                </div>
              </div>
              <div className="justify-starttext-xs flex w-full flex-row items-center">
                <div
                  className={`mr-2 text-sm ${isSelected ? "dark:text-white " : "text-text-currency-grey-full dark:text-grey-nav-text"}`}
                >
                  {!isMobile && `${data.marketHigh} USD`}
                </div>
                {!isMobile && (
                  <div className="flex items-center justify-center">
                    <div>
                      {data.isMarketUp ? (
                        <svg
                          className={`mr-1.5 w-2 ${data.isMarketUp ? "rotate-0" : "rotate-180"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path
                            fill={data.isMarketUp ? "#01F1E3" : "#FE2264"}
                            d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className={`mr-2 w-2 ${data.isMarketUp ? "rotate-0" : "rotate-180"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path
                            fill={data.isMarketUp ? "#01F1E3" : "#FE2264"}
                            d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                          />
                        </svg>
                      )}
                    </div>
                    <div
                      className={`text-sm ${data.isMarketUp ? "text-crypto-green" : "text-crypto-red"}`}
                    >
                      {data.percentChange} %
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.node.isRequired,
    abbreviation: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    marketHigh: PropTypes.number.isRequired,
    isMarketUp: PropTypes.bool.isRequired,
    percentChange: PropTypes.number.isRequired,
  }),
};

export default CarouselItem;
