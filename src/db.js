// this is a mock database module
// in a real application, this would connect to a database like MongoDB, PostgreSQL or MySQL
// for simplicity, we are using an in-memory array to store properties
// if we are to use a real database, we would replace this with actual database operations or ORM methods
export const db = {
  properties: [],
};
