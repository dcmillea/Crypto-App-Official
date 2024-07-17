import Image from "next/image";
import MiniContainer from "./portoflioMiniContainer";
import PercentageMiniContainer from "./percentageMiniContainer";

const CoinTemplate = ({ data }: any) => {
  return (
    <div className="flex h-64 w-full items-center justify-center rounded-md bg-white dark:bg-dark-blue-chart-bg">
      <div className="flex h-full w-full items-center justify-center pb-6 pl-4 pr-4 pt-6">
        <div className="h-full w-1/3 text-light-purple-full dark:text-white">
          <div className="flex h-full w-full flex-col items-start justify-between">
            <h1 className="flex w-full items-center justify-start text-2xl">
              <Image src={data.image} alt="img" height={40} width={40} />
              <div className="ml-3 font-semibold">
                {data.id} {`[${data.symbol}]`}
              </div>
            </h1>
            <div className="flex h-2/3 flex-col items-start justify-around text-light-purple-full dark:text-white">
              <h4>Total Value</h4>
              <h2 className="flex w-full items-center justify-start">
                <div className="text-xl font-semibold">
                  ${data.totalValue.toLocaleString()} USD
                </div>
                <div className="ml-3 flex items-center justify-center">
                  <div
                    className={`pr-2 ${data.percentChange24Hr > 0 ? "text-crypto-green" : "text-crypto-red"}`}
                  >
                    {data.percentChange24Hr.toFixed(2)}
                  </div>
                  <div>
                    <svg
                      className={`mr-2 w-2 ${data.percentChange24Hr > 0 ? "rotate-0" : "rotate-180"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill={
                          data.percentChange24Hr > 0 ? "#01F1E3" : "#FE2264"
                        }
                        d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                      />
                    </svg>
                  </div>
                </div>
              </h2>
              <p className="text-sm text-black dark:text-grey-nav-text">
                Purchased on {data.purchaseDate}
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-1/3">
          <MiniContainer
            currentPrice={data.currentPrice}
            percentBar={data.marketcapVSvolume}
          />
        </div>
        <div className="h-full w-1/3">
          <PercentageMiniContainer
            percent24Hr={data.percentChange24Hr}
            circPercent={data.circVSmaxSupply}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinTemplate;
