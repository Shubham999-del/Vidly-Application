const express = require('express');
const router = express.Router(); //
const { Movie, validateMovie } = require('../models/movies');
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
	const movies = await Movie.find();
	if (!movies || !movies.length) {
		return res.send('No movies added');
	} else return res.send(movies);
});

router.get('/:id', async function (req, res) {
	console.log(req.params.id);
	const movie = await Movie.findById(req.params.id);
	if (!movie) return res.status(404).send('Movie not found!!');
	res.status(200).send(movie);
});

router.post('/', async (req, res) => {
	const { error } = validateMovie(req.body);
	if (error) {
		res.send(error.details[0].message);
	} else {
		const genre = await Genre.find({ name: req.body.genreName });
		if (!genre) return res.status(404).send('Invalid genre');
		console.log(`If genre is undefined then this message ${genre}`);
		const movie = new Movie({
			title: req.body.title,
			//genre: genre, this is wrong as genre loaded from the database may be having a lot of other attributs as well whihc we do not want to embed in our movie object,
			genre: {
				name: genre[0].name
			},
			numberInStock: req.body.numberInStock,
			dailyRentalRate: req.body.dailyRentalRate
		});
		const result = await movie.save();
		// console.log(result);
		res.send(movie);
	}
});

router.put('/:id', async (req, res) => {
	// Validate
	//If invalid, return 400 -Bad request
	const { error } = validateMovie(req.body);
	if (error) {
		res.status(400).send('Bad request. Input is invalid');
		return;
	}
	// look up for the genre
	// If not existing, return 404,
	const genre = await Genre.find({ name: req.body.genreName });
	if (!genre) return res.status(404).send('Invalid genre selected!');
	const movie = await Movie.findByIdAndUpdate(req.params.id, {
		genre: {
			_id: genre._id,
			name: genre.name
		}
	});
	if (!movie) res.status(404).send('The movie you are looking for is not there with us');
	else {
		//Update movie
		res.send(movie);
	}
});

router.delete('/:id', async (req, res) => {
	// findng the genre
	const movie = await Genre.findByIdAndRemove(req.params.id);
	if (!movie) {
		return res.status(404).send('The genre is not there');
	} else {
		// deleteing the genre
		res.send(movie);
	}
});

module.exports = router;
