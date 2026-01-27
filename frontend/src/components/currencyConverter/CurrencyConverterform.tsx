import { Activity, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../shared/Loader.tsx";
import { getExchangeRate } from "../../utils/services.ts";
import DateButton from "./DatePicker.tsx";
import { CurrencyConvertorContext, type CurrencyConvertorContextType } from "../../context/currencyConvertor/context.tsx";
import localStorageService from "../../utils/localStorageService.ts";

interface CurrencyConverterformProps {
  isLoading: boolean;
  error: string;
  currenciesData: any;
}

interface FormFields {
  fromCurrency: string;
  toCurrency: string;
  fromCurrencyValue?: number;
  toCurrencyValue?: number;
}

const CurrencyConverterform = ({ isLoading, error, currenciesData }: CurrencyConverterformProps) => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [activeSide, setActiveSide] = useState<"from" | "to">("from");
  const [rate, setRate] = useState<number>(0);
  const {exchangeRateDate, convertedCurrencyHistory, setConvertedCurrencyHistory} = useContext(CurrencyConvertorContext) as CurrencyConvertorContextType;

  const { register, watch, setValue } = useForm<FormFields>({
    defaultValues: {
      fromCurrency: "SGD",
      toCurrency: "USD",
      fromCurrencyValue: undefined,
      toCurrencyValue: undefined,
    },
  });

  const [fromCurrency, toCurrency, fromCurrencyValue, toCurrencyValue] = watch([
    "fromCurrency",
    "toCurrency",
    "fromCurrencyValue",
    "toCurrencyValue",
  ]);

  useEffect(() => {
    if (currenciesData) setCurrencies(Object.keys(currenciesData));
  }, [currenciesData]);

  useEffect(() => {
    let cancelled = false;
    if (!fromCurrency || !toCurrency) return;

    getExchangeRate(fromCurrency, toCurrency, exchangeRateDate as string | undefined).then((res: any) => {
      if (cancelled) return;
      const nextRate = Number(res?.[toCurrency] ?? res?.data?.[toCurrency]);

      setRate(Number.isFinite(nextRate) ? nextRate : 0);
    });
    if(!fromCurrencyValue && !toCurrencyValue) return () => {cancelled = true;};
    if(convertedCurrencyHistory[0]){
      const localStorageItems = localStorageService.getItem("currencyConverter") || [];
      const localStorageHealth = localStorageItems?.length;
        if (localStorageHealth > 21) {
            setConvertedCurrencyHistory((prev) => [...prev.slice(-20), { date: new Date().toISOString(), value:`Converter from ${fromCurrencyValue} ${fromCurrency} to ${toCurrencyValue} ${toCurrency} as of ${exchangeRateDate}` }]);
        }
      setConvertedCurrencyHistory((prev) => [...prev, { date: new Date().toISOString(), value:`Converter from ${fromCurrencyValue} ${fromCurrency} to ${toCurrencyValue} ${toCurrency} as of ${exchangeRateDate}` }]);
    }else{
      setConvertedCurrencyHistory([{ date: new Date().toISOString(), value:`Converter from ${fromCurrencyValue} ${fromCurrency} to ${toCurrencyValue} ${toCurrency} as of ${exchangeRateDate}` }]);
    }
    localStorageService.setItem("currencyConverter", convertedCurrencyHistory);
    
    return () => {
      cancelled = true;
    };
  }, [fromCurrency, toCurrency, exchangeRateDate]);

  useEffect(() => {
    if (!rate) return;

    if (activeSide === "from") {
      if (fromCurrencyValue === undefined || Number.isNaN(fromCurrencyValue)) return;
      const next = fromCurrencyValue * rate;
      setValue("toCurrencyValue", +next.toFixed(2));
    } else {
      if (toCurrencyValue === undefined || Number.isNaN(toCurrencyValue)) return;
      const next = toCurrencyValue / rate;
      setValue("fromCurrencyValue", +next.toFixed(2));
    }
  }, [activeSide, fromCurrencyValue, toCurrencyValue, rate, setValue]);

  const fromReg = register("fromCurrencyValue", {
    setValueAs: (v) => (v === "" ? undefined : Number(v)),
  });

  const toReg = register("toCurrencyValue", {
    setValueAs: (v) => (v === "" ? undefined : Number(v)),
  });

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center">
      <Activity name="loader" mode={isLoading ? "vissible" : "hidden"} children={<Loader />} />

      <Activity
        name="main-content"
        mode={isLoading || error ? "hidden" : "vissible"}
        children={
          <div className="">
            <div className="d-flex justify-content-between align-items-end my-3">
                <div>
                    <span className="fs-5">
                        {fromCurrencyValue?.toFixed(2) ?? 0} {currenciesData && currenciesData[fromCurrency]?.name} equals
                    </span>
                    <h1 className="">
                        {toCurrencyValue?.toFixed(2) ?? 0} {currenciesData && currenciesData[toCurrency]?.name}
                    </h1>
                </div>
                <DateButton />
            </div>

            <div className="input-group">
              <input
                {...fromReg}
                type="number"
                aria-label="First name"
                className="form-control"
                placeholder="0"
                min={0}
                onFocus={() => setActiveSide("from")}
                onChange={(e) => {
                  setActiveSide("from");
                  fromReg.onChange(e);
                }}
              />

              <select {...register("fromCurrency")} className="form-select" aria-label="Default select example" value={fromCurrency}>
                {currencies.map((dat) => (
                  <option key={dat} value={dat}>
                    {currenciesData && currenciesData[dat]?.name}
                  </option>
                ))}
              </select>

              <input
                {...toReg}
                type="number"
                aria-label="First name"
                className="form-control"
                placeholder="0"
                min={0}
                onFocus={() => setActiveSide("to")}
                onChange={(e) => {
                  setActiveSide("to");
                  toReg.onChange(e);
                }}
              />

              <select {...register("toCurrency")} className="form-select" aria-label="Default select example" value={toCurrency}>
                {currencies.map((dat) => (
                  <option key={dat} value={dat}>
                    {currenciesData && currenciesData[dat]?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default CurrencyConverterform;
