const winston = require('winston-mongodb');
module.exports = (err, req, res, next) => {
	winston.error(err.message, err);
	res.status(500).send('Something went wrong!!');
	next();
};
