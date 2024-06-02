import NavBar from "../navbar";
import SecondaryNavBar from "../../secondaryNavbar/secondaryNavBar";

const PrimaryNavBar = () => {
  return (
    <div
      className="sticky left-0 right-0 
    top-0 m-0"
    >
      <NavBar />
      <SecondaryNavBar />
    </div>
  );
};

export default PrimaryNavBar;
