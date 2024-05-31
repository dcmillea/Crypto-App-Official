import Image from "next/image";
import PropTypes from "prop-types";

const NavBarCoinVolumeItem = ({ amount, img, dimension }) => {
  return (
    <div className="flex flex-row justify-evenly align-middle">
      <div className="flex flex-row justify-between">
        <div className="border-3 mr-2 flex h-6 w-6 items-center justify-center">
          <Image
            src={img}
            width={0}
            height={0}
            alt="coinLogo"
            style={{ width: `${dimension}%`, height: `${dimension}%` }}
          />
        </div>
      </div>
      <div className="ml-4 mr-4">{amount}%</div>
      <div className="flex flex-row items-center justify-between">
        <div className="bg-dark-white-background ml-4 h-2 w-16 rounded-sm">
          <div className="h-2 w-8 rounded-sm bg-white"></div>
        </div>
      </div>
    </div>
  );
};

NavBarCoinVolumeItem.propTypes = {
  amount: PropTypes.number.isRequired,
  img: PropTypes.node.isRequired,
  dimension: PropTypes.number.isRequired,
};

export default NavBarCoinVolumeItem;
