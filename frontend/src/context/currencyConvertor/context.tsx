import React, { createContext } from "react";

export interface CurrencyConvertorContextType {
  exchangeRateDate: string | undefined;
  setExchangeRateDate: React.Dispatch<React.SetStateAction<string>>;
}

export const CurrencyConvertorContext = createContext<CurrencyConvertorContextType | undefined>(undefined);