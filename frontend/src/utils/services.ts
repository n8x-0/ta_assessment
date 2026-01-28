import axios from "./httpService";

function isTodaysDate(date: string): boolean {
    const today = new Date().toISOString().slice(0, 10);
    // if incoming date equals today's date, return false
    if (date === today) return false;
    return true
}

const getCurrencies = async () => {
    const res = await axios.get('/currency-converter/currencies')
    return res.data
}

const getExchangeRate = async (base_currency: string, currency: string, date?: string) => {
    if (date && isTodaysDate(date as string)) {
        const res = await axios.get(`/currency-converter/exchange-rate?base_currency=${base_currency}&currency=${currency}&date=${date}`)
        return res.data
    } else {
        const res = await axios.get(`/currency-converter/exchange-rate?base_currency=${base_currency}&currency=${currency}&date=${date}`)
        return res.data
    }
}

export {
    getCurrencies,
    getExchangeRate,
}