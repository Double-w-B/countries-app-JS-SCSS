const $ = document.querySelector.bind(document);

const showBorderCountries = (borderCountries) => {
  borderCountries.length > 10
    ? $(".info-bottom--border__countries").classList.add("countries-length")
    : $(".info-bottom--border__countries").classList.remove("countries-length");

  const showCountries = borderCountries
    .map((country) => {
      const {
        name: { common },
        flags: { png: flag },
      } = country;

      return `<div class="country__border">
      <div class="country__border__flag">
      <img src="${flag}" alt="flag" />
      </div>
      <p ${
        borderCountries.length > 10
          ? "style='font-size: 0.9rem'"
          : common.length >= 14 && "style='font-size: 0.8rem'"
      }>${common}</p>
    </div>`;
    })
    .join("");

  $(".info-bottom--border__countries").innerHTML = `
      ${showCountries}
        <div class="countries-btn-container">
          <button class="show-countries">countries</button>
            </div>
      `;
};

export default showBorderCountries;
