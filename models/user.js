var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = new mongoose.Schema({
name :{type:String},
phone :{type:String},
role : {type:String},
email : {type:String},
username : {type:String},
thana : {type:String}
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
