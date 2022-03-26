import { mainContainer } from "./main.js";
import showAllCountries from "./showAllCountries.js";

const homePage = () => {
  mainContainer.innerHTML = `
      <div class="greeting">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ad
          distinctio officiis quas, quo aut similique numquam nam illo
          perferendis cumque sequi magnam voluptas tempora, in, aliquid fugit
          aliquam nesciunt.
        </p>
      </div>

      <div class="hero"></div>

      <div class="countries--container">
        <div class="search">
          <form>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="I want to visit ..."
              onfocus="this.placeholder=''"
              onblur="this.placeholder='I want to visit ...'"
            />
          </form>
        </div>
        
        <div class="countries--all">
        <div class="loading">Loading ...</div>
        
        </div>
      </div>
`;

};

export default homePage;
