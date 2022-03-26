import homePage from "./homePage.js";
import fetchCountries from "./fetch/fetchCountries.js";
import { displayMatches } from "./displayMatches.js";
import { fetchImages } from "./fetch/fetchImages.js";
import showAllCountries from "./showAllCountries.js";
import selectedCountry from "./selectedCountry.js";
import homePageFunc from "./homePageFunc.js";
import singleCountryHandle from "./singleCountryHandle.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const body = $("body");
const header = $("header");
const logo = $(".logo");
const mainContainer = $("main");
let countriesData = [];

homePage();

const countriesCont = $(".countries--container");
const allCountries = $(".countries--all");
const inputSearch = $("#search");
fetchCountries();

homePageFunc();

logo.addEventListener("click", () => {
  homePage();
  homePageFunc();
  showAllCountries();
});



export {
  body,
  header,
  countriesData,
  allCountries,
  inputSearch,
  countriesCont,
  singleCountryHandle,
  mainContainer,
};
