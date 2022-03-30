import { mainContainer } from "./main.js";

const homePage = () => {
  
  mainContainer.innerHTML = `
      <div class="greeting">
        <p>
         Curious about the countries of the World? <br/> Maybe you are planing the next trip?
         </p>
         <p>Find the country and check out the main information about it or use the local currency converter to calculate your financial opportunities there. 
        </p>
      </div>

      <div class="hero"></div>

      <div class="countries__container">
        <div class="countries__container-search">
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
        
        <div class="countries__all">
        <div class="countries__all-loading">Loading ...</div>
        
        </div>
      </div>
`;
};

export default homePage;
