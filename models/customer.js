const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		minlength: 3,
		maxlength: 20
	},
	isGold: {
		type: Boolean,
		required: true
	},
	phone: {
		type: String,
		required: function () {
			return this.name ? true : false;
		},
		maxlength: 10,
		minlength: 0
	}
});
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(20).required(),
		isGold: Joi.boolean().required(),
		phone: Joi.string().max(10).min(0).required()
	});
	return schema.validate(customer);
}

module.exports = {
	Customer,
	customerSchema,
	validateCustomer
};
