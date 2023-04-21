const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '868db2c1eamshd290e20c8dc8261p1627dejsnf52bb1929fb7',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));