function statement(customer, movies, format = 'text') {
  switch (format) {
    case "text":
      return renderText();
    case "html":
      return renderHTML();
  }
  throw new Error(`unknown statement format ${format}`);

  function renderText() {
    let result = `Rental Record for ${customer.name}\n`;
    for (let r of customer.rentals) {
      //print figures for this rental
      result += `\t${movieFor(r).title}\t${(amountFor(r))}\n`;
    }

    // add footer lines
    result += `Amount owed is ${(getTotalAmount())}\n`;
    result += `You earned ${(getTotalPoints())} frequent renter points\n`;

    return result;
  }

  function renderHTML() {
    let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
    result += "<table>\n";
    for (let r of customer.rentals) {
      result += `  <tr><td>${movieFor(r).title}</td><td>${amountFor(r)}</td></tr>\n`;
    }
    result += "</table>\n";
    result += `<p>Amount owed is <em>${getTotalAmount()}</em></p>\n`;
    result += `<p>You earned <em>${getTotalPoints()}</em> frequent renter points</p>\n`;
    return result;
  }

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

  function getTotalPoints() {
    return customer.rentals
      .map((r) => frequentRenterPointsFor(r))
      .reduce((acc, curr) => acc + curr, 0);
  }

  function getTotalAmount() {
    return customer.rentals
      .reduce((total, r) => total + amountFor(r), 0);
  }
}

module.exports = statement;
