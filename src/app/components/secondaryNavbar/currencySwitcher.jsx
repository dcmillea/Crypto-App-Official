import moneyIcon from "../../images/cryptocurrency_usd.png";
import moneyIconDark from "../../images/moneyIcon_dark.png";
import downArrow from "../../images/Down (Small).png";
import downArrowDark from "../../images/downArrow_dark.png";
import Image from "next/image";

const CurrencySwitcher = () => {
  return (
    <div className="bg-darker-white-40  mr-5 flex h-10 w-2/12 items-center justify-evenly rounded-md border-border-small border-light-purple dark:bg-main-dark-purple">
      <div className="flex h-6 w-6 items-center justify-center">
        <Image
          className="hidden dark:block"
          src={moneyIcon}
          width={0}
          height={0}
          alt="moneyIcon"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <Image
          className="block dark:hidden"
          src={moneyIconDark}
          width={0}
          height={0}
          alt="moneyIcon"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="dark:text-text-currency-muted-white text-text-currency-grey">
        USD
      </div>
      <div className="flex h-4 w-4 items-center justify-center">
        <Image
          className="hidden dark:block"
          src={downArrow}
          width={0}
          height={0}
          alt="downArrow"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <Image
          className="block dark:hidden"
          src={downArrowDark}
          width={0}
          height={0}
          alt="downArow"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default CurrencySwitcher;
