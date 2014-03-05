'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var fs = require('fs');
var photos = JSON.parse(fs.readFileSync('server/photos.json', 'utf8'));



// init express
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);

    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../app/scripts/views');
});

// set logging
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// mount static
app.use(express.static( path.join( __dirname, '../app') ));
app.use(express.static( path.join( __dirname, '../.tmp') ));


// route index.html
app.get('/', function(req, res){
  res.sendfile( path.join( __dirname, '../app/index.html' ) );
});
app.get('/groups/:gid/photos', function(req, res){

  res.setHeader('Content-Type', 'application/json');
  res.send(photos[req.params.gid]);
}); 

app.get('/groups', function(req, res){

  res.setHeader('Content-Type', 'application/json');
  res.sendfile( path.join( __dirname, 'groups.json' ) );
});

// start server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express App started!');
});