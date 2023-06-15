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
    const chevronRight = document.querySelector(".fa-chevron-right");
    const chevronLeft = document.querySelector(".fa-chevron-left");
    const carousel = document.querySelector(".carousel");
    const img = document.createElement("img");
    if (carousel) {
      carousel.replaceChildren(img);
    }
    const title = document.querySelector(".title");
    const director = document.querySelector(".director");
    const genre = document.querySelector(".genre");
    const rating = document.querySelector(".rating");
    const description = document.querySelector(".description");
    const typesOfgenre = document.querySelector(".typesOfgenre ");
    const userMessage = document.querySelector(".userMessage");

    const selectByGenres = document.querySelector(".selectByGenres");
    const trailerButton = document.querySelector(".trailerButton");
    const searchByGenre = document.querySelector(".searchByGenre");
    const searchByDirectors = document.querySelector(".searchByDirectors");
    const home = document.querySelector(".home");
    const watchList = document.querySelector(".watchList");
    const userWatchlistParentElement = document.querySelector(
      ".userWatchlistParentElement"
    );
    const pickAdirector = document.querySelector(".pickAdirector");
    const directors = document.querySelector(".directors");
    const topTen = document.querySelector(".topTen");
    const topTenParentElement = document.querySelector(".topTenParentElement");
    const moviesBy = document.querySelector(".moviesBy");

    console.log(response);

    let directorsNameListWithDuplicates = [];
    let genreListWithDuplicates = [];

    // can this be refactored into a funcion
    response.forEach((item) => {
      directorsNameListWithDuplicates.push(...item.director);
    });

    let directorsNameListNoDuplicates = [
      ...new Set(directorsNameListWithDuplicates),
    ].sort();

    console.log(directorsNameListNoDuplicates);

    response.forEach((item) => {
      genreListWithDuplicates.push(...item.genre);
    });

    let genreListWithNoDuplicates = [
      ...new Set(genreListWithDuplicates),
    ].sort();

    console.log(genreListWithNoDuplicates);

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
      if (typesOfgenre) {
        typesOfgenre.innerHTML = "";
        const selectedGenre = e.target.value;
        response
          .filter((res) => res.genre.includes(selectedGenre))
          .forEach((movie) => {
            const element = document.createElement("div");
            img.addEventListener("click", function () {
              const tasks = getTasksFromLocalStorage();
              if (tasks.filter((task) => task.id == movie.id).length == 0) {
                tasks.push(movie);
                localStorage.setItem("tasks", JSON.stringify(tasks));
              }
            });
            img.src = movie.image;
            img.title = movie.description;
            element.appendChild(img);
            typesOfgenre.appendChild(element);
          });
      }
    }

    function userMakesAselection2(e) {
      if (directors) {
        directors.innerHTML = "";
        const selectedGenre = e.target.value;
        moviesBy.innerHTML = `movies by ${selectedGenre}`;
        response
          .filter((res) => res.director.includes(selectedGenre))
          .forEach((movie) => {
            let elementToInsert = document.createElement("div");
            const element = document.createElement("div");
      
            element.classList.add("imageMovieWrapper");
            img.src = movie.image;
            // img.title = movie.description;
            element.appendChild(img);
            directors.appendChild(element);
            console.log(element.firstElementChild);
            console.log(element.children);

            element.addEventListener("mouseover", function (e) {
              console.log(e.nextSibling, e);
              elementToInsert.setAttribute("class", "movieInfo");
              let moviePlot = `
                
                <div class="textColor year">Year: ${movie.year}</div>
                <div class="textColor description">${movie.description}</div>
                <button class="textColor btn">Add to watchlist</button>
                <i class="fa-regular fa-heart"></i>
                

                `;

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
                      userMessage.classList.add("fade-out"); // Apply the fade-out class after 1 second
                    }, 1000);
                  }
                });
              }

              element.firstElementChild.insertAdjacentElement(
                "afterend",
                elementToInsert
              );
              const left = elementToInsert.getClientRects()[0].left;
              const width = elementToInsert.getClientRects()[0].width;
              const screenWidth = window.innerWidth;
              if (left + width > screenWidth) {
                elementToInsert.classList.add("displayBoxToTheLeft");
                // debugger;
              }
            });
            // }

            element.addEventListener("mouseleave", function () {
              elementToInsert.remove();
            });
          });
      }
    }

    if (userWatchlistParentElement) {
      addMovieToUserWatchList();
    }

    function addMovieToUserWatchList() {
      const tasks = getTasksFromLocalStorage();
      tasks.forEach((task) => {
        const element = document.createElement("div");
        const img = document.createElement("img");
        img.src = task.image;
        img.title = task.description;
        element.appendChild(img);
        userWatchlistParentElement.appendChild(element);
      });
    }

    let counting = 0;

    if (chevronRight) {
      chevronRight.addEventListener("click", swipeRight);
    }
    if (chevronLeft) {
      chevronLeft.addEventListener("click", swipeLeft);
    }

    if (searchByGenre) {
      searchByGenre.addEventListener("click", goToSearchByGenrePage);
    }

    if (selectByGenres) {
      selectByGenres.addEventListener("change", userMakesAselection);
      populateOptionsFromArray(genreListWithNoDuplicates, selectByGenres);
    }

    if (pickAdirector) {
      pickAdirector.addEventListener("change", userMakesAselection2);
      populateOptionsFromArray(directorsNameListNoDuplicates, pickAdirector);
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
        console.log("topTen");
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

    function populateFields() {
      if (director) {
        img.src = response[counting].image;
        director.innerHTML = `Director: ${response[counting].director}`;
        genre.innerHTML = `Genre: ${response[counting].genre}`;
        rating.innerHTML = `Rating ${response[counting].rating}`;
        title.innerHTML = response[counting].title;
        description.innerHTML = response[counting].description;
      }
    }

    if (trailerButton) {
      trailerButton.addEventListener("click", () => {
        Swal.fire({
          title: response[counting].title,
          html: `<iframe id="ytplayer" type="text/html" width="100%" height="360"
          src="${response[counting].trailer}?autoplay=1"
          frameborder="0"></iframe>`,
          width: "",
          showCloseButton: true,
          showConfirmButton: false,
          buttonsStyling: true,
          customClass: {
            popup: "trailerPopup",
          },
        });
      });
    }
    function getTasksFromLocalStorage() {
      if (DEBUG) {
        console.log("getTasksFromLocalStorage");
      }

      return JSON.parse(localStorage.getItem("tasks") || "[]");
    }

    function displayTopTenMovies() {
      response.splice(0, 10).forEach((movie) => {
        const element = document.createElement("div");
        const img = document.createElement("img");
        img.src = movie.image;
        element.appendChild(img);
        topTenParentElement.appendChild(element);
      });
    }

    populateFields();
  });

function turnStringIntoDOMelement(string) {
  return document.createRange().createContextualFragment(string);
}
