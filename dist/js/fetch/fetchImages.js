import { body } from "../main.js";

const backgroundImgUrl =
  "https://api.unsplash.com/search/photos/?client_id=sXaD07R8SqQRROA1zQG0PSuRuahvlC4b6pc8jzZkmqE&page=1&query=";

export const fetchImages = async (country) => {
  try {
    const response = await fetch(backgroundImgUrl + country + " monuments");
    const data = await response.json();
    let number = Math.floor(Math.random() * 6);
    body.style.backgroundImage = `url(${data.results[number].urls.regular})`;
  } catch (error) {
    console.log(error);
  }
};
