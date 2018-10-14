function setupCors(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,HEAD,PUT,PATCH,POST,DELETE');
    next();
  });
}

module.exports = {
  setupCors: setupCors
}
