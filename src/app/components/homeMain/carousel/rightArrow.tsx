// import PropTypes from "prop-types";
import arrowIcon from "../../../images/arrow-right.png";
import Image from "next/image";
import React from "react";

interface SampleNextArrowProps {
  onClick: () => void;
  style?: React.CSSProperties;
}

const SampleNextArrow: React.FC<SampleNextArrowProps> = ({
  onClick,
  style,
}) => {
  return (
    <div className="relative cursor-pointer">
      <div
        className="absolute bottom-4 left-full h-10 w-10 rounded-md bg-light-purple"
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
};

export default SampleNextArrow;
