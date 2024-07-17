const PortfolioBar = ({ percent }: any) => {
  return (
    <div className="h-1/3 w-11/12 rounded-md border border-grey-nav-text pb-2 pl-4 pr-4 pt-2">
      <div className="flex flex-col items-start justify-center ">
        <div className="flex h-1/2 w-full items-center justify-between text-crypto-green">
          <h2 className="mb-1 w-1/12">{percent.toFixed(2)}%</h2>
          <div className="h-2 w-9/12 overflow-hidden rounded-md bg-crypto-green-trans">
            <div
              className="h-full bg-crypto-green"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
        <h3 className="text-sm text-primary-purple dark:text-grey-nav-text">
          Market cap vs volume
        </h3>
      </div>
    </div>
  );
};

export default PortfolioBar;
