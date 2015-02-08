//Add neccessary packages
var express		= require('express');
var app			= express();
var bodyParser	= require('body-parser');
var mongoose	= require('mongoose');
var traitify    = require('traitify');
var Renter      = require('./app/models/renter');
var path        = require('path');

//Connect to the database
mongoose.connect('mongodb://brian:mongo@ds039441.mongolab.com:39441/briansdatabase');

//Configure body body-parser
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

traitify.setHost("api-sandbox.traitify.com");
traitify.setVersion("v1");
traitify.setSecretKey("uhutbgmj5eo4thjdvj1di9j9vp");

var deckId = "super-hero";

traitify.createAssessment(deckId, function(assessment){
    // Use assessment here.
    console.log(assessment);
});

//Views
app.set("view engine", 'ejs');

app.use(express.static(path.join(__dirname, '/views')));

//Routers
var router      = express.Router();


router.route("/renter")
  .get(function(request, response){
    Renter.find(function(error, data){
        if(error) {console.log(error);}
        console.log(data);
        response.status(200).render("index");
        // response.render('index');
    });
  })
  .post(function(request, response){
    console.log(request);
    var renter = new Renter();
    renter.name = "brian";
    renter.save(function(err){
        if(err){console.log(err);}
        response.json({message: "post worked"});
    });
  });

app.use(router);
//Set port to 8080
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Listening to port:', port);