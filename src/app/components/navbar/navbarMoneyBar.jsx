import PropTypes from "prop-types";

const NavBarMarketCapItem = ({ amount, percent }) => {
  return (
    <div className="ml-2 flex flex-row items-center justify-evenly sm:ml-0">
      <div className="flex flex-row items-center justify-between text-sm sm:m-0 sm:text-base">
        <div>{amount}</div>
        <div className="ml-2 h-2 w-11 rounded-sm bg-dark-white-background sm:ml-4 sm:w-16">
          <div
            className="h-2 rounded-sm bg-white"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

NavBarMarketCapItem.propTypes = {
  amount: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
};

export default NavBarMarketCapItem;
