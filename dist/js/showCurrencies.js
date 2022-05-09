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
  let currVal;
  for (const [key] of Object.entries(currency)) {
    if (key === Object.keys(currencies)[0])
      currVal = Object.values(currencies)[0];

    if (key === Object.keys(currencies)[1])
      currVal = Object.values(currencies)[1];
  }
  return `${currVal.name} ${!currVal.symbol ? "" : "(" + currVal.symbol + ")"}`;
};

export const findCurr = (currencies) => {
  if (currencies) {
    for (const [key] of Object.entries(currency)) {
      if (key === Object.keys(currencies)[0]) {
        return `<option value="${key}">${key}</option>`;
      }
      if (key === Object.keys(currencies)[1]) {
        return `<option value="${key}">${key}</option>`;
      }
    }
  }
};
