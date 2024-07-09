import Image from "next/image";
import whiteLayeredIcon from "../../images/layerBright.png";
import purpleLayeredIcon from "../../images/layersStack.png";
import AllTimeContainer from "../coinPage/allTimeContainer";

const ProfitContainer = ({ data }) => {
  return (
    <div className="row-start-1 row-end-11 items-center justify-center rounded-md bg-white dark:bg-primary-purple">
      <div className="flex h-full w-full flex-col items-center justify-start">
        <div className="mt-5 flex w-5/6 flex-col items-start justify-center">
          <div className="mb-2 text-4xl">${data.currentPrice}</div>
          <div className="jusify-center flex flex-row items-center">
            Last 24 Hours:
            <div className="ml-4">
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
            </div>
            <div
              className={`${data.isMarketUp ? "text-crypto-green" : "text-crypto-red"}`}
            >
              {data.priceChangePercent}%
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center">
            Profit: $40,137
          </div>
        </div>
        <div className="mb-6 mt-6 hidden dark:block">
          <Image
            src={whiteLayeredIcon}
            alt="layeredIcon"
            width={40}
            height={40}
          />
        </div>
        <div className="mb-6 mt-6 block dark:hidden">
          <Image
            src={purpleLayeredIcon}
            alt="layeredIcon"
            width={40}
            height={40}
          />
        </div>
        <div className="flex w-5/6 flex-col items-center justify-between">
          <AllTimeContainer
            allTimeNumber={data.ath}
            text="All time high"
            isMarketUp={true}
            date={data.athDate}
          />
          <AllTimeContainer
            allTimeNumber={data.atl}
            text="All time low"
            isMarketUp={false}
            date={data.atlDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfitContainer;
