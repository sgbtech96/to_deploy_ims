var mongoose = require("mongoose");

var RequestSchema = new mongoose.Schema({
byThana :{type:String},
onDate :{type:Date},
forItem : {type:String},
});


module.exports = mongoose.model("Request", RequestSchema);