// TODO: new request to get HTML version result
function statement(customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;

  function movieFor(rental) {
    return movies[rental.movieID];
  }

  function amountFor(r) {
    let result = 0;

    // determine amount for each movie
    switch (movieFor(r).code) {
      case "regular":
        result = 2;
        if (r.days > 2) {
          result += (r.days - 2) * 1.5;
        }
        break;
      case "new":
        result = r.days * 3;
        break;
      case "childrens":
        result = 1.5;
        if (r.days > 3) {
          result += (r.days - 3) * 1.5;
        }
        break;
    }
    return result;
  }

  function frequentRenterPointsFor(r) {
    return (movieFor(r).code === "new" && r.days > 2) ? 2 : 1;
  }

  for (let r of customer.rentals) {
    frequentRenterPoints += frequentRenterPointsFor(r);

    //print figures for this rental
    result += `\t${movieFor(r).title}\t${(amountFor(r))}\n` ;
    totalAmount += amountFor(r);
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
}

module.exports = statement;
