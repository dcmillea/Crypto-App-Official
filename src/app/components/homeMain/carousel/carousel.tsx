"use client";

import React, { useEffect, useState } from "react";
import CarouselItem from "./carouselItem";

//Redux
import { RootState } from "../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCoinId,
  setCurrentCoin,
  setCurrentCoinAbv,
} from "@/app/state/coin/coinSlice";
import { setComparedCoins } from "@/app/state/compareCoin/compareCoinSlice";

// carousel Imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SampleNextArrow from "./rightArrow";
import SamplePrevArrow from "./leftArrow";

interface IMarketData {
  name: string;
  id: string;
  abbreviation: string;
  image: string;
  marketHigh: string;
  percentChange: string;
  isMarketUp: boolean;
  isSelected: boolean;
}

const CarouselContainer: React.FC = () => {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const currentCoin = useSelector(
    (state: RootState) => state.currentCoin.currentCoin,
  );
  const coinId = useSelector((state: RootState) => state.currentCoin.coinId);
  const isComparingCoins = useSelector(
    (state: RootState) => state.compareCoins.isComparingCoins,
  );
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [top20Coins, setTop20Coins] = useState<IMarketData[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [hasError, setHasError] = useState(false);
  // settings for slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    // eslint-disable-next-line no-console
    nextArrow: <SampleNextArrow onClick={() => console.log("next")} />,
    // eslint-disable-next-line no-console
    prevArrow: <SamplePrevArrow onClick={() => console.log("prev")} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          swipeToSlide: false,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
          arrows: false,
        },
      },
    ],
  };

  const roundToHundrethPlace = (num: number) => {
    const value = Math.abs(num);
    const splitValue = value.toFixed(2).split(".");
    let newValue = splitValue[0] + "." + splitValue[1];
    if (newValue === "0.00") {
      newValue = "0.01";
    }
    return newValue;
  };

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-M2orPqV361oYPRkZk1xRkWz3",
          mode: "no-cors",
        },
      };
      setIsLoading(true);

      const lowerCaseCurrency = currency.toLowerCase();
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${lowerCaseCurrency}`,
        options,
      );

      const result = await response.json();
      const placeHolderArr: IMarketData[] = [];
      for (let i = 0; i < 20; i++) {
        const item = {
          name: result[i].name,
          id: result[i].id,
          isSelected: false,
          abbreviation: result[i].symbol.toUpperCase(),
          image: result[i].image,
          marketHigh: roundToHundrethPlace(result[i].high_24h),
          percentChange: roundToHundrethPlace(
            result[i].market_cap_change_percentage_24h,
          ),
          isMarketUp: result[i].market_cap_change_percentage_24h > 0,
        };
        placeHolderArr.push(item);
      }
      setTop20Coins(placeHolderArr);
      setData(data);
      setHasError(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currency]);

  const handleCarouselClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    name: string,
    abv: string,
  ) => {
    const newList = top20Coins.map((el) => {
      if (isComparingCoins) {
        if (el.name === currentCoin) {
          el.isSelected = true;
        }
        if (el.name === name) {
          el.isSelected = true;
          dispatch(setCurrentCoin(name));
          dispatch(setCoinId(id));
          dispatch(setCurrentCoinAbv(abv));
          dispatch(
            setComparedCoins([
              { name: name, id: id },
              { name: currentCoin, id: coinId },
            ]),
          );
        } else if (el.name !== currentCoin && el.name !== name) {
          el.isSelected = false;
        }
        return el;
      } else {
        if (el.id === id) {
          el.isSelected = true;
          dispatch(setCurrentCoin(name));
          dispatch(setCoinId(id));
          dispatch(setCurrentCoinAbv(abv));
        } else {
          el.isSelected = false;
        }
        return el;
      }
    });
    setTop20Coins(newList);
  };

  return (
    <div className="mb-6 mt-6 h-28 w-full">
      <div className="h-full w-full">
        <div className="w-full">
          <Slider className="w-full" {...settings}>
            {top20Coins.map((el) => (
              <div key={el.name} className="ml-2 mr-2">
                <CarouselItem
                  handleCarouselClick={handleCarouselClick}
                  data={el}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CarouselContainer;
