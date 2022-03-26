import { fetchImages } from "./fetch/fetchImages.js";
import selectedCountry from "./selectedCountry.js";
import { countriesData } from "./main.js";
const $$ = document.querySelectorAll.bind(document);

const singleCountryHandle = () => {
  console.log("razy");

  $$(".country--single").forEach((country) => {
    country.addEventListener("click", (e) => {
      let selectedCountryName = e.currentTarget.innerText/* .trim() */;
      // console.log(e.currentTarget);
      console.log(selectedCountryName);

      fetchImages(selectedCountryName);
      selectedCountry(selectedCountryName);
      const [data] = countriesData;

      const countryFromList = data.find(
        (country) => country.name.common === selectedCountryName
      );
      // console.log(countryFromList);
    });
  });
};

export default singleCountryHandle;
