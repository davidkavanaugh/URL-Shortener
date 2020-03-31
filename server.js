const app = require('./app');

// Express App at index.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/client/public/index.html');
  });
