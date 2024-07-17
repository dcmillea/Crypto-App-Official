import PercentPiece from "./percentPiece";

const PercentageMiniContainer = ({ percent24Hr, circPercent }: any) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-around bg-white dark:bg-purple-muted">
      <PercentPiece text="24h%" percent={percent24Hr} />
      <PercentPiece text="Circ supply vs max supply" percent={circPercent} />
    </div>
  );
};

export default PercentageMiniContainer;
