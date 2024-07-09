const MarketItem = ({ text, amount }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-full w-11/12 items-center justify-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center">
            <div className="shadow-omni rounded-full shadow-bright-purple-border">
              <div
                className="rounded-full bg-gradient-to-b
             from-bright-purple-border to-bright-purple-border-trans 
             font-bold text-white filter 
             transition-shadow duration-300"
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full
               bg-light-purple text-4xl"
                >
                  +
                </div>
              </div>
            </div>
            <div className="ml-2 text-lg">{text}</div>
          </div>
          <div className="mr-10 text-2xl">${amount}</div>
        </div>
      </div>
    </div>
  );
};

export default MarketItem;
