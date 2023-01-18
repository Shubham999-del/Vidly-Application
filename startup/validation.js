const Joi = require('joi'); // this package s to handle input validationfor handling the post requests from the user. We can set the different validations in joi .
module.exports = function () {
	Joi.objectId = require('joi-objectid')(Joi); // this is to add the objectID to the joi validaion functions so that our schema that we define in the Joi can ahve an attribute that is of type objectID
};
