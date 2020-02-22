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


			



app.listen(port,function(err)
{
	console.log("listening on 3000");
});




