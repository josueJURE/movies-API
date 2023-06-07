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

  export {swipeLeft, swipeRight, populateFields}