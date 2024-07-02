const CoinItemCategories = () => {
  return (
    <div className="grid  w-full grid-cols-coinCard items-center gap-x-8 pl-2 pr-2 text-sm text-text-currency-grey-full dark:text-grey-nav-text">
      <div className="ml-2">#</div>
      <div className="ml-2">Name</div>
      <div className="ml-2">Price</div>
      <div className="ml-2">1h%</div>
      <div className="ml-1">24%</div>
      <div className="ml-1">7d%</div>
      <div className="">24h volume / Market Cap</div>
      <div className="">Circulating / Total Supply</div>
      <div>Last 7d</div>
    </div>
  );
};

export default CoinItemCategories;
