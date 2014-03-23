'use strict';
var basePath = "/home/main22/projects/photoviewer/server/";
var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var fs = require('fs');
var photos = JSON.parse(fs.readFileSync(basePath + 'photos.json', 'utf8'));
var im = require('imagemagick');
var queries = require(basePath + 'queries');

// init express
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);

  app.use(express.bodyParser());
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

  queries.getPhotosFromCategory(req.params.gid, res);
}); 

app.get('/groups', function(req, res){
  var requestObj = {
    table: 'categories'
  };

  queries.getData(requestObj, res);
});
//get images fullsize
app.get('/uploads/fullsize/:file', function (req, res){
  var file = req.params.file;
  var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');

});
//get images thumbs
app.get('/uploads/thumbs/:file', function (req, res){
  var file = req.params.file;
  var img = fs.readFileSync(__dirname + "/uploads/thumbs/" + file);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

//handle uploads
app.post('/upload', function(req, res) {
  var files = req.files;
  for (var f in files) {
    var file = files[f];
    fs.readFile(file.path, function (err, data) {

    var imageName = file.name

    /// If there's an error
    if(!imageName){

      console.log("There was an error")
      res.redirect("/");
      res.end();

    } else {

       var newPath = __dirname + "/uploads/fullsize/" + imageName;

      var thumbPath = __dirname + "/uploads/thumbs/" + imageName;

      /// write file to uploads/fullsize folder
      fs.writeFile(newPath, data, function (err) {

        /// write file to uploads/thumbs folder
        im.resize({
          srcPath: newPath,
          dstPath: thumbPath,
          width:   200
        }, function(err, stdout, stderr){
          if (err) throw err;
          console.log('resized image to fit within 200x200px');
        });

         res.redirect("/uploads/fullsize/" + imageName);

      });
    }
  });
  }
  
});
// start server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express App started!');
});