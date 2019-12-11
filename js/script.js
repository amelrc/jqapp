$(document).ready(() => {
	$('#searchForm').on('submit', e => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});

const apikey = 'd7ab1185';

const getMovies = searchText => {
	axios
		.get(`http://www.omdbapi.com/?s=${searchText}&apikey=${apikey}`)
		.then(res => {
			let movies = res.data.Search;
			let output = '';
			console.log(res);
			$.each(movies, (index, movie) => {
				console.log(movie.imdbID);
				output += `
				<div class='card'>
					<div class='card-body'>
						<img src='${movie.Poster}' />
						<h5 class="card-title">${movie.Title}</h5>
						<a href='#details'>
							<button
								onclick="movieSelected('${movie.imdbID}')"
								class='btn btn-primary'
								type='button'
							>
								details
							</button>
						</a>
					</div>
				</div>
				`;
			});
			$('#movies').html(output);
		})
		.catch(err => {
			console.log(err);
		});
};

const movieSelected = id => {
	console.log(id);
	axios
		.get(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}`)
		.then(res => {
			console.log('peli', res);
			let movie = res.data;
			let details = `
				<div id='details' class='jumbotron'>
					<h2>${movie.Title}</h2>
					<h5>${movie.Actors}</h5>
					<p>Directed by ${movie.Director}</p>
					<p>${movie.Genre}</p>
					<p>${movie.Year}</p>
					<p>${movie.Plot}</p>
				</div>`;
			$('#info').html(details);
		})
		.catch(err => {
			console.log(err);
		});
};
