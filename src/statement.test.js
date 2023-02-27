const statement = require('./statement');
const customer = require("./customer.json");
const movies = require("./movies.json");

test('statement result equal to specific string', () => {
  expect(statement(customer, movies)).toEqual(`Rental Record for martin
\tRan\t3.5
\tTrois Couleurs: Bleu\t2
Amount owed is 5.5
You earned 2 frequent renter points
`)
});