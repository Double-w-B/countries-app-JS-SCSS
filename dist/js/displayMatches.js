import { countriesData, singleCountryHandle } from "./main.js";

const $ = document.querySelector.bind(document);

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

  const matchArray = findMatches(inputSearch.value, data);
  const matchCountry = matchArray
    .map((country) => {
      const {
        flags: { png },
        name: { common },
      } = country;
      return `
     <div class="countries__single">
            <div class="countries__single-flag">
              <img src="${png}" alt="flag" />
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

  allCountries.innerHTML = matchCountry;
  singleCountryHandle();
};
