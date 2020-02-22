var express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
ejs = require('ejs'),
LocalStrategy = require("passport-local"),
app = express(),
passport = require('passport'),
expressSessions = require('express-sessions');
const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://imshp:imshp@ims-hp-d5aao.mongodb.net/test?retryWrites=true&w=majority");


var db=mongoose.connection;
var User=require('./models/user');


app.use(require('express-session')({
    secret: "Assignment",
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/',function(req,res){
	res.render('index');
});


app.get('/login',function(req,res){
	res.render('login');
});


app.get('/register',function(req,res){
	res.render('register');
});


app.post('/register',function(req,res){
	User.register(new User({'name':req.body.name,'username':req.body.username,'role':req.body.role}),req.body.password,function(err,user){
		if(err)
			console.log(err);
		else{
			passport.authenticate("local")(req,res,function()
			{
					res.status(200).send(user);
			});
	}}
	);
});


app.post('/login',passport.authenticate("local",{failureRedirect:'/login'}),function(req,res)	{
	
		
				res.status(200).send(req.user);
					
	
		
});


			







// Backend Dhruv 22 feb2020

var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');

app.use(session({secret: "Shh, its a secret!"}));

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}



app.get('/',function(req,res){
  res.sendfile("index.html");
  // res.query
});

app.get('/home/', checkAuth, function (req, res) {
  res.sendfile('./home.html');
});

//var showtables=require('./tables');

//#############********************** User side *************##############

app.get('/viewDemands/',function(req,res){

	  res.sendfile("./showtables.html");
});


app.get('/tables/',(req,res)=>{

	//var url = "mongodb://localhost:27017/mydb";
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("demand").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log("Connected!!",result);
	    res.send(result);
	    db.close();
	  });
	});
});






app.post('/submitted',function(req,res){

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");

	  var myobj = {	
	  	name :req.body.name, 
	  	address :req.body.address,
	  	desc :req.body.desc,
	  	qty :req.body.qty,
	  	category :req.body.category,
	  	status:"requested"};
	  dbo.collection("demand").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });
	}); 

	res.redirect('/viewDemands');
	
	//res.sendfile("showtables.html");
});

app.get('/viewRecieved/',function(req,res){

	  res.sendfile("./recieved.html");
});


app.get('/recieved/',(req,res)=>{

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	var dbo = db.db("mydb");
	var ObjectID = require('mongodb').ObjectID;

	query={ "_id": ObjectID(req.query.id)}

	  console.log(query);
	  var newvalues = { $set: {  status:"Recieved/Delivered" ,bill_no: req.query.bill_no} };
	  dbo.collection("demand").updateOne(query, newvalues, function(err, res) {
	    if (err) throw err;
	    console.log("1 document updated!!!");
	    db.close();
	  });

	}); 
	
	// delete msg.jsonTable;
});


app.get('/recievedTable/',(req,res)=>{

	//var url = "mongodb://localhost:27017/mydb";
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("demand").find({status:"Inventory Approved"}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log("Connected!!",result);
	    res.send(result);
	    db.close();
	  });
	});
});




//##################****************** KHC Store *************###########

app.get('/inventory/',function(req,res){

	  res.sendfile("./inventory.html");
});



app.get('/addcatPage/',function(req,res){

	  res.sendfile("./addcatPage.html");
});



app.get('/addcat',function(req,res){

	var category=req.query.category;

	console.log("category is:"+category);

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  var myobj = { cat_no: 1, category: category };
	  dbo.collection("category").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });

	  // Upadate Inventory
	  var myobj1 = { qty: 0, category: category };
	  dbo.collection("inventory").insertOne(myobj1, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });


	 
	});

	res.send("Category Added");
	// //res.sendfile("showtables.html");
});





app.get('/inventoryTable/',(req,res)=>{

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("inventory").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    res.send(result);
	    db.close();
	  });
	}); 
	
	// delete msg.jsonTable;
});


app.get('/addQtyPage/',(req,res)=>{
	res.sendfile("addQty.html");

});


app.get('/addQty/',(req,res)=>{

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  query={category:req.query.category};

	  dbo.collection("inventory").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    

	  //var myquery = { address: "Valley 345" };
	  console.log("qtyyy",result[0]['qty']);
	  var newvalues = { $set: {  qty:Number(req.query.qty) + Number(result[0]['qty']) } };
	  dbo.collection("inventory").updateOne(query, newvalues, function(err, res) {
	    if (err) throw err;
	    console.log("1 document updatedddddd");
	    db.close();
	    
	  });
	  res.send("Quantity Updated!!");
	  });
	}); 
	
	// delete msg.jsonTable;
});


app.get('/i_approve/',(req,res)=>{

	var ObjectID = require('mongodb').ObjectID;

	
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  query={category:req.query.category};

	  dbo.collection("inventory").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    

	  //var myquery = { address: "Valley 345" };
	  console.log("qtyyy",result[0]['qty']);
	  var newvalues = { $set: {  qty:(-1)*Number(req.query.qty) + Number(result[0]['qty']) } };
	  dbo.collection("inventory").updateOne(query, newvalues, function(err, res) {
	    if (err) throw err;
	    console.log("1 document updatedddddd");

		  console.log(query);
		  var newvalues = { $set: {  status:"Inventory Approved" } };
		  query={ "_id": ObjectID(req.query.id)};
		  dbo.collection("demand").updateOne(query, newvalues, function(err, res) {
		    if (err) throw err;
		    console.log("1 document updatedddddd");
		    db.close();
		  }); 

	  });
	  res.send("Quantity Updated!!");
	  });
	}); 
	
	// delete msg.jsonTable;
});


// app.get('/i_approve/',(req,res)=>{

// 	MongoClient.connect(url, function(err, db) {
// 	  if (err) throw err;
// 		var dbo = db.db("mydb");
// 		var ObjectID = require('mongodb').ObjectID;

// 		query={ "_id": ObjectID(req.query.id)};

// 		  console.log(query);
// 		  var newvalues = { $set: {  status:"Inventory Approved" } };
// 		  dbo.collection("demand").updateOne(query, newvalues, function(err, res) {
// 		    if (err) throw err;
// 		    console.log("1 document updatedddddd");
// 		    db.close();
// 		  });

// 	}); 
	
// 	// delete msg.jsonTable;
// });


app.get('/i_viewDemand/',function(req,res){

	  res.sendfile("./i_viewDemand.html");
});


app.get('/category/',(req,res)=>{

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("category").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    res.send(result);
	    db.close();
	  });
	}); 
	
	// delete msg.jsonTable;
});


app.get('/i_tables/',(req,res)=>{

	//var url = "mongodb://localhost:27017/mydb";
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("demand").find({status:"requested"}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log("Connected!!",result);
	    res.send(result);
	    db.close();
	  });
	});
});



//##### ######## #########    Login Form    #############


app.get('/loginpage/',function(req,res){

	  res.sendfile("./loginpage.html");
});



//2) The login route:

app.post('/login', function (req, res) {
  var post = req.body;
  if (post.user === 'john' && post.password === 'john') {
    req.session.user_id = 'john';
    res.redirect('/home');
  } else {
    res.send('Bad user/pass');
  }
});

//3) The logout route:

app.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/loginpage');
});      


//**************  Login End  ###************



app.listen(port,function(){
  console.log("Started on PORT 3000");
})
