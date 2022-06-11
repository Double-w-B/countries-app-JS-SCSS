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
           data-src="${png}"
           alt="${common} flag image which leads to country information"
           class=${firstLoad ? "lazy" : "shadow"}
           loading="${firstLoad ? "lazy" : "eager"}"/>
              
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

  const checkImgPosition = (img) => {
    if (
      img.getBoundingClientRect().bottom < 860 &&
      img.firstElementChild.firstElementChild.classList.contains("lazy")
    ) {
      img.firstElementChild.firstElementChild.classList.remove("lazy");
      setTimeout(() => {
        img.firstElementChild.firstElementChild.src =
          img.firstElementChild.firstElementChild.dataset.src;
        img.firstElementChild.firstElementChild.classList.add("shadow");
      }, 1500);
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

  firstLoad = false;

  allCountries.addEventListener("click", handleSelectedCountry);
};

export default showAllCountries;
