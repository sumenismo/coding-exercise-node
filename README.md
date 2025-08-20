# Coding Exercise

A simple Express.js API for adding and searching properties.  
Uses an in-memory database for now.

## Features

- Add new properties (with duplicate address check)
- Get all properties
- Filter properties by suburb
- Automatically tags each property as **above**, **below**, or **same** as the average sale price

## Tech Stack

- Node.js
- Express.js

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

API will run on http://localhost:3000

## Example Endpoints

GET /properties ( get all properties )
GET /properties?suburb=Brighton&state=TAS ( filter by suburb and state )
POST /properties ( add a new property )
