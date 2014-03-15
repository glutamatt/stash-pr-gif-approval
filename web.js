var express = require("express");
var logfmt = require("logfmt");
var fs = require('fs');
var app = express();
var Hogan = require('hogan.js');

app.use(logfmt.requestLogger());
app.use(express.static(__dirname + '/assets'));

var renderTpl = function(tpl, data, cb) {
	fs.readFile(__dirname + '/views/' + tpl, 'utf8', function (err,content) {
		if (err) return console.log(err);
		return cb(Hogan.compile(content).render(data));
	});
};

app.get('/', function(req, res) {
	renderTpl('index', {name:'matt'}, function(content){
		res.send(content);		
	});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});