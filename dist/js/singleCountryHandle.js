import { fetchImages } from "./fetch/fetchImages.js";
import selectedCountry from "./selectedCountry.js";
import { countriesData, mainContainer, body } from "./main.js";
import hideBtnHandle from "./hideBtnHandle.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const singleCountryHandle = () => {

  $$(".countries__single").forEach((country) => {
    country.addEventListener("click", (e) => {
      let selectedCountryName = e.currentTarget.innerText;

      mainContainer.innerHTML = "";
      fetchImages(selectedCountryName);
      $(".nav").innerHTML = "";

      setTimeout(() => {
        selectedCountry(selectedCountryName);
        $(".nav").innerHTML = `<p>Hide</p>`;
        hideBtnHandle();
      }, 1000);
      const [data] = countriesData;
      const countryFromList = data.find(
        (country) => country.name.common === selectedCountryName
      );
      // console.log(countryFromList);
    });
  });
};

export default singleCountryHandle;
