import { displayMatches } from "./displayMatches.js";
import showAllCountries from "./showAllCountries.js";

const $ = document.querySelector.bind(document);

const homePageFunc = () => {
  const countriesCont = $(".countries__container");
  const allCountries = $(".countries__all");
  const inputSearch = $("#search");

  setTimeout(() => {
    document.querySelector(".hero").classList.add("show");
  }, 1000);

  inputSearch.addEventListener("click", () =>
    countriesCont.classList.add("active")
  );
  inputSearch.addEventListener("change", displayMatches);
  inputSearch.addEventListener("keyup", displayMatches);

  countriesCont.addEventListener(
    "mouseover",
    () => window.innerWidth > 992 && countriesCont.classList.add("hover")
  );
  countriesCont.addEventListener("click", (e) => {
    !e.target.closest("#search") &&
      !e.target.closest(".countries__single") &&
      countriesCont.classList.remove("active");
  });

  $("main").addEventListener("click", (e) => {
    if (!e.target.closest(".countries__container")) {
      countriesCont.classList.remove("hover");
      countriesCont.classList.remove("active");
      inputSearch.value = "";
      allCountries.scrollTo(0, 0);
    }

    if (
      Object.values($("main").children).find((child) =>
        child.classList.contains("countries__container")
      )
    ) {
      !e.target.closest(".countries__container") &&
        !e.target.closest(".country__single__info") &&
        !e.target.closest("header") &&
        showAllCountries();
    }
  });

  $("main").addEventListener("mouseover", (e) => {
    if (
      !e.target.closest(".countries__container") &&
      !countriesCont.classList.contains("active")
    ) {
      countriesCont.classList.remove("hover");
      allCountries.scrollTo(0, 0);
    }
  });
};

export default homePageFunc;
