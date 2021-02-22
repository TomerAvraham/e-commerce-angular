const sumCartTotalValue = (products) => {
  let totalSum = 0;

  if (!products || !products.length) {
    return totalSum;
  }

  products.map((product) => (totalSum = totalSum + product.totalPrice));

  return totalSum;
};

module.exports = sumCartTotalValue;
