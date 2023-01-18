const express = require('express');
const error = require('../middleware/error');
const genres = require('../routes/genres');
const users = require('../routes/users');
const userAuth = require('../routes/auth');
const customers = require('../routes/customer');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
module.exports = function (app) {
	app.use(express.json()); //built-in middleware function that parses incoming JSON requests and puts the parsed data in req.body
	app.use('/api/genres', genres);
	app.use('/api/customers', customers);
	app.use('/api/movies', movies);
	app.use('/api/rentals', rentals);
	app.use('/api/users', users);
	app.use('/api/userauth', userAuth);
	app.use(error);
};
