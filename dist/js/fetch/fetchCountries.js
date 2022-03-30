import { countriesData } from "../main.js";
import showAllCountries from "../showAllCountries.js";

const $ = document.querySelector.bind(document);
const allCountriesUrl = "https://restcountries.com/v3.1/all";

const fetchCountries = async () => {
  try {
    const response = await fetch(allCountriesUrl);
    const data = await response.json();
    countriesData.push(data);

    showAllCountries();    
  } catch (error) {
    console.log(error);
  }
};

export default fetchCountries;
