import { useContext, useRef } from "react";
import { SlCalender } from "react-icons/sl";
import { CurrencyConvertorContext, type CurrencyConvertorContextType } from "../../context/currencyConvertor/context";

const DateButton = () => {
  const selectDateRef = useRef<HTMLInputElement | null>(null);
  const {exchangeRateDate, setExchangeRateDate} = useContext(CurrencyConvertorContext) as CurrencyConvertorContextType;

  return (
    <div className="d-flex gap-3 align-items-end">
      <div>As of {exchangeRateDate}</div>
      <input type="date" ref={selectDateRef} className="visually-hidden" onChange={() => setExchangeRateDate(new Date(selectDateRef.current?.value ?? "").toISOString().slice(0, 10))}/>

      <button
        type="button"
        className="btn btn-primary fs-5 py-2 d-flex justify-content-center align-items-center"
        onClick={() =>
          selectDateRef.current?.showPicker?.() ??
          selectDateRef.current?.click()
        }
      >
        <SlCalender />
      </button>
    </div>
  );
};

export default DateButton;
