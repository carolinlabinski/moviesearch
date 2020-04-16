var selector = document.getElementById("movie");

const createUrl = (keywordInputValue) => {
	url = "HTTPS://www.omdbapi.com/?s=" + keywordInputValue + "&apikey=798804bf";
};

window.addEventListener("DOMContentLoaded", () => {
	document
		.querySelector(".addKeywordsForm")
		.addEventListener("submit", (event) => {
			event.preventDefault();
			const keywordInputValue = document.querySelector("input[type='text']")
				.value;
			createUrl(keywordInputValue);
			console.log(url);
			requestSearch(url);
		});
});

const requestSearch = (url) => {
	fetch(url)
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			return response;
		})
		.then((response) => Loop(response))
		.catch((error) => console.error(error));
};
selector.innerHTML = "";
const Loop = (response) => {
	for (let index = 0; index < response.Search.length; index++) {
		let movie = response.Search[index];
		console.log(movie);
		showMovies(selector, movie.Title, movie.Year, movie.Poster, movie.imdbID);
	}
};

const showMovies = (selector, Title, Year, Poster, imdbID) => {
	selector.innerHTML += `
			<div class="d-flex row border rounded mb-3">
			<img class="img-thumbnail m-3" style="max-width: 8rem;" src="${Poster}">
            <div class="card-body">
				<h1 class="card-title">${Title}</h1>
				<p class="card-text">${Year}</p>
				<button type="button" class="btn btn-primary" onclick="return Popup()">Read More</button>
			</div>
		</div>
    `;
	console.log(imdbID);
	createUrlPlot(imdbID);
};

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

const Popup = () => {
	fetchPlot();
	btn = document.getElementById("myModal");
	modal.style.display = "block";
	span.onclick = function () {
		modal.style.display = "none";
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
};

const createUrlPlot = (imdbID) => {
	URL = "HTTPS://www.omdbapi.com/?i=" + imdbID + "&apikey=798804bf";
	console.log(URL);
	fetchPlot(URL);
};

const fetchPlot = (URL) => {
	fetch(URL)
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			return response;
		})
		.then((response) => showModal(response))
		.catch((error) => console.error(error));
};

const showModal = (response) => {
	let plot = response.Plot;
	console.log(plot);
	let movieTitle = response.Title;
	let startYear = response.Year;
	let moviePoster = response.Poster;
	var content = document.getElementsByClassName("content")[0];
	content.innerHTML = `
           <div class="card-title">${movieTitle}</div>
            <p>${startYear}<p>
            <p>${plot}<p>
            <img src='${moviePoster}' alt=''width="130" height="150" />
    `;
};

// let items = document.querySelectorAll(".box");
// items.forEach(function (item) {
// 	item.classList.add("not-visible");
// 	IntersectionObserver.observe(item);
// });
