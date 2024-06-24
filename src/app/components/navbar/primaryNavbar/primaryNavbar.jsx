import NavBar from "../navbar";
import SecondaryNavBar from "../../secondaryNavbar/secondaryNavBar";

const PrimaryNavBar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 m-0">
      {/* Desktop Layout */}
      <div className="hidden sm:block">
        <NavBar />
        <SecondaryNavBar />
      </div>

      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <SecondaryNavBar />
        <NavBar />
      </div>
    </div>
  );
};

export default PrimaryNavBar;
