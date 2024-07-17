const PortfolioStat = ({ amount }: any) => {
  return (
    <div className="h-1/3 w-11/12 rounded-md border border-grey-nav-text pb-2 pl-4 pr-4 pt-2 text-light-purple-full dark:text-white">
      <div>${amount.toLocaleString()}</div>
      <h2 className="text-sm text-primary-purple dark:text-grey-nav-text">
        Current price
      </h2>
    </div>
  );
};

export default PortfolioStat;
