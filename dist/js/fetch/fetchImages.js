import { body } from "../main.js";

const backgroundImgUrl =
  `https://api.unsplash.com/search/photos/?client_id=${config.IMG_ID}&page=1&query=`;

const fetchImages = async (country) => {
  try {
    const response = await fetch(backgroundImgUrl + country + " nature");
    const data = await response.json();
    let number = Math.floor(Math.random() * 6);
    body.style.backgroundImage = `url(${data.results[number].urls.regular})`;
  } catch (error) {
    console.log(error);
  }
};

export default fetchImages;
