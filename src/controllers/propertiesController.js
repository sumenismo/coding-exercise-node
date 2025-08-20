import { db } from '../db.js';
import {
  checkForDuplicateProperty,
  enrichProperties,
} from '../utils/properties.js';

function addProperty(req, res) {
  const newProperty = req.body;
  // check to prevent duplicate properties
  const duplicate = checkForDuplicateProperty(db.properties, newProperty);

  if (duplicate) {
    return res.status(400).json({ message: 'Property already exists' });
  }

  db.properties.push({ ...newProperty, id: db.properties.length + 1 });
  res.status(201).json({ message: 'Property added successfully', newProperty });
}

function getProperties(req, res) {
  const { suburb, state } = req.query;
  // we can return all properties from the in-memory database
  // if we are using a real database with thousands of data, we would query the database for properties and add pagination, sorting, etc.
  let properties = db.properties;

  // filter properties by suburb and state if both are provided
  // decided to add state filter as some suburb names can be the same in different states
  // this filter is for the in-memory database, we should ideally use a database query in production to filter properties
  if (suburb && state) {
    properties = properties.filter(
      (property) =>
        property.address?.suburb?.toLowerCase() === suburb.toLowerCase() &&
        property.address?.state?.toLowerCase() === state.toLowerCase()
    );

    properties = enrichProperties(properties);
  }

  res.status(200).json(properties);
}

export { addProperty, getProperties };
