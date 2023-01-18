const mongooose = require('mongoose');
const _ = require('lodash');
const { User } = require('../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid username or password');
	// comapre function to check if the user is authentic
	const result = await bcrypt.compare(req.body.password, user.password);
	// console.log(result);
	if (!result) return res.status(400).send('Invalid email or password');
	//generating jwt token
	const token = user.generateToken();
	// better way of generating a token
	// const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
	// not a good way of generating a token
	res.status(200).send(token);
});

//Information expert principle
//states that user knows everthing about any user type object like its _id,_name etc etc. In future we may be requiring additional info to be added in the payload of the generated token. So the task of generating a token for a user should be done by the user object itself i.e. User model must have a method that generates a token for a user. So when we create and authenticate the user, we can generate a token simly by calling user.generateToken()

const validate = function (user) {
	const schema = Joi.object({
		email: Joi.string().min(0).max(255).email().required(),
		password: Joi.string().min(0).max(255).required()
	});
	return schema.validate(user);
};

module.exports = router;
