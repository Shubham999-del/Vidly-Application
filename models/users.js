const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 0,
		maxLength: 255,
		required: true
	},
	email: {
		type: String,
		minLength: 0,
		unique: true,
		required: true
	},
	password: {
		type: String,
		minLength: 0
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

userSchema.methods.generateToken = function () {
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
	return token;
};
const User = mongoose.model('User', userSchema);

const validateUser = function (user) {
	const schema = Joi.object({
		name: Joi.string().max(255).required(),
		email: Joi.string().min(0).max(255).email().required(),
		password: Joi.string().min(0).max(255).required()
	});
	return schema.validate(user);
};

module.exports = {
	User,
	validateUser
};
