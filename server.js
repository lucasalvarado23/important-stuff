
var keys = require("./keys");

//var google = require("google");

//var http = require("request")

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get("/", function(req, res){
	res.render("index",{'key':process.env.GOOGLE_KEY});
});


//var routes = require('./controllers/routes.js');
//app.use('/',routes);
var port = process.env.PORT || 3000;
app.listen(port);