const Joi = require('joi');
const mongooose = require('mongoose');

const rentalSchema = new mongooose.Schema({
	customer: new mongooose.Schema({
		name: {
			type: String,
			required: true
		},
		isGold: {
			type: Boolean,
			default: false
		},
		phone: {
			type: String,
			required: function () {
				return this.name ? true : false;
			},
			maxlength: 10,
			minlength: 0
		}
	}),
	movie: new mongooose.Schema({
		title: {
			type: String,
			required: true,
			minLength: 0,
			maxLength: 255,
			trim: true
		},
		dailyRentalRate: {
			type: Number,
			required: true,
			min: 0,
			max: 255
		}
	}),
	dateOut: {
		type: Date,
		required: true,
		default: Date.now()
	},
	dateReturned: {
		type: Date
	},
	rentalFee: {
		type: Number,
		require: true
	}
});

const Rental = mongooose.model('rental', rentalSchema);

const validate = function (rental) {
	const schema = Joi.object({
		customerID: Joi.objectId().required(),
		movieID: Joi.objectId().required(),
		rentalFee: Joi.required()
	});
	return schema.validate(rental);
};

module.exports = {
	rentalSchema,
	Rental,
	validate
};
