import { currency } from "./data/data.js";

export const showAllCurrencies = () => {
  return Object.keys(currency)
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    .map((curr) => {
      return `<option value="${curr}">${curr}</option>`;
    })
    .join("");
};

export const showCurr = (currencies) => {
  const currVal = Object.values(currencies)[0];
  return `${currVal.name} (${currVal.symbol})`;
};

export const findCurr = (currencies) => {
  if (currencies) {
    for (const [key, value] of Object.entries(currency)) {
      if (key === Object.keys(currencies)[0]) {
        return `<option value="${key}">${key}</option>`;
      }
    }
  }
};
