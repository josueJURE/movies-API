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
    const img = document.querySelector(".carousel img");
    const title = document.querySelector(".title");
    const director = document.querySelector(".director");
    const genre = document.querySelector(".genre");
    const rating = document.querySelector(".rating");
    const description = document.querySelector(".description");
    const directors = document.querySelector(".directors");
    const selectByDirectors = document.querySelector(".selectByDirectors");
    const selectByGenres = document.querySelector(".selectByGenres");
    let trailerSection = document.querySelector(".trailerSection source");
    const trailerButton = document.querySelector(".trailerButton");
    const searchByGenre = document.querySelector(".searchByGenre");
    const searchByDirectors = document.querySelector(".searchByDirectors");
    const home = document.querySelector(".home");
    const watchList = document.querySelector(".watchList");
    const userWatchlistParentElement = document.querySelector(
      ".userWatchlistParentElement"
    );

    console.log({ director: selectByDirectors }, { genre: selectByGenres });
    console.log(response);

    let directorsNameListWithDuplicates = [];
    let genreListWithDuplicates = [];

    // can this be refactored into a funcion
    response.forEach((item) => {
      directorsNameListWithDuplicates.push(...item.director);
    });

    let directorsNameListNoDuplicates = [
      ...new Set(directorsNameListWithDuplicates),
    ];

    console.log(directorsNameListNoDuplicates);

    response.forEach((item) => {
      genreListWithDuplicates.push(...item.genre);
    });

    let genreListWithNoDuplicates = [
      ...new Set(genreListWithDuplicates),
    ].sort();

    console.log(genreListWithNoDuplicates);

    let isListEmpty = true;

    function showDirectors() {
      // if (section is empty) show list
      if (isListEmpty) {
        directorsNameListNoDuplicates.forEach((director) => {
          const element = document.createElement("div");
          element.innerHTML = director;
          directors.appendChild(element);
        });
        isListEmpty = false;
      }

      // else hide list
      else {
        directors.innerHTML = "";
        isListEmpty = true;
      }
    }

    function displayGenres() {
      genreListWithNoDuplicates.forEach((genre) => {
        const element = document.createElement("option");
        element.innerHTML = genre;
        selectByGenres.appendChild(element);
      });
    }

    function userSelectByGenre(e) {
      if (directors) {
        directors.innerHTML = "";
        const selectedGenre = e.target.value;
        response
          .filter((res) => res.genre.includes(selectedGenre))
          .forEach((movie) => {
            const element = document.createElement("div");
            const img = document.createElement("img");
            img.addEventListener("click", function () {
              const tasks = getTasksFromLocalStorage();
              if (tasks.filter((task) => task.id == movie.id).length == 0) {
                tasks.push(movie);
                localStorage.setItem("tasks", JSON.stringify(tasks));
              }
            });
            img.src = movie.image;
            img.title = movie.description;
            img.style.height = "max-content";
            element.appendChild(img);
            directors.appendChild(element);
          });
      }
    }

    if (userWatchlistParentElement) {
      const tasks = getTasksFromLocalStorage();
      console.log(tasks);

      tasks.forEach((task) => {
        const element = document.createElement("div");
        const img = document.createElement("img");
        img.src = task.image;
        img.title = task.description;
        element.appendChild(img);
        userWatchlistParentElement.appendChild(element);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      });
    }

    let counting = 0;

    if (chevronRight) {
      chevronRight.addEventListener("click", swipeRight);
    }
    if (chevronLeft) {
      chevronLeft.addEventListener("click", swipeLeft);
    }

    if (selectByDirectors) {
      selectByDirectors.addEventListener("click", showDirectors);
    }

    if (searchByGenre) {
      searchByGenre.addEventListener("click", goToSearchByGenrePage);
    }

    if (selectByGenres) {
      selectByGenres.addEventListener("change", userSelectByGenre);
      displayGenres();
    }

    if (home) {
      home.addEventListener("click", function () {
        window.location.assign("/index.html");
      });
    }

    if (searchByDirectors) {
      searchByDirectors.addEventListener("click", function () {
        window.location.assign("/searchByDirectors.html");
      });
    }

    function goToSearchByGenrePage() {
      console.log("genre");
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
      if (img) {
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
    populateFields();
  });
