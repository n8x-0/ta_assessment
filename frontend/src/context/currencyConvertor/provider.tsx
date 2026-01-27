import { useState } from "react";
import { CurrencyConvertorContext } from "./context";
import localStorageService from "../../utils/localStorageService";

const CurrencyConvertorCtx = ({ children }: { children: React.ReactNode }) => {
  const [exchangeRateDate, setExchangeRateDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [convertedCurrencyHistory, setConvertedCurrencyHistory] = useState<any[]>(localStorageService.getItem("currencyConverter") || []);
  
  return (
    <CurrencyConvertorContext.Provider value={{ exchangeRateDate, setExchangeRateDate, convertedCurrencyHistory, setConvertedCurrencyHistory }}>
      {children}
    </CurrencyConvertorContext.Provider>
  );
};

export default CurrencyConvertorCtx;