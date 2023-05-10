const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": window.IMDB_API_KEY,
    "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
  },
};

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
    let trailerSection = document.querySelector(".trailerSection source");
    const trailerButton = document.querySelector(".trailerButton");

    console.log(directors);

    let directorsNameListWithDuplicates = [];

    response.forEach((item) => {
      directorsNameListWithDuplicates.push(...item.director);
    });

    let directorsNameListNoDuplicates = [
      ...new Set(directorsNameListWithDuplicates),
    ];

    console.log(directorsNameListNoDuplicates);

    directorsNameListNoDuplicates.forEach((director) => {
      const element = document.createElement("div");
      element.innerHTML = director;
      directors.appendChild(element);
    });

    let counting = 0;

    chevronRight.addEventListener("click", swipeRight);
    chevronLeft.addEventListener("click", swipeLeft);
    trailerButton.addEventListener("click", playTrailer);

    function playTrailer() {
      trailerSection.src = response[counting].trailer;
      console.log(trailerSection.src);
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
      img.src = response[counting].image;
      director.innerHTML = `Director: ${response[counting].director}`;
      genre.innerHTML = `Genre: ${response[counting].genre}`;
      rating.innerHTML = `Rating ${response[counting].rating}`;
      title.innerHTML = response[counting].title;
      description.innerHTML = response[counting].description;
    }

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

    populateFields();
  });

console.log(Swal);
