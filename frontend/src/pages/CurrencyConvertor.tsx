import { Activity, useEffect } from "react";
import { currencyData } from "../utils/temp_data.ts";
import { useForm } from "react-hook-form";
import useCustomQuery from "../hooks/queryService-hook.ts";
import { getCurrencies } from "../utils/services.ts";
import Loader from "../components/shared/Loader.tsx";
import CurrencyConverterform from "../components/currencyConverter/CurrencyConverterform.tsx";
const currenciesData = currencyData.data;
const currencies = Object.keys(currenciesData);

interface FormFields {
  fromCurrency: string;
  toCurrency: string;
  fromCurrencyValue: number;
  toCurrencyValue: number;
}
const CurrencyConvertor = () => {
  const { data, error, isLoading } = useCustomQuery(getCurrencies);
  // const { register, watch, setValue } = useForm<FormFields>({
  //   defaultValues: {
  //     fromCurrency: "SGD",
  //     toCurrency: "USD",
  //   },
  // });
  // const [fromCurrency, toCurrency, fromCurrencyValue, toCurrencyValue] = watch([
  //   "fromCurrency",
  //   "toCurrency",
  //   "fromCurrencyValue",
  //   "toCurrencyValue",
  // ]);
  console.log(data, error);

  // useEffect(() => {
  //   if(fromCurrency) {
  //     setValue("toCurrencyValue", fromCurrencyValue * currenciesData[fromCurrency].value / currenciesData[toCurrency].value)
  //   }
  //   if(toCurrency) {
  //     setValue("fromCurrencyValue", toCurrencyValue * currenciesData[toCurrency].value / currenciesData[fromCurrency].value)
  //   }
  //   return () => {}
  // }, [fromCurrency, toCurrency])

  return (
    // <div className="container py-5 d-flex justify-content-center align-items-center">
    //   <Activity name="loader" mode={isLoading ? "vissible" : "hidden"} children={<Loader />} />
    //   <Activity name="main-content" mode={isLoading || error ? "hidden" : "vissible"} children={
    //       <div className="">
    //         <div className="my-3">
    //           <span className="fs-5">
    //             {fromCurrencyValue ? fromCurrencyValue : 0}{" "}
    //             {currenciesData[fromCurrency].name} equals
    //           </span>
    //           <h1 className="">
    //             {toCurrencyValue ? toCurrencyValue : 0}{" "}
    //             {currenciesData[toCurrency].name}
    //           </h1>
    //         </div>

    //         <div className="input-group">
    //           <input
    //             {...register("fromCurrencyValue")}
    //             type="number"
    //             aria-label="First name"
    //             className="form-control"
    //             placeholder="0"
    //             min={0}
    //           />
    //           <select
    //             {...register("fromCurrency")}
    //             className="form-select"
    //             aria-label="Default select example"
    //           >
    //             <option selected>Select Currency</option>
    //             {currencies.map((dat) => (
    //               <option value={dat}>{currenciesData[dat].name}</option>
    //             ))}
    //           </select>

    //           <input
    //             {...register("toCurrencyValue")}
    //             type="number"
    //             aria-label="First name"
    //             className="form-control"
    //             placeholder="0"
    //             min={0}
    //           />
    //           <select
    //             {...register("toCurrency")}
    //             className="form-select"
    //             aria-label="Default select example"
    //           >
    //             <option selected>Select Currency</option>
    //             {currencies.map((dat) => (
    //               <option value={dat}>{currenciesData[dat].name}</option>
    //             ))}
    //           </select>
    //         </div>
    //       </div>
    //     }
    //   />
    // </div>
    <CurrencyConverterform isLoading={isLoading} error={error} currenciesData={data}/>
  );
};

export default CurrencyConvertor;
