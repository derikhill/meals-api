require('dotenv').config({ path: './vars.env'});

const connectToDatabase = require('./db');
const Meal = require('./models/Meal');

'use strict';

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
  .then( () => {
    Meal.create(JSON.parse(event.body))
    .then( meal => callback( null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(meal)
    }))
    .catch( err => callback( null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not create meal"
    }));
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
  .then( () => {
    Meal.findById( event.pathParameters.id)
    .then( meal => callback( null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(meal)
    }))
    .catch( err => callback( null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not fetch meal"
    }));
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
  .then( () => {
    Meal.find()
    .then( meals => callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(meals)
    }))
    .catch( err => callback( null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not fetch meals"
    }));
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
  .then( () => {
    Meal.findByIdAndUpdate( event.pathParameters.id, JSON.parse(event.body), { new: true })
    .then( meal => callback(null, {
      statusCode: 200,
      body: JSON.stringify(meal)
    }))
    .catch( err => callback( null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not update meal"
    }));
  })
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
  .then( () => {
    Meal.findByIdAndRemove( event.pathParameters.id )
    .then( meal => callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: `Meal ${meal._id} has been deleted`, meal: meal})
    }))
    .catch( err => callback( null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not delete meal"
    }));
  })
};
