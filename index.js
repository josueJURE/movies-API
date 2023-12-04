const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": window.IMDB_API_KEY,
    "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
  },
};

const DEBUG = true;

fetch("https://imdb-top-100-movies.p.rapidapi.com/", options)
  .then((response) => response.json())
  .then((response) => {
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");
    const carousel = document.querySelector(".carousel");
    const carouselImage = document.createElement("img");
    if (carousel) {
      carousel.replaceChildren(carouselImage);
    }
    const title = document.querySelector(".title");
    const main = document.querySelector("main");
    console.log(main)
    const director = document.querySelector(".director");
    const genre = document.querySelector(".genre");
    const rating = document.querySelector(".rating");
    const description = document.querySelector(".description");
    const typesOfgenre = document.querySelector(".typesOfgenre ");
    const userMessage = document.querySelector(".userMessage");

    const selectByGenres = document.querySelector(".selectByGenres");
    const searchByGenre = document.querySelector(".searchByGenre");
    const searchByDirectors = document.querySelector(".searchByDirectors");
    const home = document.querySelector(".home");
    const watchList = document.querySelector(".watchList");
    const userWatchlistParentElement = document.querySelector(
      ".userWatchlistParentElement"
    );
  
  
    const topTen = document.querySelector(".topTen");
    const topTenParentElement = document.querySelector(".topTenParentElement");


    function getUniqueValuesFromArray(response, key) {
      const valuesWithDuplicates = [];
      response.forEach((item) => {
       

        item[key] && valuesWithDuplicates.push(...item[key]);
      });
      console.log(response);

      const uniqueValues = [...new Set(valuesWithDuplicates)].sort();

      return uniqueValues;
    }

  

    const genreListWithNoDuplicates = getUniqueValuesFromArray(
      response,
      "genre"
    );

    if (topTenParentElement) {
      displayTopTenMovies();
    }

    function populateOptionsFromArray(array, parentElement) {
      array.forEach((item) => {
        const element = document.createElement("option");
        element.innerHTML = item;
        parentElement.appendChild(element);
      });
    }

    function userMakesAselection(e) {
      const selectedGenre = e.target.value;
      let targetElement, filterKey;

   

      targetElement.innerHTML = "";

      response
        .filter((res) => res[filterKey].includes(selectedGenre))
        .forEach((movie) => {
          generateMoviesDescription(targetElement, movie);
        });
    }

    if (userWatchlistParentElement) {
      addMovieToUserWatchList();
    }

    function addMovieToUserWatchList() {
      const tasks = getTasksFromLocalStorage();
      tasks.forEach((movie) => {
        generateMoviesDescription(userWatchlistParentElement, movie);
      });
    }

    let counting = 0;

    if (next) {
      next.addEventListener("click", swipeRight);
    }
    if (prev) {
      prev.addEventListener("click", swipeLeft);
    }

    if (searchByGenre) {
      searchByGenre.addEventListener("click", goToSearchByGenrePage);
    }

    if (selectByGenres) {
      selectByGenres.addEventListener("change", userMakesAselection);
      populateOptionsFromArray(genreListWithNoDuplicates, selectByGenres);
    }

   

    if (home) {
      home.addEventListener("click", function () {
        window.location.assign("/index.html");
      });
    }

    if (searchByDirectors) {
      searchByDirectors.addEventListener("click", function () {
        console.log("directors");
        window.location.assign("/searchByDirectors.html");
      });
    }

    if (topTen) {
      topTen.addEventListener("click", function () {
        window.location.assign("/topTen.html");
      });
    }

    function goToSearchByGenrePage() {
      window.location.assign("/searchByGenrePage.html");
    }

    if (watchList) {
      watchList.addEventListener("click", function () {
        window.location.assign("/watchList.html");
      });
    }

    function swipeLeft() {
      counting--;
      if (counting < 0) {
        counting = 99;
      }
      console.log(counting);
      populateFields();

    }

    function swipeRight() {
      counting++;
      if (counting > 99) {
        counting = 0;
      }
      populateFields();
    
    }

    // function populateFields() {
    //   if (director) {
    //     carouselImage.src = response[counting].image;
    //     genre.innerHTML = `Genre: ${response[counting].genre.join(', ') }`;
    //     rating.innerHTML = `Rating ${response[counting].rating}`;
    //     title.innerHTML = response[counting].title;
    //     description.innerHTML = response[counting].description;
    //   }
    // }

    function populateFields() {
      if (director) {
        const direction = counting > 0 ? 'translateX(-100%)' : 'translateX(100%)';
        
        carouselImage.style.transform = direction;
        
        setTimeout(() => {
          carouselImage.src = response[counting].image;
          genre.innerHTML = `Genre: ${response[counting].genre.join(', ')}`;
          rating.innerHTML = `Rating ${response[counting].rating}`;
          title.innerHTML = response[counting].title;
          description.innerHTML = response[counting].description;
    
          // Reset transform after a short delay to allow the image to be updated first
          setTimeout(() => {
            carouselImage.style.transform = 'translateX(0)';
            carouselImage.style.transition = "all 0.15 ease"
            carousel.style.border = 0;
            // main.style.display = 'none'
          }, 100);
        }, 100); // 500ms matches the transition duration
      }
    }
    

 
    function getTasksFromLocalStorage() {
      if (DEBUG) {
        console.log("getTasksFromLocalStorage");
      }

      return JSON.parse(localStorage.getItem("tasks") || "[]");
    }

    function displayTopTenMovies() {
      response.splice(0, 10).forEach((movie) => {
        generateMoviesDescription(topTenParentElement, movie);
      });
    }

    function generateMoviesDescription(target, movie) {
      let elementToInsert = document.createElement("div");
      const element = document.createElement("div");
      const img = document.createElement("img");
      img.src = movie.image;
      element.classList.add("imageMovieWrapper");
      element.appendChild(img);
      target.appendChild(element);
      console.log(element);
      element.addEventListener("mouseover", function () {
        console.log("mouseover");
        elementToInsert.setAttribute("class", "movieInfo");
        let moviePlot = generateInfoAboutMovie(movie.year, movie.description);
        if (elementToInsert.children.length === 0) {
          const myFragment = turnStringIntoDOMelement(moviePlot);
          elementToInsert.appendChild(myFragment);
          btn = elementToInsert.querySelector(".btn");
          btn.addEventListener("click", function () {
            const tasks = getTasksFromLocalStorage();
            if (tasks.filter((task) => task.id == movie.id).length == 0) {
              tasks.push(movie);
              localStorage.setItem("tasks", JSON.stringify(tasks));
              console.log(userMessage);
              userMessage.innerHTML = `${movie.title} has been added to your watchlist`;
              setTimeout(function () {
                userMessage.classList.add("fade-out");
              }, 1000);
            }
          });
        }
        element.firstElementChild.insertAdjacentElement(
          "beforebegin",
          elementToInsert
        );
        const left = elementToInsert.getClientRects()[0].left;
        const width = elementToInsert.getClientRects()[0].width;
        const screenWidth = window.innerWidth;
        if (left + width > screenWidth) {
          elementToInsert.classList.add("displayBoxToTheLeft");
        }
        element.addEventListener("mouseleave", function () {
          elementToInsert.remove();
        });
      });
    }

    populateFields();
  });

function turnStringIntoDOMelement(string) {
  return document.createRange().createContextualFragment(string);
}

function generateInfoAboutMovie(year, description) {
  return `

  <div class="textColor year">Year: ${year}</div>
  <div class="textColor description">${description}</div>
  <button class="textColor btn">Add to watchlist</button>
  <div>
  <i class="fa-regular fa-heart"></i>
  </div>


  `;
}


// function updateImageTransform() {
//   // Calculate the transform value based on the counting variable
//   const transformValue = `translateX(${-counting * 100}%)`;
//   carouselImage.style.transform = transformValue;
// }
