import Image from "next/image";
import { ThemeSwitch } from "../themeSwitch/ThemeSwitch";

import MainCompanyLogo from "../../images/CompanyLogoMain.png";
import PageSelection from "./pageSelection";
import SearchBar from "./searchBar";
import CurrencySwitcher from "./currencySwitcher";

const SecondaryNavBar = () => {
  return (
    <div
      className="left-0 right-0 top-0 m-0
       flex h-10 w-auto items-center justify-center
       bg-white pb-10 pt-10 
        text-light-purple dark:bg-main-dark-purple dark:text-white"
    >
      <div className="flex w-11/12">
        <div className="flex w-6/12 items-center justify-between">
          <div className="flex">
            <div className=" mr-2 flex h-10 w-20 justify-center">
              <Image
                src={MainCompanyLogo}
                width={0}
                height={0}
                alt="companyLogo"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="ml-3 text-3xl font-bold text-light-purple-text dark:text-white">
              Logoispm
            </div>
          </div>
          <PageSelection />
        </div>
        <div className="flex w-6/12 items-center justify-end">
          <SearchBar />
          <CurrencySwitcher />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default SecondaryNavBar;
