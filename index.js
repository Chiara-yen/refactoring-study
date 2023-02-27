const statement = require( "./src/statement.js");
const customer = require("./src/customer.json");
const movies = require("./src/movies.json");

const result = statement(customer, movies);
console.log(result);
