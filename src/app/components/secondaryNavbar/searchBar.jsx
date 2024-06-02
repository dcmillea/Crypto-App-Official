import Image from "next/image";
import searchIcon from "../../images/fluent_search-24-filled.png";
import darkSearchIcon from "../../images/search_dark.png";

const SearchBar = () => {
  return (
    <div className="relative mr-5 flex w-6/12">
      <div className="absolute left-2 top-1.5 mr-2 flex h-7 w-7 items-center justify-center">
        <Image
          className="hidden dark:block"
          src={searchIcon}
          width={0}
          height={0}
          alt="companyLogo"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <Image
          className="block dark:hidden"
          src={darkSearchIcon}
          width={0}
          height={0}
          alt="companyLogo"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <input
        className="bg-darker-white-40 text-light-purple-text h-10 w-full rounded-md border-border-small border-light-purple pl-14 outline-none dark:bg-main-dark-purple dark:text-grey-nav-text"
        type="search"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
