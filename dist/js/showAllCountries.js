import { countriesData } from "./main.js";
import singleCountryHandle from "./singleCountryHandle.js";
// import singleCountryHandle from "./singleCountryHandle.js";

const $ = document.querySelector.bind(document);

const showAllCountries = () => {
  const allCountries = $(".countries--all");

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

        return `
            <div class="country--single">
            <div class="country--flag">
              <img src="${png}" alt="flag"/>
            </div>
            <p>${common}</p>
          </div>
    `;
      })
      .join(" ");
  // }

  

  singleCountryHandle();
};

export default showAllCountries;
