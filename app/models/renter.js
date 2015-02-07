var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RenterSchema = new Schema({
	name: String,
	assessment: String
});

module.exports = mongoose.model("Renter", RenterSchema);