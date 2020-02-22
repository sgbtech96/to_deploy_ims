var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!!!!");

	con.query("SELECT * FROM customers", function (err, result, fields) {
	    if (err) throw err;
	    //module.exports=result;
	    console.log(result[1]);
	    //console.log(module.exports);
	    module.exports.jsonTable=result;

	  });

});
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req,res){
  res.sendfile("showtables.html");
  //res.send(exports.jsonTable);
});

// app.get('/tables/',(req,res)=>{
// 	var msg = require('./tables.js');
// 	res.send(msg.jsonTable);
// });
module.exports = router;
//module.exports.jsonTable='Hello world';