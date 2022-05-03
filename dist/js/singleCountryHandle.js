import fetchImages from "./fetch/fetchImages.js";
import { mainContainer } from "./main.js";
import hideBtnHandle from "./hideBtnHandle.js";
import selectedCountry from "./selectedCountryPage.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const singleCountryHandle = () => {
  $$(".countries__single").forEach((country) => {
    country.addEventListener("click", (e) => {
      let selectedCountryName = e.currentTarget.innerText;

      fetchImages(selectedCountryName);

      localStorage.setItem(
        "selectedCountryName",
        JSON.stringify(selectedCountryName.split(" ").join("_"))
      );

      mainContainer.innerHTML = "";

      window.history.pushState(
        selectedCountryName,
        "",
        `/countries/${selectedCountryName.split(" ").join("_")}`
      );

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
