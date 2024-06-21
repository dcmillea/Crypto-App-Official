// import PropTypes from "prop-types";
export default function HomePageTab({ text, isSelected }) {
  return (
    <div
      className={`${isSelected ? " bg-gradient-to-b from-bright-puprle to-bright-purple-border drop-shadow-purp-glow" : "bg-white dark:bg-boring-purple"} 
    flex w-full items-center justify-center rounded-md p-0.5`}
    >
      <div
        className={`${isSelected ? "bg-light-purple-full text-white" : "bg-white text-text-currency-grey-full dark:bg-boring-purple dark:text-white"} 
        flex w-full items-center justify-center rounded-md pb-3 
  pt-3`}
      >
        {text}
      </div>
    </div>
  );
}
