const AllTimeContainer = ({ allTimeNumber, text, isMarketUp, date }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-start ">
        <div>
          <svg
            className={`mr-2 h-10 w-8 ${isMarketUp ? "rotate-0" : "rotate-180"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill={isMarketUp ? "#01F1E3" : "#FE2264"}
              d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
            />
          </svg>
        </div>
        <div className="text-md">{text}:</div>
        <div className="ml-4 text-2xl">${allTimeNumber}</div>
      </div>
      <div className="mb-6 text-sm text-primary-purple dark:text-light-grey-chart-text">
        {date}
      </div>
    </div>
  );
};

export default AllTimeContainer;
