//Add neccessary packages
var express		= require('express');
var app			= express();
var bodyParser	= require('body-parser');
var mongoose	= require('mongoose');
var traitify    = require('traitify');
// var TrafficPoint= require('./app/models/traffic_point');
var Renter = require('./app/models/renter');

//Connect to the database
mongoose.connect('mongodb://brian:mongo@ds039441.mongolab.com:39441/briansdatabase');

traitify.setHost("api-sandbox.traitify.com");
traitify.setVersion("v1");
traitify.setSecretKey("uhutbgmj5eo4thjdvj1di9j9vp");

var deckId = "super-hero";

traitify.createAssessment(deckId, function(assessment){
    // Use assessment here.
    console.log(assessment);
});

//Configure body body-parser
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

//Set port to 8080
var port = process.env.PORT || 8080;

//Routes for the api
var router = express.Router();

app.listen(port);
console.log('Listening to port:', port);