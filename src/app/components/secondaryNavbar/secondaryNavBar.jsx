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
       bg-white pb-7 pt-7 text-light-purple dark:bg-main-dark-purple
        dark:text-white sm:pb-10 sm:pt-10"
    >
      <div className="flex w-full max-w-screen-xl">
        <div className="flex w-2/12 items-center justify-between sm:w-6/12">
          <div className="flex">
            <div className="ml-2 mr-0 h-6 w-10 flex-1 justify-center sm:ml-0 sm:mr-2 sm:h-10 sm:w-20">
              <Image
                src={MainCompanyLogo}
                alt="companyLogo"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="ml-2 hidden flex-1 text-3xl font-bold text-light-purple-text dark:text-white sm:block">
              Logoispm
            </div>
          </div>
          <div className="hidden w-5/12 sm:block">
            <PageSelection />
          </div>
        </div>
        <div className="mr-5 w-full sm:mr-0 sm:w-6/12">
          <div className="flex w-full items-center justify-end">
            <div>
              <SearchBar />
            </div>
            <div className="flex">
              <CurrencySwitcher />
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNavBar;
