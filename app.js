const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require( 'body-parser');
const config = require('./config');

const { MONGO_URI } = config;

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = `${MONGO_URI}`;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) 
  // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

module.exports = app;