"use client";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import { useEffect, useState } from "react";

interface ICoinAsset {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  percentChange24Hr: number;
  purchaseDate: string;
  marketcapVSvolume: number;
  circVSmaxSupply: number;
  totalValue: number;
  totalValueIncrease: number;
}

interface ICoinAssetResponse {
  coinAssets: ICoinAsset[];
  isLoading: boolean;
  hasError: boolean;
}

const useCoinAssets = (): ICoinAssetResponse => {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const [coinAssets, setCoinAssets] = useState<ICoinAsset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoinAssets = async () => {
      try {
        setIsLoading(true);
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-M2orPqV361oYPRkZk1xRkWz3",
            mode: "no-cors",
          },
        };

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}`,
          options,
        );
        if (!response.ok) {
          throw new Error("failed to fetch the Coin Asset Data");
        }
        const data = await response.json();
        setCoinAssets(data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setHasError(true);
      }
    };

    fetchCoinAssets();
  }, []);

  return { coinAssets, isLoading, hasError };
};

export default useCoinAssets;

// Things we are going to need:

// 1. Name -- x
// 2. Id -- x
// 3. Icon -- x
// 4. Total Value --> this will need to be customized for when the user bought it -- x
// 5. Total Value Increase --> again, customizable for when user bought coin -- x
// 6. Purchase Date --> x
// 7. Current Price -- x
// 8. Market cap vs volume --> volume / marketCap -- x
// 9. 24hr% --> price_change_24h -- x
// 10. circulating supply vs max supply --> circ Supply / max supply -- x
// 11. Symbol -- x
