var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RenterSchema = new Schema({
	name: String,
	trait1: String,
	trait2: String,
	assessmentId: String,
	description: String,
	property1: String,
	property2: String,
	property3: String,
	property4: String,
	property5: String
});

module.exports = mongoose.model("Renter", RenterSchema);