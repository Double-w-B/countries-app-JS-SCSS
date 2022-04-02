import fetchImages from "./fetch/fetchImages.js";
import selectedCountry from "./selectedCountryPage.js";
import {mainContainer} from "./main.js";
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
    });
  });
};

export default singleCountryHandle;
