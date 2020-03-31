const app = require('./app');
const config = require('./config');
const { PORT } = config;

// Start Express Server at '/'
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/client/public/index.html');
  });
