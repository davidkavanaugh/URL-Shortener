const app = require('./app');
const config = require('./config');

const { PORT } = config;

// Start Server
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

// Express App at index.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/client/public/index.html');
  });
