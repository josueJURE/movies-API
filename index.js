// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "868db2c1eamshd290e20c8dc8261p1627dejsnf52bb1929fb7",
//     "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
//   },
// };

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

    console.log(director, genre, rating, title);

    console.log(title);
    let counting = 0;

    let top10 = response.slice(0, 10).map((item) => item.image);
    console.log({ API: response, topTen: top10 });


    img.src = response[counting].image;
    response[counting].image;
    response[counting].director;
    response[counting].genre;
    response[counting].rating;
    response[counting].title;
    response[counting].description;

    chevronRight.addEventListener("click", swipeRight);
    chevronLeft.addEventListener("click", swipeLeft);

    function swipeLeft() {
      counting--;
      if (counting < 0) {
        counting = 99;
      }
      // console.log(director, genre, rating)
      img.src = response[counting].image;
      director.innerHTML = `Director: ${response[counting].director}` ;
      genre.innerHTML = `Genre: ${response[counting].genre}`;
      rating.innerHTML = `Rating ${response[counting].rating}`;
      title.innerHTML = response[counting].title;
      description.innerHTML = response[counting].description;
      console.log(counting);
    }

    function swipeRight() {
      counting++;
      if (counting > 99) {
        counting = 0;
      }
      img.src = response[counting].image;
      director.innerHTML = `Director: ${response[counting].director}` ;
      genre.innerHTML = `Genre: ${response[counting].genre}`;
      rating.innerHTML = `Rating ${response[counting].rating}`;
      title.innerHTML = response[counting].title;
      description.innerHTML = response[counting].description;
      console.log(counting);
    }
  })

  .catch((err) => console.error(err));
