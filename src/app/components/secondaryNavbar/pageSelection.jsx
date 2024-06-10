"use client";

// Home icons
import darkHomeIconSelected from "../../images/home-2.png";
import darkHomeIconUnSelected from "../../images/home_greyed.png";
import lightHomeIconUnSelected from "../../images/home_light_unFilled.png";
import lightHomeIconSelected from "../../images/home_purp_filled.png";
// Portfolio icons
import portfolioIconSelected from "../../images/layerBright.png";
import portfolioIcon from "../../images/Layers_white.png";
import lighPortfolioIconUnSelected from "../../images/ligh_v_layres.png";
import lighPortfolioIconSelected from "../../images/layersStack.png";

import PageSwitch from "./pageSwitch";
import { useState } from "react";
import Link from "next/link";

const PageSelection = () => {
  const [isHomePageSelected, setIsHomePageSelected] = useState(true);

  const handlePageSwitch = (pageName) => {
    if (pageName === "Home") {
      if (isHomePageSelected) return;
      setIsHomePageSelected(true);
    } else if (pageName === "Portfolio") {
      if (!isHomePageSelected) return;
      setIsHomePageSelected(false);
    }
  };
  return (
    <div className="mr-8 flex w-full items-center justify-between">
      <Link href="/" className="hidden dark:block">
        <PageSwitch
          handlePageSwitch={handlePageSwitch}
          isSelected={isHomePageSelected}
          imgSelected={darkHomeIconSelected}
          imgUnSelected={darkHomeIconUnSelected}
          text="Home"
        />
      </Link>
      <Link href="/" className="block dark:hidden">
        <PageSwitch
          handlePageSwitch={handlePageSwitch}
          isSelected={isHomePageSelected}
          imgSelected={lightHomeIconSelected}
          imgUnSelected={lightHomeIconUnSelected}
          text="Home"
        />
      </Link>
      <Link href="/portfolio" className="hidden dark:block">
        <PageSwitch
          handlePageSwitch={handlePageSwitch}
          isSelected={!isHomePageSelected}
          imgSelected={portfolioIconSelected}
          imgUnSelected={portfolioIcon}
          text="Portfolio"
        />
      </Link>
      <Link href="/portfolio" className="block dark:hidden">
        <PageSwitch
          handlePageSwitch={handlePageSwitch}
          isSelected={!isHomePageSelected}
          imgSelected={lighPortfolioIconSelected}
          imgUnSelected={lighPortfolioIconUnSelected}
          text="Portfolio"
        />
      </Link>
    </div>
  );
};

export default PageSelection;
