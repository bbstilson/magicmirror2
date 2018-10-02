const setupCors = require('./utils.js').setupCors;

const express = require('express');

// SERVER SETUP
const app = express();
const PORT = (process.env.PORT || 4000);

// ALLOW CORS
setupCors(app);

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
