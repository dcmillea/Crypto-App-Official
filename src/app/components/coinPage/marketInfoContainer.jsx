import MarketItem from "./marketItem";
import ProgressBar from "./progressBar";

const MarketInfoContainer = ({ data }) => {
  return (
    <div className="grid h-full grid-rows-7">
      <MarketItem text="Market Cap" amount={data.marketCap} />
      <MarketItem
        text="Fully Diluted Valuation"
        amount={data.fullyDilutedValue}
      />
      <MarketItem text="Volume / Market" amount={data.turnover} />
      <MarketItem text="Total Volume" amount={data.totalVolume} />
      <MarketItem text="Circulating Supply" amount={data.circulation} />
      <MarketItem text="Max Supply" amount={data.maxSupply} />
      <div className="ml-8 w-10/12">
        <div className="mt-1 h-full w-full">
          <ProgressBar percentValue={data.circulationPercent} />
        </div>
      </div>
    </div>
  );
};

export default MarketInfoContainer;
