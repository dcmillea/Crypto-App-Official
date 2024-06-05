import PropTypes from "prop-types";

const NavBarMarketCapItem = ({ amount, percent }) => {
  return (
    <div className="flex flex-row items-center justify-evenly">
      <div className="flex flex-row items-center justify-between">
        <div>{amount}</div>
        <div className="ml-4 h-2 w-16 rounded-sm bg-dark-white-background">
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
