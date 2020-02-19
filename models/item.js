var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
name :{type:String},
type :{type:String},
quantity : {type:Number},
from : {type:String},
distributor : {type:String},
depriciationRate : {type:Number},
billNo: {type:Number}
});

module.exports = mongoose.model("Item", ItemSchema);