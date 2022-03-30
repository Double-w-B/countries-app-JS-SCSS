import homePage from "./homePage.js";
import fetchCountries from "./fetch/fetchCountries.js";
import showAllCountries from "./showAllCountries.js";
import homePageFunc from "./homePageFunc.js";
import singleCountryHandle from "./singleCountryHandle.js";
import aboutInfo from "./about.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const body = $("body");
const header = $("header");
const logo = $(".logo");
const mainContainer = $("main");
let countriesData = [];

homePage();
aboutInfo();

const countriesCont = $(".countries__container");
const allCountries = $(".countries__all");
const inputSearch = $("#search");
fetchCountries();

homePageFunc();

logo.addEventListener("click", () => {
  header.classList.remove("opacity");
  body.removeAttribute("style");
  homePage();
  aboutInfo();
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
