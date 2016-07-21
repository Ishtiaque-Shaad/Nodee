var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app  = express();
var PORT = process.env.PORT || 5000;
var validationIssue = require('property-validator');

app.use(cors());
// using route
app.use('/', require('./route'));
app.use(validationIssue.assertMiddleware);


// error handler

app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: {}
	});
  var isValidationError = (err instanceof validationIssue.ValidationError);
  if (!isValidationError) {
    return next(err);
  }
  var messages = err.messages;
  res.status(422);
  res.json({
    notice: "Your request is invalid",
    errors: messages
  })

});



app.get('/', function(req, res, next){
	res.status(200).json({
		status: 'avaialbe',
		uptime: Math.round(process.uptime())
	});
});

app.listen(PORT);
console.log('Start on port' + PORT); 