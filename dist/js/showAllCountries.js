import { countriesData } from "./main.js";
import { handleSelectedCountry } from "./handleSelectedCountry.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let firstLoad = true;

const showAllCountries = () => {
  const allCountries = $(".countries__all");

  const [data] = countriesData;

  allCountries.innerHTML = data
    .sort((a, b) => {
      if (a.name.common.slice(0, 1) > b.name.common.slice(0, 1)) return 1;
      if (a.name.common.slice(0, 1) < b.name.common.slice(0, 1)) return 0;
    })
    .map((country) => {
      const {
        flags: { png },
        name: { common },
      } = country;

      return `
            <div class="countries__single ${firstLoad && "fadeIn"}">
            <div class="countries__single-flag">
              <img src="${png}" alt="flagImg" loading="lazy"/>
            </div>
              <p ${
                common.length > 28
                  ? `style="font-size: 0.9rem;"`
                  : common.length > 35 && `style="font-size: 0.8rem;"`
              }>${common}</p>
          </div>
    `;
    })
    .join(" ");

  setTimeout(() => {
    $$(".countries__single").forEach((country) => {
      country.classList.remove("fadeIn");
    });

    firstLoad = false;
  }, 2000);
  $(".countries__all").addEventListener("click", handleSelectedCountry);

};

export default showAllCountries;
