const PercentPiece = ({ text, percent }: any) => {
  return (
    <div className="h-1/3 w-11/12 rounded-md border border-grey-nav-text pb-2 pl-4 pr-4 pt-2 text-light-purple-full dark:text-white">
      <div className="flex items-center justify-start">
        <div>
          <svg
            className={`mr-2 w-2 ${percent > 0 ? "rotate-0" : "rotate-180"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill={percent > 0 ? "#01F1E3" : "#FE2264"}
              d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
            />
          </svg>
        </div>
        <h2
          className={`${percent > 0 ? "text-crypto-green" : "text-crypto-red"}`}
        >
          {percent.toFixed(2)}%
        </h2>
      </div>
      <h2 className="text-sm text-primary-purple dark:text-grey-nav-text">
        {text}
      </h2>
    </div>
  );
};

export default PercentPiece;
