import HomePageTabContainer from "./components/homePageTab/homePageTabContainer";
import CompareCoins from "./components/homePageTab/compareCoins";
import CarouselContainer from "./components/homeMain/carousel/carousel";
import ChartContainer from "./components/homeMain/homeLayout/gridLayout";
import DateSelection from "./components/homeMain/charts/DateSelection";
import CoinList from "./components/homeMain/infiniteScroll/coinList";

export default function Home() {
  return (
    <div className="mt-32 flex flex-col">
      <HomePageTabContainer />
      <CompareCoins />
      <CarouselContainer />
      <ChartContainer />
      <DateSelection />
      <CoinList />
      {/* we can conditionally render the carouselContainer, chartContainer, and the 
        coin list when we go to coin page, for now leave it here. And the same goes
        for the portflio, render the portfolio conditionally (not implemented yet)
      */}
    </div>
  );
}
