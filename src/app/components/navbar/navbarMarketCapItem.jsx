import PropTypes from "prop-types";

const NavBarMarketCapItem = ({ text, amount, isMarketUp }) => {
  return (
    <div className="flex flex-row justify-evenly align-middle">
      <div className="flex flex-row justify-between">
        <svg
          className={`mr-2 w-2 ${isMarketUp ? "rotate-0" : "rotate-180"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill={isMarketUp ? "#01F1E3" : "#FE2264"}
            d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
          />
        </svg>
        <div>{amount}</div>
      </div>
      <div className="ml-1.5 mr-4">{text}</div>
    </div>
  );
};

NavBarMarketCapItem.propTypes = {
  amount: PropTypes.number.isRequired,
  isMarketUp: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavBarMarketCapItem;
