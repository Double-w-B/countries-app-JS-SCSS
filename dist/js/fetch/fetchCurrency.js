const currencyExUrl =
  `https://api.getgeoapi.com/v2/currency/convert?api_key=${config.CURR_API_KEY}`;

//   &from=EUR&to=PLN&amount=100&format=json";

const fetchCurrency = async (f, t, a) => {
  let from = `&from=${f}`,
    to = `&to=${t}`,
    amount = `&amount=${a}`,
    endUrl = `${currencyExUrl}${from}${to}${amount}&format=json`;
  try {
    const response = await fetch(endUrl);
    const data = await response.json();
    const { rates } = data;
    const localCurr = Object.values(rates)[0];
    let results;
    if (localCurr && f && t && a) {
      const { rate_for_amount: result } = localCurr;
      return (results = `${a} ${f} = ${parseFloat(result).toFixed(2)} ${t}`);
    } else {
      return (results = false);
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchCurrency;