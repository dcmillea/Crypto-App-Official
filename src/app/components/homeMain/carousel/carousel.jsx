"use client";

// import useCoinMarketDataFetch from "../../../hooks/getCoinMarketData/getCoinMarketData";
const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d";
import { useEffect, useState } from "react";
import CarouselItem from "./carouselItem";

// carousel Imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SampleNextArrow from "./rightArrow";
import SamplePrevArrow from "./leftArrow";

const CarouselContainer = () => {
  const [data, setData] = useState(null);
  const [top20Coins, setTop20Coins] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [hasError, setHasError] = useState(false);
  // settings for slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  const roundToHundrethPlace = (num) => {
    const value = Math.abs(num);
    const splitValue = value.toFixed(2).split(".");
    let newValue = splitValue[0] + "." + splitValue[1];
    if (newValue === "0.00") {
      newValue = "0.01";
    }
    return newValue;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-M2orPqV361oYPRkZk1xRkWz3",
          },
        };
        setIsLoading(true);
        const response = await fetch(url, options);
        const result = await response.json();

        const placeHolderArr = [];
        for (let i = 0; i < 20; i++) {
          const item = {
            name: result[i].name,
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
    fetchData();
  }, []);

  return (
    <div className="mb-6 mt-6 h-28 w-full">
      <div className="h-full w-full">
        <div className="w-full border">
          <Slider className="w-full" {...settings}>
            {top20Coins.map((el) => (
              <div key={el.name} className="ml-2 mr-2">
                <CarouselItem data={el} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CarouselContainer;
