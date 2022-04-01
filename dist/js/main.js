import homePage from "./homePage.js";
import fetchCountries from "./fetch/fetchCountries.js";
import showAllCountries from "./showAllCountries.js";
import homePageFunc from "./homePageFunc.js";
import singleCountryHandle from "./singleCountryHandle.js";
import aboutBtn from "./aboutBtn.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const body = $("body");
const header = $("header");
const logo = $(".logo");
const mainContainer = $("main");
let countriesData = [];

homePage();
aboutBtn();

const countriesCont = $(".countries__container");
const allCountries = $(".countries__all");
const inputSearch = $("#search");
fetchCountries();

homePageFunc();

logo.addEventListener("click", () => {
  header.classList.remove("opacity");
  body.removeAttribute("style");
  homePage();
  aboutBtn();
  homePageFunc();
  showAllCountries();
});

$(".width").innerHTML = `<p>${window.innerWidth} PX</p>`;



window.addEventListener("resize", () => {
  $(".width").innerHTML = `<p>${window.innerWidth} PX</p>`;

  if (
    $(".selected__country") &&
    window.innerWidth < 769 &&
    !$(".converter__calc").classList.contains("hide") &&
    !$(".countries-btn-container").classList.contains("visible")
  ) {
    $(".info-bottom--converter").classList.add("hide");
    $(".converter__calc").classList.add("hide");
    $(".converter-btn-container").classList.add("visible");
  }

  if (
    $(".selected__country") &&
    window.innerWidth > 769 &&
    (!$(".converter__calc").classList.contains("hide") ||
      !$(".countries-btn-container").classList.contains("visible"))
  ) {
    $(".info-bottom--converter").classList.remove("hide");
    $(".converter__calc").classList.remove("hide");
    $(".converter-btn-container").classList.remove("visible");

    $(".info-bottom--border__countries").classList.remove("hide");
    $$(".country__border").forEach((item) => item.classList.remove("hide"));
    $(".countries-btn-container").classList.remove("visible");
    $(".info-bottom--map").classList.remove("short");
  }
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
