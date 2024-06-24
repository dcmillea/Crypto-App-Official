import React from "react";
import Image from "next/image";
import SmallScrollChart from "./smallScrollChart";

const CoinItem: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="mb-3 mt-3 w-full rounded-md bg-purple-muted pb-5 pl-2 pr-2 pt-5">
      <div className="grid w-full grid-cols-coinCard items-center gap-x-8 pl-2 pr-2">
        <div className="">{data.number}</div>
        <div className="flex h-12 items-center justify-start">
          <div className="mr-4">
            <Image src={data.icon} alt="icon" width={40} height={40} />
          </div>
          <div className="flex w-2/3 items-center justify-start">
            <div className="flex w-full flex-col items-start justify-center">
              <div>
                {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
              </div>
              <div>{`[${data.abv.toUpperCase()}]`}</div>
            </div>
          </div>
        </div>
        <div>${data.price.toFixed(2)}</div>
        <div
          className={`flex items-center justify-start ${data.isPrice1HrUp ? "text-crypto-green" : "text-crypto-red"}`}
        >
          <div>
            {data.isPrice1HrUp ? (
              <svg
                className={`mr-1.5 w-2 ${data.isPrice1HrUp ? "rotate-0" : "rotate-180"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill={data.isPrice1HrUp ? "#00B1A7" : "#FE2264"}
                  d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                />
              </svg>
            ) : (
              <svg
                className={`mr-2 w-2 ${data.isPrice1HrUp ? "rotate-0" : "rotate-180"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill={data.isPrice1HrUp ? "#00B1A7" : "#FE2264"}
                  d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                />
              </svg>
            )}
          </div>
          <div>
            {data.priceChange1Hr !== undefined &&
              data.priceChange1Hr.toFixed(2)}
            %
          </div>
        </div>
        <div
          className={`flex items-center justify-start ${data.isPrice24HrUp ? "text-crypto-green" : "text-crypto-red"}`}
        >
          <div>
            {data.isPrice24HrUp ? (
              <svg
                className={`mr-1.5 w-2 ${data.isPrice24HrUp ? "rotate-0" : "rotate-180"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill={data.isPrice24HrUp ? "#00B1A7" : "#FE2264"}
                  d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                />
              </svg>
            ) : (
              <svg
                className={`mr-2 w-2 ${data.isPrice24HrUp ? "rotate-0" : "rotate-180"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill={data.isPrice24HrUp ? "#00B1A7" : "#FE2264"}
                  d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                />
              </svg>
            )}
          </div>
          <div>
            {data.priceChange24Hr !== undefined &&
              data.priceChange24Hr.toFixed(2)}
            %
          </div>
        </div>
        <div
          className={`flex items-center justify-start ${data.isPrice7dUp ? "text-crypto-green" : "text-crypto-red"}`}
        >
          <div>
            {data.isPrice7dUp ? (
              <svg
                className={`mr-1.5 w-2 ${data.isPrice7dUp ? "rotate-0" : "rotate-180"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill={data.isPrice7dUp ? "#00B1A7" : "#FE2264"}
                  d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                />
              </svg>
            ) : (
              <svg
                className={`mr-2 w-2 ${data.isPrice7dUp ? "rotate-0" : "rotate-180"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill={data.isPrice7dUp ? "#00B1A7" : "#FE2264"}
                  d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                />
              </svg>
            )}
          </div>
          <div>
            {data.priceChange7d !== undefined && data.priceChange7d.toFixed(2)}%
          </div>
        </div>
        <div>
          {data.volume24Hr !== undefined &&
            data.totalVolume24Hr !== undefined && (
              <div className="flex w-full flex-col items-center justify-center">
                <div className="flex w-full items-center justify-between text-sm text-light-grey-chart-text">
                  <div>{data.volume24Hr.toFixed(2)}B</div>
                  <div>{data.totalVolume24Hr.toFixed(2)}B</div>
                </div>
                <div
                  className={`relative h-2 ${data.isPrice7dUp ? "bg-crypto-green-trans" : "bg-crypto-red-trans"} w-full rounded-sm bg-white`}
                >
                  <div
                    style={{ width: data.volumeBarString }}
                    className={`absolute left-0 top-0 h-full rounded-sm ${data.isPrice7dUp ? "bg-crypto-green" : "bg-crypto-red"}`}
                  ></div>
                </div>
              </div>
            )}
        </div>
        <div>
          {data.circulatingSupply !== undefined &&
            data.totalCirculatingSupply !== undefined && (
              <div className="flex w-full flex-col items-center justify-center">
                <div className="flex w-full items-center justify-between text-sm text-light-grey-chart-text">
                  <div>{data.circulatingSupply.toFixed(2)}B</div>
                  <div>{data.totalCirculatingSupply.toFixed(2)}B</div>
                </div>
                <div
                  className={`relative h-2 ${data.isPrice7dUp ? "bg-crypto-green-trans" : "bg-crypto-red-trans"} w-full rounded-sm bg-white`}
                >
                  <div
                    style={{ width: data.circulatingBarString }}
                    className={`absolute left-0 top-0 h-full rounded-sm ${data.isPrice7dUp ? "bg-crypto-green" : "bg-crypto-red"}`}
                  ></div>
                </div>
              </div>
            )}
        </div>
        <div className="h-full">
          <SmallScrollChart
            chartData={data.chartData}
            isMarketUp7d={data.isPrice7dUp}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinItem;
