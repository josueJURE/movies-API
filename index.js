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

    let top10 = response.slice(0, 10).map((item) => item.image);
    console.log({ API: response, topTen: top10 });

    img.src = response[counting].image;

    chevronRight.addEventListener("click", swipeRight);
    chevronLeft.addEventListener("click", swipeLeft);

    function swipeLeft() {
      console.log("hello world");
    }

    function swipeRight() {
      counting++;
      if (counting > 99) {
        counting = 0;
      }
      img.src = response[counting].image;
    }
  })

  .catch((err) => console.error(err));
