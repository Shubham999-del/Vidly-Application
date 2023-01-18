const express = require('express'); // we need express because it is a framework that manages the different end points that we are going to have in a better managable format. Without express ,HTTP module has to be imported and then if .. else if statements are needed to hit the different end points

const morgan = require('morgan'); // logs the HHTP requests made in the console
const winston = require('winston');

const startupDebugger = require('debug')('app:startup');
require('dotenv').config();
const app = express(); // app is the object of the express framework that will be used to create the CRUD operations for the project
//built-in middlewares
app.use(express.urlencoded({ extended: false })); //parses incoming requests with URL encoded payloads
app.use(express.static('./public'));
//all the different components of the app
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

//configuration
if (process.env.NODE_ENV === 'development') {
	console.log(process.env.NODE_ENV);
	startupDebugger('Morgan enabled...');
	app.use(morgan('tiny'));
}

app.get('/', (req, res) => {
	res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on ${port}...`));
