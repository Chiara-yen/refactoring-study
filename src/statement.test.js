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

test('statement result equal to specific HTML', () => {
  expect(statement(customer, movies, 'html')).toEqual(`<h1>Rental Record for <em>martin</em></h1>
<table>
  <tr><td>Ran</td><td>3.5</td></tr>
  <tr><td>Trois Couleurs: Bleu</td><td>2</td></tr>
</table>
<p>Amount owed is <em>5.5</em></p>
<p>You earned <em>2</em> frequent renter points</p>
`)
});