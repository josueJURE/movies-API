const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "868db2c1eamshd290e20c8dc8261p1627dejsnf52bb1929fb7",
    "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
  },
};

fetch("https://imdb-top-100-movies.p.rapidapi.com/", options)
  .then((response) => response.json())
  .then((response) => {
    const mainContainer = document.querySelector(".mainContainer");
    const chevronRight = document.querySelector(".fa-chevron-right");
    const chevronLeft = document.querySelector(".fa-chevron-left");
    const img = document.querySelector(".carousel img");
    const title = document.querySelector(".title");
    const director = document.querySelector(".director");
    const genre = document.querySelector(".genre");
    const rating = document.querySelector(".rating");
    const description = document.querySelector(".description");
    let trailerSection = document.querySelector(".trailerSection source");
    const trailerButton = document.querySelector(".trailerButton");

    console.log(trailerSection.src);

    console.log(trailerSection);

    let counting = 0;

    img.src = response[counting].image;
    trailerSection.src = response[counting].trailer;
    response[counting].image;
    response[counting].director;
    response[counting].genre;
    response[counting].rating;
    response[counting].title;
    response[counting].description;

    chevronRight.addEventListener("click", swipeRight);
    chevronLeft.addEventListener("click", swipeLeft);
    trailerButton.addEventListener("click", playTrailer);

    console.log(response);

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
      // console.log(director, genre, rating)
      img.src = response[counting].image;
      director.innerHTML = `Director: ${response[counting].director}`;
      genre.innerHTML = `Genre: ${response[counting].genre}`;
      rating.innerHTML = `Rating ${response[counting].rating}`;
      title.innerHTML = response[counting].title;
      description.innerHTML = response[counting].description;
    }

    console.log("iframe:", `${response[counting].trailer}?autoplay=1`);

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
