let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () => {
        let movieName = movieNameRef.value.trim(); // Use .value to get input
        let key = "88413a7e"; // Replace with your actual API key
        let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

        if (movieName.length === 0) {
            result.innerHTML = `<h3 class="msg">Please Enter a Movie Name</h3>`;
        } else {
            fetch(url)
                .then((resp) => resp.json())
                .then((data) => {
                        if (data.Response === "True") {
                            result.innerHTML = `
                        <div class="info">
                            <img src="${data.Poster}" alt="${data.Title}" class="poster">
                            <div>
                                <h2>${data.Title}</h2>
                                <div class="rating">
                                    <img src="star-icon.webp" alt="Rating">
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    ${data.Genre.split(",").map(genre => `<div>${genre.trim()}</div>`).join("")}
                                </div>
                            </div>
                        </div>
                        <h3>Plot</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast</h3>
                        <p>${data.Actors}</p>
                    `;
                } else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch((error) => {
                console.error('API Error:', error);
                result.innerHTML = `<h3 class="msg">Error Occurred: ${error.message}</h3>`;
            });
    }
};

// Add event listeners
searchBtn.addEventListener("click", getMovie); // Correct case for "click"
window.addEventListener("load", getMovie); // Correct "windows" to "window"
