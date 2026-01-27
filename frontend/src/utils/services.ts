const getCurrencies = async () => {
    try {
        const res = await fetch('https://api.freecurrencyapi.com/v1/currencies?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2')
        const data = await res.json()
        
        return data
    } catch (error) {
        console.log(error);
    }
}

function isTodaysDate(date: string): string | false {
  const today = new Date().toISOString().slice(0, 10);
  // if incoming date equals today's date, return false
  if (date === today) return false;
  // otherwise return 1 day older (YYYY-MM-DD)
  const d = new Date(date); // expects "YYYY-MM-DD"
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}


const getExchangeRate = async (base_currency: string, currency: string, date?: string) => {
    try {
        if(date && isTodaysDate(date as string)){
            const res = await fetch(`https://api.freecurrencyapi.com/v1/historical?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2&base_currency=${base_currency}&currencies=${currency}&date=${date}`)
            const data = await res.json();
            return data
        }else{
            const res = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2&base_currency=${base_currency}&currencies=${currency}`)
            const data = await res.json();
            return data
        }
    } catch (error) {
        console.log(error);
    }
}

const getHistory = () => {

}

export {
    getCurrencies,
    getExchangeRate,
    getHistory
}