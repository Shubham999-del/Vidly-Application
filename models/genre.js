const Joi = require('joi');
const { default: mongoose, modelNames } = require('mongoose');

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 5,
		maxlength: 50,
		required: true
	}
});

const Genre = mongoose.model('Genre', genreSchema);

// validate function for Joi validation
function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required()
	});
	return schema.validate(genre);
}

module.exports = {
	genreSchema,
	Genre,
	validateGenre
};
