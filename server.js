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

//////////////////////
////SETUP Aerospike
/////////////////////
// var http = require('http');
// var api = require('./api');
// var dbStatusCode = null;
// // Establish connection to the cluster
// api.connect(function(response) {
//     dbStatusCode = response;
//     if ( dbStatusCode === 0) {
//         // handle success
//         console.log("Connection to Aerospike cluster succeeded!");
//     }
//     else {
//         // handle failure
//         console.log("Connection to Aerospike cluster failed!");
//     }
// });
// // Setup default/home route
// app.get('/', function(req,res) {
//     res.send("<div><form action='/write'>" +
//         "<label>Enter your name:</label>" +
//         "+<input type='text' name='name'/>" +
//         "<input type='submit'></input></form></div>");
// });
// // Setup write route
// app.get('/write', function(req,res) {
//     if (dbStatusCode === 0) {
//         api.writeRecord('Hello',req.query.name, function(response) {
//             if ( response.status === 0) {
//                 // handle success
//                 api.readRecord('Hello', function(response) {
//                     if ( response.status === 0) {
//                         // handle success
//                     }
//                     else {
//                         // handle failure
//                     }
//                     res.send(response.message);
//                 });
//             }
//             else {
//                 // handle failure
//                 res.send(response.message);
//             }
//         });
//     } else  {
//         res.send("Connection to Aerospike cluster failed!");
//     }
// });

///////////////////





//Configure body body-parser
app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());

traitify.setHost("api.traitify.com");
traitify.setVersion("v1");
traitify.setSecretKey("uhutbgmj5eo4thjdvj1di9j9vp");

var deckId = "core";
var assessmentId;
traitify.createAssessment(deckId, function(assessment){
    // Use assessment here.
    assessmentId = assessment.id;
    console.log(assessment.id);
});


//Views
app.set("view engine", 'ejs');

app.use(express.static(path.join(__dirname, '/views')));

//Routers
var router      = express.Router();


router.route("/index")
  .get(function(request, response){
    Renter.find(function(error, data){
        if(error) {console.log(error);}
        console.log(data);
        response.status(200).render("index", {
            assessmentId: assessmentId,
            data: data
        });
    });
  })
  .post(function(request, response){
    console.log(request);
    var renter = new Renter();
    renter.name = request.body.name;
    renter.assessmentId = request.body.assessmentId;
    renter.description = request.body.description;
    renter.property1 = request.body.property1;
    renter.property2 = request.body.property2;
    renter.property3 = request.body.property3;
    renter.property4 = request.body.property4;
    renter.property5 = request.body.property5;
    renter.trait1 = request.body.trait1;
    renter.trait2 = request.body.trait2;
    console.log(request.body);

    renter.save(function(err){
        if(err){console.log(err);}
        response.render("index", {
            assessmentId: assessmentId
        });
    });
  });

router.route("/assessment")
    .get(function(req, res){
        res.status(200).render("assessment", {
            assessmentId: assessmentId
        });
        traitify.getSlides(assessmentId, function(assessment){
            // Use assessment here.
            console.log(assessment);
        });
        traitify.getPersonalityTypes(assessmentId, function(assessment){
            // Use assessment here.
            console.log(assessment);
        });
    });


app.use(router);
//Set port to 8080
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Listening to port:', port);