import Image from "next/image";
import PropTypes from "prop-types";

const PageSwitch = ({
  imgSelected,
  imgUnSelected,
  text,
  isSelected,
  handlePageSwitch,
}) => {
  return (
    <div
      onClick={() => handlePageSwitch(text)}
      className={`flex cursor-pointer items-center justify-center shadow-on-top ${isSelected ? "brightness-100" : "brightness-50"}`}
    >
      <div className="flex h-10 w-10 items-center justify-center">
        <Image
          src={isSelected ? imgSelected : imgUnSelected}
          width={0}
          height={0}
          alt="companyLogo"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="ml-2 flex items-center justify-center text-xl font-semibold text-light-purple-text dark:text-white">
        {text}
      </div>
    </div>
  );
};

PageSwitch.propTypes = {
  handlePageSwitch: PropTypes.func.isRequired,
  imgSelected: PropTypes.node.isRequired,
  imgUnSelected: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default PageSwitch;
