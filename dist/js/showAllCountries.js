import { countriesData } from "./main.js";
import { handleSelectedCountry } from "./handleSelectedCountry.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let firstLoad = true;

const showAllCountries = () => {
  const allCountries = $(".countries__all");

  const [data] = countriesData;

  const sortedCountries = data.sort((a, b) =>
    a.name.common === b.name.common ? 0 : a.name.common < b.name.common ? -1 : 1
  );

  allCountries.innerHTML = sortedCountries
    .map((country) => {
      const {
        flags: { png },
        name: { common },
      } = country;

      const spinnerIcon = "./icons/spinner.gif";

      return `
            <div class="countries__single ${firstLoad && "fadeIn"}">
            <div class="countries__single-flag">
              <img src="${firstLoad ? spinnerIcon : png}" 
              alt="${common} flag image which leads to country information" 
              class=${!firstLoad && "shadow"} />
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

  firstLoad &&
    $$(".countries__single-flag img").forEach((img) => {
      setTimeout(() => {
        sortedCountries.map((country) => {
          if (
            country.name.common ===
            img.parentElement.nextElementSibling.innerText
          ) {
            img.src = country.flags.png;
            img.classList.add("shadow");
          }
        });
      }, 2000);
    });

  setTimeout(() => {
    $$(".countries__single").forEach((country) => {
      country.classList.remove("fadeIn");
    });

    firstLoad = false;
  }, 2000);

  $(".countries__all").addEventListener("click", handleSelectedCountry);
};

export default showAllCountries;
