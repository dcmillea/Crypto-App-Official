import PropTypes from "prop-types";
import arrowIcon from "../../../images/arrow-right.png";
import Image from "next/image";

function SamplePrevArrow(props) {
  const { style, onClick } = props;

  return (
    <div className="relative cursor-pointer">
      <div
        className="absolute right-full top-4 h-10 w-10 rotate-180 rounded-md bg-light-purple"
        style={{
          ...style,
          fontSize: "50px",
          color: "blue",
          display: "block",
        }}
        onClick={onClick}
      >
        <Image src={arrowIcon} width={100} height={100} alt="arrow-icon" />
      </div>
    </div>
  );
}

SamplePrevArrow.propTypes = {
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SamplePrevArrow;
