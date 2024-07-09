const ProgressBar = ({ percentValue }) => {
  const progressBarWidth = `${percentValue * 100}%`;
  const progressBarGain = (percentValue * 100).toFixed(1);
  const progressBarLoss = (100 - percentValue * 100).toFixed(1);

  return (
    <>
      <div className="flex items-center justify-between text-sm">
        <div>{progressBarGain}%</div>
        <div>{progressBarLoss}%</div>
      </div>
      <div className="h-4 w-full rounded-md bg-slate-600 dark:bg-gray-50">
        <div
          style={{ width: progressBarWidth }}
          className="h-full 
          rounded-md
          bg-purple-400 from-light-purple
           to-light-purple shadow-omni 
           shadow-bright-purple-border filter
            transition-shadow duration-300"
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
