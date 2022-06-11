import { countriesData } from "./main.js";
import { handleSelectedCountry } from "./handleSelectedCountry.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const findMatches = (wordToMatch, countriesData) => {
  return countriesData.filter((country) => {
    const regex = new RegExp(wordToMatch, "gi");
    return country.name.common.match(regex);
  });
};

export const displayMatches = () => {
  const allCountries = $(".countries__all");
  const inputSearch = $("#search");
  const [data] = countriesData;

  const matchArray = findMatches(inputSearch.value.trim(), data);
  const matchCountry = matchArray
    .map((country) => {
      const {
        flags: { png },
        name: { common },
      } = country;

      const spinnerIcon = "./icons/spinner.gif";

      return `
     <div class="countries__single">
            <div class="countries__single-flag">
              <img src="${spinnerIcon}" 
           data-src="${png}"

              alt="${common} flag image which leads to country information" 
              class="shadow" 
              />
            </div>
              <p ${
                common.length > 28
                  ? `style="font-size: 0.9rem;"`
                  : common.length > 35 && `style="font-size: 0.8rem;"`
              }>${common}</p>
          </div>
    `;
    })
    .join("");

  allCountries.innerHTML = matchCountry || "<p class='no-matches'>No matches found for your search</p>";
 

  allCountries.scrollTo(0, 0);

  const checkImgPosition = (img) => {
    if (img.getBoundingClientRect().bottom < 860) {
      setTimeout(() => {
        img.firstElementChild.firstElementChild.src =
          img.firstElementChild.firstElementChild.dataset.src;
      }, 1000);
    }
  };

  $$(".countries__single").forEach((img) => {
    checkImgPosition(img);
  });
  allCountries.addEventListener("scroll", () => {
    $$(".countries__single").forEach((img) => {
      checkImgPosition(img);
    });
  });

  allCountries.addEventListener("resize", () => {
    $$(".countries__single").forEach((img) => {
      checkImgPosition(img);
    });
  });

  allCountries.addEventListener("click", handleSelectedCountry);
};
