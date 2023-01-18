const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router(); //
const { Genre, validateGenre } = require('../models/genre');
const isAdmin = require('../middleware/isAdmin');

router.get('/', async (req, res) => {
	const genres = await Genre.find();
	if (!genres.length) return res.send('No genres present');
	// console.log(genres);
	res.send(genres);
});

router.get('/:id', async (req, res) => {
	const genre = await Genre.findById(req.params.id);
	if (!genre) return res.status(404).send('Genre not found');
	res.send(genre);
});

router.post('/', [auth, isAdmin], async (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) {
		res.send(error.details[0].message);
	} else {
		let genre = new Genre({
			name: req.body.name
		});
		genre = await genre.save();
		res.send(genre);
	}
});

router.put('/:id', async (req, res) => {
	// Validate
	//If invalid, return 400 -Bad request
	const { error } = validateGenre(req.body);
	if (error) {
		res.status(400).send('Bad request. Input is invalide');
		return;
	}
	// look up for the genre
	// If not existing, return 404,
	const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name });
	if (!genre) res.status(404).send('The genre you are looking for is not there with us');
	else {
		//Update genre
		genre.name = req.body.name;
		//return updated genre
		res.send(genre);
	}
});

router.delete('/:id', async (req, res) => {
	// findng the genre
	const genre = await Genre.findByIdAndRemove(req.params.id);
	if (!genre) {
		return res.status(404).send('The genre is not there');
	} else {
		// deleteing the genre
		res.send(genre);
	}
});

module.exports = router;
