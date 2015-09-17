var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var serverPort = process.env.PORT || 4000;

// var config = require('./config');

// var db = require('seraph')(config.db);

var db = require('./db/db');

// var cypher = 'MATCH (sh:Person) RETURN sh'
// var cypher = 'START n=node(*) RETURN n'
var cypher = 'START n=node(*) MATCH (n)-[r]->(m) RETURN n,r,m'

db.query(cypher, {}, function(err, result) {
	if(err) { 
		console.log('ERROR')
		console.log(err);
	}
	else console.log(result);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(serverPort, function() {
	console.log('no-spoon is listening on port ' + serverPort);
});

module.exports = app;

/*
var request = require('request');
var httpDB = 'http://localhost:7474/db/data/transaction/commit';

function runCypherQuery(query, params, callback) {
	request.post({
		uri: httpDB,
		json: { statements: [{ statement: query, parameters: params }] }
	}, function(err, res, body) {
		callback(err, body);
	})
}

// var cypher = "MATCH (sh:Person) RETURN sh;"
var cypher = 'CREATE (ml:Person { name: {name}, from: {from}, lead: {lead} }) RETURN ml';

runCypherQuery(cypher, {
	name: 'Miranda',
	from: 'Cerberus',
	lead: 'Lazarus'
}, function(err, resp) {
	if(err) console.log(err)
		else console.log(resp)
})
*/