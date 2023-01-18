# Vidly-Application
## The project is a Nodejs + MongoDB application based on movie ticket booking and users' registrations and logins
### Dont forget to run index.js <br>
The project contains the following models :-
* Movie : it represent Movie as a object having attributes like genre, ticket price, tickets remaining etc..<br>
* Genre : so that we may have a single place for viewing all the different types of genres of movies avialable<br>
* Customer : represeting a customer for every movie that is getting streamed <br>
* Rental : for storing all the transactions that have happened 
* User : for storing our registered users so that some discounts/offers may be offered to them <br>

<br>
The project has all the different components refactored in a clean and understandable way as follows :- <br><br>

* index.js : main file that gets executes in order to run the application <br>
* model : containing all the models listed above <br>
* routes : containing all the RESTApi implementations for the above models along with authentication of the user using jsonwebtoken varification <br>
* middleware : containing all the essential middlewares for authorization, authentication, error handling <br>
* config : for all configuration setting and jsonwebtoken mapping that is present as an environment variable <br>
* startup : containing a js file for every single purpose like :- establishing connection with the DB, setting the config, importing all the routes in one place, validation.js for validation purposes etc..<br>
<br>

### Have included DockerFile as well for all required modules and setting up the environment smoothly
