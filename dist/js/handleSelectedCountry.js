import fetchImages from "./fetch/fetchImages.js";
import { mainContainer } from "./main.js";
import hideBtnHandle from "./hideBtnHandle.js";
import selectedCountry from "./selectedCountryPage.js";

const $ = document.querySelector.bind(document);

export const handleSelectedCountry = (e) => {
  let selectedCountryName;

  if (e.target.closest(".countries__single")) {
    selectedCountryName = e.target.closest(".countries__single").innerText;
    fetchImages(selectedCountryName);
  }
  if (e.target.closest(".country__border")) {
    selectedCountryName = e.target.closest(".country__border").innerText;
    fetchImages(selectedCountryName);
  }

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
};
