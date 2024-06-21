import Image from "next/image";

const NavBarItem = ({ text, amount, img }) => {
  return (
    <div className="flex flex-row justify-evenly align-middle">
      <div className="flex flex-row items-center justify-between">
        <div className="border-3 mr-2 flex h-6 w-6 justify-center">
          <Image
            src={img}
            width={0}
            height={0}
            alt="coinLogo"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="text-grey-nav-text">{text}</div>
      </div>
      <div className="ml-4 mr-4">{amount}</div>
    </div>
  );
};

export default NavBarItem;
