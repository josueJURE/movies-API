const x  = document.querySelector(".fa-chevron-right")
const y = document.querySelector(".fa-chevron-left")
console.log({iconParentRight: x.parentElement, iconParentLet: y.parentElement})

// const mainContainer = document.querySelector('.mainContainer');
// const ul = document.querySelector("ul");
// console.log(ul.children)
// console.log(mainContainer)


// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '868db2c1eamshd290e20c8dc8261p1627dejsnf52bb1929fb7',
// 		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
// 	}
// };

// fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));