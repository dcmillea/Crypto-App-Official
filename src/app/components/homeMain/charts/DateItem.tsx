const DateItem = ({
  text,
  isSelected,
  handleClick,
}: {
  text: string;
  isSelected: boolean;
  /* eslint-disable no-unused-vars */
  handleClick: (text: string) => void;
}) => {
  return (
    <div
      onClick={() => handleClick(text)}
      className={`${isSelected ? " bg-gradient-to-b from-bright-purple-border to-bright-purple-border-trans" : ""} flex cursor-pointer items-center justify-center rounded-md p-0.5`}
    >
      <div
        className={`${isSelected ? "bg-light-purple dark:bg-light-purple-full" : ""} flex w-full items-center justify-center rounded-md pb-1 pl-5 pr-5 pt-1`}
      >
        <div
          className={`${isSelected ? "text-date-selection-black dark:text-date-selection-white" : "text-text-currency-grey-full dark:text-date-selection-grey"}`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default DateItem;
