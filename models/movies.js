const Joi = require('joi');
const { func } = require('joi');
const mongoose = require('mongoose');
const { genreSchema, validateGenre } = require('./genre');

const moviesSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 255,
		trim: true
	},
	genre: {
		type: genreSchema,
		required: true
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 255
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 255
	}
});

const validateMovie = function (movie) {
	const schema = Joi.object({
		title: Joi.string().min(0).max(255).required(),
		genreName: Joi.string().required(),
		numberInStock: Joi.number().min(0).max(255).required(),
		dailyRentalRate: Joi.number().min(0).max(255).required()
	});
	return schema.validate(movie);
};

const Movie = mongoose.model('movie', moviesSchema);
module.exports = {
	Movie,
	moviesSchema,
	validateMovie
};
