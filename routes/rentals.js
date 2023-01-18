const express = require('express');
const { valid } = require('joi');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customer');
const router = express.Router(); //
const { Rental, validate } = require('../models/rentals');
const Fawn = require('fawn'); // for performing transactions in mongodb
const { default: mongoose } = require('mongoose');
Fawn.init('mongodb://localhost/vidly');

router.get('/', async (req, res) => {
	const rentals = await Rental.find();
	res.status(200).send(rentals);
});

router.get('/:id', async (req, res) => {
	const rental = Rental.findById(req.params.id);
	if (!rental) return res.status(404).send('No such rental present!');
	res.status(200).send(rental);
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.send(error.details[0].message);
	const movie = await Movie.findById(req.body.movieID);
	if (!movie) return res.status(404).send('No such movie exists');
	const customer = await Customer.findById(req.body.customerID);
	if (!customer) return res.status(404).send('No such customer exists');
	const rental = new Rental({
		movie: {
			title: movie.title,
			genre: movie.genre,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		},
		customer: {
			name: customer.name,
			isGold: customer.isGold,
			phone: customer.phone
		},
		rentalFee: req.body.rentalFee
	});
	new Fawn.Task()
		.save('rentals', rental)
		.update(
			'movies',
			{ _id: movie._id },
			{
				$inc: { numberInStock: -1 }
			}
		)
		.run()
		.then((result) => console.log(result))
		.catch((err) => console.log(err));
	res.status(200).send(rental);
});

module.exports = router;
