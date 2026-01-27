import React, { createContext } from "react";

export interface CurrencyConvertorContextType {
  exchangeRateDate: string | undefined;
  setExchangeRateDate: React.Dispatch<React.SetStateAction<string>>;
  convertedCurrencyHistory: any[];
  setConvertedCurrencyHistory: React.Dispatch<React.SetStateAction<any[]>>;
}

export const CurrencyConvertorContext = createContext<CurrencyConvertorContextType | undefined>(undefined);