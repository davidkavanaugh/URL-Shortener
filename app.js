const express = require('express');
const bodyParser = require( 'body-parser');
const dns = require('dns');
const uuid = require('short-uuid');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const { MONGO_URI } = config;
const db = `${MONGO_URI}`;

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

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

const links = [];

// Create Database Entry
app.post('/api/shorturl/new', (req, res) => {
  const { url } = req.body;

  console.log(url);

  const regex =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  
  const noHTTPSurl = url.replace(regex, '');

  // check if this url is valid
  dns.lookup(noHTTPSurl, (err) => {

    if (err) {
      return res.json({
        error: "invalid URL"
      });
    } else {
      //increment id
      let id = uuid.generate();

      //create new entry for arr
      const link = {
        original_url: url,
        short_url: `${id}`
      };
      links.push(link);

      console.log(links);

      //return new entry
      return res.json(link)
    }
  });
});

app.get('/api/shorturl/:id', (req, res) => {
  const { id } = req.params;

  console.log('id from query:', id)

  const link = links.find(l => l.short_url === id);

  console.log('link found', link);

  if (link) {
    return res.redirect(link.original_url);
  } else {
    return res.json({
      error: "No short url"
    });
  }
})

module.exports = app;