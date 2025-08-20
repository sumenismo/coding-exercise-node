function getAveragePrice(properties) {
  if (properties.length === 0) return 0;
  return properties.reduce((a, c) => a + c.salePrice, 0) / properties.length;
}

function comparePriceToAverage(property, averagePrice) {
  if (property.salePrice < averagePrice) return 'below';
  if (property.salePrice > averagePrice) return 'above';
  return 'same';
}

function enrichProperties(properties) {
  // we can do it this way since we are using in-memory db and not expecting a large number of properties
  // in a production with large number of data, we would use a database query to calculate the average price
  // to avoid loading all properties into memory
  const averagePrice = getAveragePrice(properties);

  const enrichedProperties = properties.map((property) => ({
    ...property,
    averagePriceComparison: comparePriceToAverage(property, averagePrice),
  }));

  return enrichedProperties;
}

function checkForDuplicateProperty(properties, newProperty) {
  return properties.find(
    (property) =>
      property.address.street === newProperty.address.street &&
      property.address.suburb === newProperty.address.suburb &&
      property.address.state === newProperty.address.state &&
      property.address.zip === newProperty.address.zip
  );
}

export { checkForDuplicateProperty, enrichProperties };
