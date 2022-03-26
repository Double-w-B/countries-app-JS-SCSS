import { countriesData, singleCountryHandle } from "./main.js";
const $ = document.querySelector.bind(document);

const findMatches = (wordToMatch, countriesData) => {
  return countriesData.filter((country) => {
    const regex = new RegExp(wordToMatch, "gi");
    return country.name.common.match(regex);
  });
};

export const displayMatches = () => {
  const allCountries = $(".countries--all");
  const inputSearch = $("#search");
  const [data] = countriesData;

  const matchArray = findMatches(inputSearch.value, data);
  const matchCountry = matchArray
    .map((country) => {
      const {
        flags: { png },
        name: { common },
      } = country;
      return `
     <div class="country--single">
            <div class="country--flag">
              <img src="${png}" alt="" />
            </div>
            <p>${common}</p>
          </div>
    `;
    })
    .join("");

  allCountries.innerHTML = matchCountry;
  singleCountryHandle();
};
