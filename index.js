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
    let counting = 0;
    img.src = response[counting].image;
    console.log("josue");

    chevronRight.addEventListener("click", swipeRight);
    chevronLeft.addEventListener("click", swipeLeft);

    function swipeLeft() {
      console.log("hello world");
    }

 

    function swipeRight() {
      counting++;
      console.log(counting)
      img.src = response[counting].image;
    }
  })

  .catch((err) => console.error(err));
