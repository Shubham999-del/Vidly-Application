const express = require('express');
const router = express.Router(); //
const { Customer, validateCustomer } = require('../models/customer');

router.get('/', async (req, res) => {
	const customers = await Customer.find();
	if (!customers.length) return res.status(400).send('No customer record avialable');
	res.send(customers);
});

router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);
	if (!customer) return res.status(404).send('Customer not found!');
	res.send(customer);
});

router.post('/', async (req, res) => {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send('Invalid input of the fields');
	let customer = new Customer({
		name: req.body.name,
		isGold: req.body.isGold,
		phone: req.body.phone
	});
	customer = await customer.save();
	res.send(customer);
});

//only for testing purpose
router.post('/postMany', async (req, res) => {
	const customersToBeAdded = req.body;
	customersToBeAdded.forEach(async (newCustomer) => {
		const { error } = validateCustomer(newCustomer);
		if (error) {
			return res.send(error.details[0].message);
		} else {
			const customer = new Customer({
				name: newCustomer.name,
				isGold: newCustomer.isGold,
				phone: newCustomer.phone
			});
			const result = await customer.save();
			console.log(result);
		}
	});
	res.status(200).send('All customers added succesfully');
});

//update has to be protected
router.put('/:id', async (req, res) => {
	const { error } = validateCustomer(req.body);
	if (error) {
		res.status(400).send('Bad request. Input is invalide');
		return;
	}
	let customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone });
	if (!customer) return res.status(404).send('Customer not found!!!');
	customer = req.body;
	res.send(customer);
});

router.delete('/:id', async (req, res) => {
	const customer = await Customer.findByIdAndDelete(req.params.id);
	if (!customer) return res.status(404).send('Customer is aready deleted...');
	res.send(customer);
});

module.exports = router;
