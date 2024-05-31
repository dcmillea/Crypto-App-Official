import PropTypes from "prop-types";

const NavBarMarketCapItem = ({ amount }) => {
  return (
    <div className="flex flex-row items-center justify-evenly">
      <div className="flex flex-row items-center justify-between">
        <div>{amount}</div>
        <div className="bg-dark-white-background ml-4 h-2 w-16 rounded-sm">
          <div className="h-2 w-8 rounded-sm bg-white"></div>
        </div>
      </div>
    </div>
  );
};

NavBarMarketCapItem.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default NavBarMarketCapItem;
