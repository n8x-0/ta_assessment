import axios from "./httpService";

function isTodaysDate(date: string): string | false {
    const today = new Date().toISOString().slice(0, 10);
    // if incoming date equals today's date, return false
    if (date === today) return false;
    // otherwise return 1 day older (YYYY-MM-DD)
    const d = new Date(date); // expects "YYYY-MM-DD"
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
}

const getCurrencies = async () => {
    const res = await axios.get('/currencies?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2')
    return res.data
}

const getExchangeRate = async (base_currency: string, currency: string, date?: string) => {
    if (date && isTodaysDate(date as string)) {
        const res = await axios.get(`/historical?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2&base_currency=${base_currency}&currencies=${currency}&date=${date}`)
        return res.data[date]
    } else {
        const res = await axios.get(`/latest?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2&base_currency=${base_currency}&currencies=${currency}`)
        return res.data
    }
}

export {
    getCurrencies,
    getExchangeRate,
}