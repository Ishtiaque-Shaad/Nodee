var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var controllers = require('./controllers');
var bookshelf = require('./bookshelf');
var validationIssue = require('property-validator');
var urlencode = bodyParser.urlencoded({extended: false});

// app.use(validationIssue.assertMiddleware);

var Videos = bookshelf.Model.extend({
  tableName: 'videos'
});

router.get('/', controllers.status.get);

//property validation

router.get('/hello', function(req, res){
  validationIssue.assertAll(req, [
    validationIssue.presence('username'),
    validationIssue.email('email_address')
  ]);
  res.status(200).json({ name: req.query.username });
});


// show data
router.get('/videos', function(req, res, next){
	Videos.fetchAll().then(function(result){
		res.json(result.toJSON());
	 });
});

//insert data 

router.post('/insert', urlencode, function(req, res, next){ 
	new Videos({ 
		title: req.body.title,
		desc: req.body.desc
	})
	.save().then(function(result){
		res.json(result.toJSON());
	});
});

// update data 

router.put('/update/',urlencode, function (req, res, next) {
	new Videos({id: req.body.id})
			.fetch()
			.then(function(data){
				data.save({
					title: req.body.title || data.get(title),
					desc: req.body.desc || data.get(desc)
				})
				.then(function(result){
					res.json(result.toJSON());
				})
			});
});


// delete data

router.delete('/delete', urlencode, function(req, res, next){
	 console.log(req.body.id);
	 new Videos({id: req.body.id}).destroy().then(function(result){
	 	res.json(result.toJSON());
	 }) 
});




router.get( '/index.html', function(req, res, next){
	res.status(200).json({
		status: 'Available',
		uptime: Math.round(process.uptime())
	});
});

module.exports = router;