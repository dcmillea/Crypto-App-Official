import Image from "next/image";
import PropTypes from "prop-types";

const PageSwitch = ({ img, text }) => {
  return (
    <div className="shadow-on-top flex items-center justify-center">
      <div className="flex h-10 w-10 items-center justify-center">
        <Image
          src={img}
          width={0}
          height={0}
          alt="companyLogo"
          style={{
            width: "100%",
            height: "100%",
          }}
          className="brightness-50"
        />
      </div>
      <div className="ml-2 flex items-center justify-center text-xl font-semibold text-light-purple-text dark:text-white-muted-50">
        {text}
      </div>
    </div>
  );
};

PageSwitch.propTypes = {
  img: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default PageSwitch;
