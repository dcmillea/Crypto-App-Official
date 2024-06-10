import HomePageTabContainer from "./components/homePageTab/homePageTabContainer";
import CompareCoins from "./components/homePageTab/compareCoins";
import CarouselContainer from "./components/homeMain/carousel/carousel";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomePageTabContainer />
      <CompareCoins />
      <CarouselContainer />
    </div>
  );
}
