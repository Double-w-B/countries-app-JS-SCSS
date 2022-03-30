import { displayMatches } from "./displayMatches.js";
import showAllCountries from "./showAllCountries.js";

const $ = document.querySelector.bind(document);

const homePageFunc = () => {
  const countriesCont = $(".countries__container");
  const allCountries = $(".countries__all");
  const inputSearch = $("#search");

  inputSearch.addEventListener("click", () =>
    countriesCont.classList.add("active")
  );
  inputSearch.addEventListener("change", displayMatches);
  inputSearch.addEventListener("keyup", displayMatches);

  countriesCont.addEventListener("mouseover", () =>
    countriesCont.classList.add("hover")
  );
  countriesCont.addEventListener("click", (e) => {
    !e.target.closest("#search") &&
      !e.target.closest(".countries__single") &&
      countriesCont.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".countries__container")) {
      countriesCont.classList.remove("hover");
      countriesCont.classList.remove("active");
      inputSearch.value = "";
      // displayMatches();
      allCountries.scrollTo(0, 0);
    }
      !e.target.closest(".countries__container") &&
        !e.target.closest(".country__single__info") &&
        !e.target.closest("header") &&
        showAllCountries();
  });
};

export default homePageFunc;
