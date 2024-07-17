import PortfolioStat from "./portfolioStat";
import PortfolioBar from "./portfolioStatBar";

const MiniContainer = ({ currentPrice, percentBar }: any) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-around bg-white dark:bg-purple-muted">
      <PortfolioStat amount={currentPrice} />
      <PortfolioBar percent={percentBar} />
    </div>
  );
};

export default MiniContainer;
