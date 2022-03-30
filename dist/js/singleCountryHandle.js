import { fetchImages } from "./fetch/fetchImages.js";
import selectedCountry from "./selectedCountry.js";
import { countriesData, mainContainer } from "./main.js";
import hideHandle from "./hideHandle.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const singleCountryHandle = () => {
  console.log("razy");

  $$(".countries__single").forEach((country) => {
    country.addEventListener("click", (e) => {
      let selectedCountryName = e.currentTarget.innerText; /* .trim() */
      // console.log(e.currentTarget);
      console.log(selectedCountryName);
      mainContainer.innerHTML = "";
      fetchImages(selectedCountryName);
      $(".nav").innerHTML = "";
      setTimeout(() => {
        selectedCountry(selectedCountryName);
        $(".nav").innerHTML = `<p>Hide</p>`;
        hideHandle();
      }, 800);
      const [data] = countriesData;
      const countryFromList = data.find(
        (country) => country.name.common === selectedCountryName
      );
      // console.log(countryFromList);
    });
  });
};

export default singleCountryHandle;
