"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

// Might need this for future data
// type DataType = {
//   globalCurrencyData: object;
// };

interface ContextProps {
  children?: ReactNode;
  currencyId: string;
  setCurrencyId: Dispatch<SetStateAction<string>>;
  marketCap: number;
  setMarketCap: Dispatch<SetStateAction<number>>;
  currentCoin: string;
  setCurrentCoin: Dispatch<SetStateAction<string>>;
  currentCoinAbv: string;
  setCurrentCoinAbv: Dispatch<SetStateAction<string>>;
  currentCoinPrice: number;
  setCurrentCoinPrice: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<ContextProps>({
  currencyId: "",
  setCurrencyId: (): string => "",
  marketCap: 0,
  setMarketCap: (): number => 0,
  currentCoin: "",
  setCurrentCoin: (): string => "",
  currentCoinAbv: "",
  setCurrentCoinAbv: (): string => "",
  currentCoinPrice: 0,
  setCurrentCoinPrice: (): number => 0,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [currencyId, setCurrencyId] = useState("");
  const [marketCap, setMarketCap] = useState(0);
  const [currentCoin, setCurrentCoin] = useState("");
  const [currentCoinAbv, setCurrentCoinAbv] = useState("");
  const [currentCoinPrice, setCurrentCoinPrice] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        currencyId,
        setCurrencyId,
        marketCap,
        setMarketCap,
        currentCoin,
        setCurrentCoin,
        currentCoinAbv,
        setCurrentCoinAbv,
        currentCoinPrice,
        setCurrentCoinPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
