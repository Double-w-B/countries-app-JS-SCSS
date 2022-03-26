const currencyExUrl =
  "https://api.getgeoapi.com/v2/currency/convert?api_key=687ca83674e781ffb2601ba3d4092091e7efdbe5";

//   &from=EUR&to=PLN&amount=100&format=json";

export const fetchCurrency = async (f, t, a) => {
  let from = `&from=${f}`,
    to = `&to=${t}`,
    amount = `&amount=${a}`,
    endUrl = `${currencyExUrl}${from}${to}${amount}&format=json`;
  try {
    const response = await fetch(endUrl);
    const data = await response.json();
    const { rates } = data;
    const localCurr = Object.values(rates)[0];
    const { currency_name: name, rate_for_amount: result } = localCurr;
    const results = `${a}${f} = ${parseFloat(result).toFixed(2)} ${name}`;
    return results;
  } catch (error) {
    console.log(error);
  }
//  return results;
};
