import Image from "next/image";
import PropTypes from "prop-types";

const NavBarCoinVolumeItem = ({ amount, img, color }) => {
  return (
    <div className="flex flex-row justify-evenly align-middle">
      <div className="flex flex-row justify-between">
        <div className="border-3 flex h-6 w-6 items-center justify-center">
          <Image src={img} alt="coinLogo" />
        </div>
      </div>
      <div className="ml-4 mr-4">{amount}%</div>
      <div className="flex flex-row items-center justify-between">
        <div className="h-2 w-16 rounded-sm bg-dark-white-background">
          <div
            className="h-2 rounded-sm"
            style={{
              width: `${amount}%`,
              backgroundColor: `${color}`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

NavBarCoinVolumeItem.propTypes = {
  amount: PropTypes.number.isRequired,
  img: PropTypes.node.isRequired,
  dimension: PropTypes.number.isRequired,
  color: PropTypes.node.isRequired,
};

export default NavBarCoinVolumeItem;
