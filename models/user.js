var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
name :{type:String},
rollno :{type:String},
role : {type:String},
age : {type:Number},
email : {type:String},
username : {type:String},
collagename : {type:String}
});

module.exports = mongoose.model("User", UserSchema);