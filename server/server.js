const setupCors = require('./utils.js').setupCors;

const express = require('express');
const bodyParser = require('body-parser');

// SERVER SETUP
const app = express();
const PORT = (process.env.PORT || 4000);

// ALLOW CORS
setupCors(app);

app.use(bodyParser.json({
  type: 'application/json',
}))

// ROUTES
require('./resource/applyRoutes.js')(app);

// START
app.listen(PORT, (err) => {
  if (err) {
    console.warn(`Error in app.listen: ${err}`);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});
