const $ = document.querySelector.bind(document);

const aboutBtn = () => {
  const greetingContainer = $(".greeting");
  const navBar = $(".nav");

  navBar.innerHTML = `<p>about</p>`;

  $(".nav p").addEventListener("click", () => {
    if ($(".nav p").innerText === "ABOUT") {
      if (greetingContainer.classList.contains("about")) {
        greetingContainer.classList.remove("about");

        greetingContainer.innerHTML = `
      <p>
         Curious about the countries of the World? <br/> Maybe you are planing the next trip?
         </p>
         <p>Find the country and check out the main information about it or use the local currency converter to calculate your financial opportunities there. 
        </p>`;
      } else {
        greetingContainer.classList.add("about");
        greetingContainer.innerHTML = `
        <p>This project was created in purpose to practice web development skills. Author would be very glad if you will find it interesting or even useful.
        </p>
      
        <p>Copyright &copy; ${new Date().getFullYear()} ODYSSEY. All rights reserved. <br/> made by <a href="https://github.com/Double-w-B" target="_blank" rel="noopener noreferrer">
        Władysław Balandin
        </a>
      </p>`;
      }
    }
  });
};

export default aboutBtn;
