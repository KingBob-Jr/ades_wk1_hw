const express = require('express');
const path = require('path');
const ApiRouter = require('./routers/api');

// The web server
const app = express();


// To handle body
app.use(express.json());

// Web Server
app.use(express.static(path.join(__dirname, 'public')));

// APIs
app.use('/api', ApiRouter);

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// TODO: Error Handler

// Listen to port 8000
app.listen(process.env.PORT || 3000, function onListen() {
  var address = app.address();
 });
