// TODO: new request to get HTML version result
function statement(customer, movies) {
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

  function totalPoints() {
    let frequentRenterPoints = 0;
    for (let r of customer.rentals) {
      frequentRenterPoints += frequentRenterPointsFor(r);
    }
    return frequentRenterPoints;
  }

  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    //print figures for this rental
    result += `\t${movieFor(r).title}\t${(amountFor(r))}\n` ;
  }

  function getTotalAmount() {
    let totalAmount = 0;
    for (let r of customer.rentals) {
      totalAmount += amountFor(r);
    }
    return totalAmount;
  }

  // add footer lines
  result += `Amount owed is ${(getTotalAmount())}\n`;
  result += `You earned ${(totalPoints())} frequent renter points\n`;

  return result;
}

module.exports = statement;
