import { useState } from "react";
import { CurrencyConvertorContext } from "./context";

const CurrencyConvertorCtx = ({ children }: { children: React.ReactNode }) => {
  const [exchangeRateDate, setExchangeRateDate] = useState<string>(new Date().toISOString().slice(0, 10));

  return (
    <CurrencyConvertorContext.Provider value={{ exchangeRateDate, setExchangeRateDate }}>
      {children}
    </CurrencyConvertorContext.Provider>
  );
};

export default CurrencyConvertorCtx;