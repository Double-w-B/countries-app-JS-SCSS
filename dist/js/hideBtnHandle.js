const $ = document.querySelector.bind(document);

const hideBtnHandle = () => {
  const hideBtn = $(".nav p");
  const selectedCountry = $(".selected__country");
  hideBtn.addEventListener("click", () => {
    if (hideBtn !== "ABOUT") {
      selectedCountry.classList.toggle("hide");
      if (selectedCountry.classList.contains("hide")){
          hideBtn.innerText = `show`
      }else{
          hideBtn.innerText = `hide`;
      }
    }
  });
};

export default hideBtnHandle;
