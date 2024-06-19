import Image from "next/image";
import PropTypes from "prop-types";

const NavBarCoinVolumeItem = ({ amount, img, color }) => {
  return (
    <div className="flex flex-row justify-evenly align-middle">
      <div className="flex flex-row justify-between">
        <div className="border-3 flex h-5 w-5 items-center justify-center sm:h-6 sm:w-6">
          <Image src={img} width={100} height={100} alt="coinLogo" />
        </div>
      </div>
      <div className="ml-2 mr-2 text-sm sm:ml-4 sm:mr-4 sm:text-base">
        {amount}%
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="h-2 w-11 rounded-sm bg-dark-white-background sm:w-16">
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
