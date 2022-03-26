import { displayMatches } from "./displayMatches.js";
import showAllCountries from "./showAllCountries.js";

const $ = document.querySelector.bind(document);

const homePageFunc = () => {
  const countriesCont = $(".countries--container");
  const allCountries = $(".countries--all");
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
      !e.target.closest(".country--single") &&
      countriesCont.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".countries--container")) {
      countriesCont.classList.remove("hover");
      countriesCont.classList.remove("active");
      inputSearch.value = "";
      // displayMatches();
      allCountries.scrollTo(0, 0);
    }
    !e.target.closest(".countries--container") &&
      !e.target.closest(".country--single--info") &&
      showAllCountries();
  });
};

export default homePageFunc;
