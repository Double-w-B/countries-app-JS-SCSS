import { mainContainer, countriesData } from "./main.js";
import { currency } from "./data.js";
import { fetchImages } from "./fetch/fetchImages.js";
import { fetchCurrency } from "./fetch/fetchCurrency.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* icons */
const continentIco = "./icons/continent.png";
const areaIco = "./icons/area.png";
const populationIco = "./icons/population.png";
const capitalIco = "./icons/capital.png";
const languageIco = "./icons/language.png";
const currencyIco = "./icons/currency.png";
const pointIco = "./icons/point.png";
const borderIco = "./icons/border.png";
const currencyConIco = "./icons/currencyConIco.png";

const selectedCountry = (countryName) => {
  const [data] = countriesData;
  let borderCountries = [];
  let currChange = true;

  const foundCountry = data.find((country) => {
    if (country.name.common === countryName) return country;
  });

  const {
    name: { common, official },
    coatOfArms: { png: coa },
    region,
    subregion,
    area,
    population,
    capital,
    languages,
    currencies,
    maps: { googleMaps },
    borders,
    flags: { png: flag },
    flag: flagIcon,
  } = foundCountry;

  const showLang = () => {
    const langVal = Object.values(languages);
    if (langVal.length > 1) {
      return `${langVal[0]}, ${langVal[1]}`;
    } else {
      return langVal[0];
    }
  };

  const showAllCurrencies = Object.keys(currency)
    .map((curr) => {
      return `<option value="${curr}">${curr}</option>`;
    })
    .join("");

  const showCurr = () => {
    const currVal = Object.values(currencies)[0];
    return `${currVal.name} (${currVal.symbol})`;
  };

  const findCurr = () => {
    for (const [key, value] of Object.entries(currency)) {
      if (value === Object.values(currencies)[0].name) {
        return `<option value="${key}">${key}</option>`;
      }
    }
  };

  borders &&
    data.map((country) => {
      borders.some((border) => {
        if (country.cca3 === border) borderCountries.push(country);
      });
    });

  const showBorderCountries = () => {
    $(".countries--border").innerHTML = borderCountries
      .map((country) => {
        const {
          name: { common },
          flags: { png: flag },
        } = country;

        return `<div class="country--border">
      <div class="country--border--flag">
      <img src="${flag}" alt="flag" />
      </div>
      <h4>${common}</h4>
    </div>`;
      })
      .join("");
  };

  mainContainer.innerHTML = `
<div class="country--single--info">
        <div class="info--top">
          <div class="info--top--main">
            <h1>${common} <img src="${coa}" alt="coatOfArms" title="Coat Of Arms"></h1>
            <h3>(${official})</h3>
            <p><img src="${continentIco}" alt="icon" />
             ${region} ${subregion ? "(" + subregion + ")" : ""}
             </p>
            <p><img src="${areaIco}" alt="icon" />area: 
            ${area.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ")}
            km <sup>2</sup></p>
            <p><img src="${populationIco}" alt="icon" />
            population: ${population
              .toString()
              .replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, " ")}
              </p>
            <p><img src="${capitalIco}" alt="icon" />
            capital: ${capital ? capital : "no capital"}</p>
            <p><img src="${languageIco}" alt="icon" />
            ${Object.keys(languages).length > 1 ? "languages:" : "language:"}
             ${languages ? showLang() : "no language"}</p>
            <p><img src="${currencyIco}" alt="icon" />
            currency: ${currencies ? showCurr() : "no currency"}</p>
          </div>
          <div class="info--top--flag">
            <div class="flag--img"></div>
            <p>Flag of ${common}</p>
          </div>
        </div>
        <div class="info--bottom">
          <div class="map--info">
            <p><img src="${pointIco}" alt="icon" />
              check on the map: 
              <a
                href="${googleMaps}"
                target="_blank"
                rel="noopener noreferrer"
                >${common} <span>${flagIcon}</span></a>
            </p>
            <p><img src="${borderIco}" alt="icon" />
            ${
              borders
                ? "Borders with" + " " + borders.length + " " + "countries:"
                : "There are no border countries."
            } </p>
            <div class="countries--border">
            </div>
          </div>
          <div class="currency--exchange">
            <div class="currency--exchange--calc">
          <p><img src="${currencyConIco}" alt="icon" />
          LOCAL CURRENCY CONVERTER</p>
              <label for="amount"
                >Amount
                <input type="text" id="amount" />
              </label>

              <div class="currencies">
                <label for="from"
                  >From
                  <select name="from" id="from">
                  ${currencies && findCurr()}
                  </select>
                </label>
                <label for="to"
                >To
                  <select name="to" id="to">
                    ${currencies && showAllCurrencies}
                  </select>
                </label>
              </div>

                <button class="change">
                  <img src="./img/exchange.png" alt="icon" />
                </button>
              <button class="convert">Convert</button>
              <div class="result"></div>
            </div>
          </div>
        </div>
      </div>
`;
  showBorderCountries();

  $(".flag--img").style.backgroundImage = `url(${flag})`;

  $$(".country--border").forEach((country) => {
    country.addEventListener("click", (e) => {
      let selectedCountryName = e.currentTarget.innerText;
      fetchImages(selectedCountryName);
      selectedCountry(selectedCountryName);
    });
  });

  $(".change").addEventListener("click", () => {
    currChange = !currChange;
    $(".currencies").innerHTML = `
                <label for="from"
                  >From
                  <select name="from" id="from">
                  ${currencies && currChange ? findCurr() : showAllCurrencies}
                  </select>
                </label>
         
                <label for="to"
                  >To
                  <select name="to" id="to">
                    ${currencies && currChange ? showAllCurrencies : findCurr()}
                  </select>
                </label>
  `;
  });

  $(".convert").addEventListener("click", () => {
    const from = $("#from").value,
      to = $("#to").value,
      amount = $("#amount").value;

    fetchCurrency(from, to, amount).then(
      (result) => ($(".result").innerHTML = result)
    );
  });
};

export default selectedCountry;
