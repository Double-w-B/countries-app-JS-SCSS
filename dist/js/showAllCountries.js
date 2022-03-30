import { countriesData } from "./main.js";
import singleCountryHandle from "./singleCountryHandle.js";
// import singleCountryHandle from "./singleCountryHandle.js";

const $ = document.querySelector.bind(document);

const showAllCountries = () => {
  const allCountries = $(".countries__all");

  // if (countriesData.length > 0) {
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
      // new Image().addEventListener("load", ()=>{

      // })
      return `
            <div class="countries__single">
            <div class="countries__single-flag">
              <img src="${png}" alt="flag" loading="lazy"/>
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
  // }

  singleCountryHandle();
};

export default showAllCountries;
