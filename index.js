let apiKey = prompt("Type in your api key ?");
var selector = document.getElementById("movie");

const createUrl = (keywordInputValue) => {
	url = "https://www.omdbapi.com/?s=" + keywordInputValue + "&apikey=" + apiKey;
};

window.addEventListener("DOMContentLoaded", () => {
	document
		.querySelector(".addKeywordsForm")
		.addEventListener("submit", (event) => {
			event.preventDefault();
			const keywordInputValue = document.querySelector("input[type='text']")
				.value;
			createUrl(keywordInputValue);
			selector.innerHTML = "";
			console.log(url);
			requestSearch(url);
		});
});

const requestSearch = (url) => {
	fetch(url)
		.then((response) => response.json())
		.then((response) => {
			ShowMovies(response.Search);
		})
		.catch((error) => console.error(error));
};

let ShowMovies = (movies) => {
	selector.innerHTML = "";
	for (let i in movies) {
		selector.innerHTML += `
			<div class="d-flex row border rounded mb-3">
			<img class="img-thumbnail m-3" style="max-width: 8rem;" src="${movies[i].Poster}">
            <div class="card-body">
				<h1 class="card-title">${movies[i].Title}</h1>
				<p class="card-text">${movies[i].Year}</p>
				<p class="card-text">${movies[i].imdbID}</p>
				<button type="button" class="btn btn-primary" onclick="return createUrlPlot('${movies[i].imdbID}')">Read More</button>
			</div>
		</div>
    `;
	}
};

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var btn = document.getElementById("myModal");

const createUrlPlot = (imdbID) => {
	let URL = "https://www.omdbapi.com/?i=" + imdbID + "&apikey=" + apiKey;
	fetch(URL)
		.then((response) => response.json())
		.then((response) => showModal(response))
		.catch((error) => console.error(error));
};

let showModal = (movie) => {
	var modal = document.getElementById("myModal");
	modal.style.display = "block";
	var content = document.getElementsByClassName("content")[0];
	content.innerHTML = `
           <div class="card-title">${movie.Title}</div>
            <p>${movie.Year}<p>
            <p>${movie.Plot}<p>
            <img src='${movie.Poster}' alt=''width="130" height="150" />
	`;

	span.onclick = function () {
		modal.style.display = "none";
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
};

// let items = document.querySelectorAll(".row");
// items.forEach(function (item) {
// 	item.classList.add("not-visible");
// 	IntersectionObserver.observe(item);
// });
