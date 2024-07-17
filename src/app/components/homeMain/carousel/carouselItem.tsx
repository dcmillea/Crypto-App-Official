"use client";
import React from "react";

import useDeviceType from "../../../hooks/getDeviceScrSize/getDeviceScreenSize";
import Image from "next/image";
import { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import { setCurrentCoin, setCurrentCoinAbv } from "@/app/state/coin/coinSlice";

interface IComponentProps {
  data: {
    name: string;
    id: string;
    abbreviation: string;
    image: string;
    marketHigh: string;
    isMarketUp: boolean;
    percentChange: string;
    isSelected: boolean;
  };
  handleCarouselClick: (
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    // eslint-disable-next-line no-unused-vars
    id: string,
    // eslint-disable-next-line no-unused-vars
    name: string,
    // eslint-disable-next-line no-unused-vars
    abv: string,
  ) => void;
}

const CarouselItem: React.FC<IComponentProps> = ({
  data,
  handleCarouselClick,
}) => {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const currentCoin = useSelector(
    (state: RootState) => state.currentCoin.currentCoin,
  );
  const dispatch = useDispatch();

  const deviceType = useDeviceType();
  const isMobile = deviceType === "mobile";

  useEffect(() => {
    if (data.name === "Bitcoin") {
      dispatch(setCurrentCoin(data.name));
      dispatch(setCurrentCoinAbv(data.abbreviation));
    }
  }, []);

  return (
    <div className={`${isMobile ? "z-0 h-10 w-20" : "z-0 w-60"}`}>
      <div
        onClick={(event) =>
          handleCarouselClick(event, data.id, data.name, data.abbreviation)
        }
        className={`${data.name === currentCoin || data.isSelected ? "bg-gradient-to-b from-bright-puprle to-bright-purple-border drop-shadow-purp-glow" : "bg-white dark:bg-purple-muted"} 
          flex w-full cursor-pointer items-center justify-center rounded-md`}
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
                  className={`flex ${data.isSelected ? "text-white" : "text-black"} items-center justify-center whitespace-pre-line dark:text-white`}
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
                  className={`mr-2 text-sm ${data.isSelected ? "dark:text-white " : "text-text-currency-grey-full dark:text-grey-nav-text"}`}
                >
                  {!isMobile && `${data.marketHigh} ${currency}`}
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
                            fill={data.isMarketUp ? "#00B1A7" : "#FE2264"}
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
                            fill={data.isMarketUp ? "#00B1A7" : "#FE2264"}
                            d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                          />
                        </svg>
                      )}
                    </div>
                    <div
                      className={`text-sm ${data.isMarketUp ? "text-crypto-green-2 dark:text-crypto-green" : "text-crypto-red"}`}
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

export default CarouselItem;
