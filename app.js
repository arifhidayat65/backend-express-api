const Sentry = require('@sentry/node')

Sentry.init({ dsn: 'https://3ce31ecb14394bf9bfc6622fe1d1527b@sentry.io/1451275' });

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    controller = require('./controller');

    Sentry.init({ dsn: 'https://3ce31ecb14394bf9bfc6622fe1d1527b@sentry.io/1451275' });



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Sentry.Handlers.requestHandler());

app.get('/', function mainHandler(req, res) {
    throw new Error('Broke!');
  });

  // The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + '\n');
  });

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Learn Node JS With Kiddy, RESTful API server started on: ' + port);

