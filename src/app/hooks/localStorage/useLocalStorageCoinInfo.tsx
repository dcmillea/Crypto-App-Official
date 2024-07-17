import { useState } from "react";

interface ICoinInfo {
  coinName: string;
  coinValue: number;
  coinPurchasePrice: number;
  coinPurchaseDate: string;
}

const useLocalStorageCoinInfo = (): [
  ICoinInfo[],
  // eslint-disable-next-line no-unused-vars
  (value: ICoinInfo[]) => void,
] => {
  const key = "SAVED_COINS";

  // Retrieve inital value if it is there
  const storedValue = localStorage.getItem(key);
  const initial: ICoinInfo[] = storedValue ? JSON.parse(storedValue) : [];

  // Initialize state
  const [value, setValue] = useState<ICoinInfo[]>(initial);

  // A function to update the local storage
  const updatedValue = (newValue: ICoinInfo[]) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updatedValue];
};

export default useLocalStorageCoinInfo;
