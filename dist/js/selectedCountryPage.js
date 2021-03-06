import { mainContainer, countriesData, header } from "./main.js";
import fetchCurrency from "./fetch/fetchCurrency.js";
import { showAllCurrencies, showCurr, findCurr } from "./showCurrencies.js";
import showBorderCountries from "./showBorderCountries.js";
import { handleSelectedCountry } from "./handleSelectedCountry.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* icons */
const continentIco = "../icons/continent.png";
const areaIco = "../icons/area.png";
const populationIco = "../icons/population.png";
const capitalIco = "../icons/capital.png";
const languageIco = "../icons/language.png";
const currencyIco = "../icons/currency.png";
const pointIco = "../icons/point.png";
const borderIco = "../icons/border.png";
const currencyConIco = "../icons/currencyConIco.png";
const exchangeIco = "../icons/exchange.png";

const selectedCountry = (countryName) => {
  countryName =
    countryName || JSON.parse(localStorage.getItem("selectedCountryName"));

  const [data] = countriesData;
  let borderCountries = [];
  let currChange = true;

  header.classList.add("opacity");

  const foundCountry = data.find((country) => {
    return country.name.common === countryName;
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

  borders &&
    data.map((country) => {
      borders.some((border) => {
        if (country.cca3 === border) borderCountries.push(country);
      });
    });

  const showLang = () => {
    const langVal = Object.values(languages);

    if (langVal.length > 1) {
      return `${langVal[0]}, ${langVal[1]}`;
    } else if (langVal.length > 2) {
      return `${langVal[0]}, ${langVal[1]}, ${langVal[2]}`;
    } else {
      return langVal[0];
    }
  };

  const checkCurrName = () => {
    return currencies
      ? `100 ${findCurr(currencies).slice(20, 23)}`
      : "no local currency";
  };

  mainContainer.innerHTML = `
<div class="selected__country">
        <div class="info-top">
          <div class="info-top--main">
            <h1>${common} ${
    coa ? '<img src="' + coa + '" alt="coatOfArms" title="Coat Of Arms" />' : ""
  }
            </h1>
            <h3>(${official})</h3>
            <p><img src="${continentIco}" alt="icon" />
             ${region} ${subregion ? "(" + subregion + ")" : ""}</span>
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
            ${
              languages && Object.keys(languages).length > 1
                ? "languages:"
                : "language:"
            }
             ${languages ? showLang() : "no language"}</p>
            <p><img src="${currencyIco}" alt="icon" />
            currency: ${
              currencies ? showCurr(currencies) : "no local currency"
            }</p>
          </div>
          <div class="info-top--flag">
            <div class="info-top--flag__img"></div>
            <p>The flag of ${common}</p>
          </div>
        </div>
        <div class="info-bottom">

          <div class="info-bottom--map">
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
            <div class="info-bottom--border__countries">
            
            </div>
          </div>

          <div class="info-bottom--converter">
      <div class="converter-btn-container">
        <button class="show-converter">converter</button>
        </div>
            <div class="converter__calc">
            <div class="converter__header">
         <img src="${currencyConIco}" alt="icon" />
         <p>LOCAL CURRENCY CONVERTER</p>
          </div>
              <label for="amount"
                >Amount
                <input type="text" id="amount" maxlength="10" placeholder="${checkCurrName()}"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='${checkCurrName()}'"
                />
              </label>

              <div class="converter__calc-currencies">
                <label for="from"
                  >From
                  <select name="from" id="from">
                  ${currencies && findCurr(currencies)}
                  </select>
                </label>
                <label for="to"
                >To
                  <select name="to" id="to">
                    ${currencies && showAllCurrencies()}
                  </select>
                </label>
              </div>

                <button class="converter__calc-change">
                  <img src="${exchangeIco}" alt="icon" />
                </button>
              <button class="converter__calc-convert">Convert</button>
              <div class="converter__calc-result"></div>
            </div>
          </div>
        </div>
      </div>
`;
  showBorderCountries(borderCountries);

  borderCountries.length > 10
    ? $(".selected__country").classList.add("extra-width")
    : $(".selected__country").classList.remove("extra-width");

  if (window.innerWidth < 769) {
    $(".info-bottom--converter").classList.add("hide");
    $(".converter__calc").classList.add("hide");
    $(".converter-btn-container").classList.add("visible");
  } else {
    $(".info-bottom--converter").classList.remove("hide");
    $(".converter__calc").classList.remove("hide");
    $(".converter-btn-container").classList.remove("visible");
  }

  $(".info-top--flag__img").style.backgroundImage = `url(${flag})`;

  /* Select one from border Countries */

  $(".info-bottom--border__countries").addEventListener("click", (e) => {
    e.target.closest(".country__border") && handleSelectedCountry(e);
  });

  /* Change Btn */
  currencies &&
    $(".converter__calc-change").addEventListener("click", () => {
      currChange = !currChange;
      let countryCurr = findCurr(currencies).slice(20, 23);
      if (currChange) {
        $(
          "label[for='amount']"
        ).innerHTML = `Amount<input type="text" id="amount" maxlength="10" placeholder="100 ${countryCurr}"}
      onfocus="this.placeholder=''"
      onblur="this.placeholder='100 ${countryCurr}'"
      />`;
      } else {
        $(
          "label[for='amount']"
        ).innerHTML = `Amount<input type="text" id="amount" maxlength="10" placeholder="select currency"
       onfocus="this.placeholder=''"
      onblur="this.placeholder='select currency'"/>`;
      }
      $(".converter__calc-result").innerHTML = "";
      $(".converter__calc-currencies").innerHTML = `
                <label for="from"
                  >From
                  <select name="from" id="from">
                  ${
                    currencies && currChange
                      ? findCurr(currencies)
                      : showAllCurrencies()
                  }
                  </select>
                </label>
         
                <label for="to"
                  >To
                  <select name="to" id="to">
                    ${
                      currencies && currChange
                        ? showAllCurrencies()
                        : findCurr(currencies)
                    }
                  </select>
                </label>
  `;

      /* Handle From input */
      currencies &&
        $("#from").addEventListener("change", (e) => {
          $(".converter__calc-result").innerHTML = "";
          $(
            "label[for='amount']"
          ).innerHTML = `Amount<input type="text" id="amount" maxlength="10" placeholder="100 ${e.target.value}"}
      onfocus="this.placeholder=''"
      onblur="this.placeholder='100 ${e.target.value}'"
      />`;
        });
    });

  /* Input Amount */
  const inputAm = $("#amount");

  inputAm.addEventListener("keyup", () => {
    if (!inputAm.value.match(/^[0-9]+$/)) {
      inputAm.value = inputAm.value.replace(/[^0-9.]/g, "");
    }
  });

  /* Convert Btn */
  $(".converter__calc-convert").addEventListener("click", () => {
    const from = $("#from").value,
      to = $("#to").value,
      amount = $("#amount").value;

    fetchCurrency(from, to, amount).then((result) => {
      const resultsContainer = $(".converter__calc-result");
      if (result) {
        resultsContainer.innerHTML = result;
      } else {
        resultsContainer.classList.add("error");
        resultsContainer.innerHTML = "Check the values, please.";
        setTimeout(() => {
          resultsContainer.innerHTML = "";
          resultsContainer.classList.remove("error");
        }, 1500);
      }
    });
  });

  /* countriesBnt & converterBtn */

  $(".show-converter").addEventListener("click", (e) => {
    e.stopPropagation();
    $(".info-bottom--border__countries").classList.add("hide");
    $$(".country__border").forEach((item) => item.classList.add("hide"));
    $(".countries-btn-container").classList.add("visible");
    $(".info-bottom--map").classList.add("short");

    setTimeout(() => {
      $(".info-bottom--converter").classList.remove("hide");
      $(".converter__calc").classList.remove("hide");
      $(".converter-btn-container").classList.remove("visible");
    }, 200);
  });
  $(".show-countries").addEventListener("click", (e) => {
    e.stopPropagation();
    $(".info-bottom--converter").classList.add("hide");
    $(".converter__calc").classList.add("hide");
    $(".converter-btn-container").classList.add("visible");

    $(".info-bottom--border__countries").classList.remove("hide");
    $$(".country__border").forEach((item) => item.classList.remove("hide"));
    $(".countries-btn-container").classList.remove("visible");
    $(".info-bottom--map").classList.remove("short");
  });
};

export default selectedCountry;
