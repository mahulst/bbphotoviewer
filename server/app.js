'use strict';
var basePath = "/home/main22/projects/bbphotoviewer/server/";
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
  var path = __dirname + "/uploads/fullsize/" + file;
  fs.exists(path, function(exists) {
    var img;
    if(exists) {
      img = fs.readFileSync(path);
    } else {      
      img = fs.readFileSync(__dirname + "/uploads/fullsize/green-question-mark.jpg");
    }
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  })

});
//get images thumbs
app.get('/uploads/thumbs/:file', function (req, res){
  var file = req.params.file;
  var path = __dirname + "/uploads/thumbs/" + file;
  fs.exists(path, function(exists) {
    var img;
    if(exists) {
      img = fs.readFileSync(path);
    } else {      
      img = fs.readFileSync(__dirname + "/uploads/thumbs/green-question-mark.jpg");
    }
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  })
});

//add categorie
app.post('/categories/', function(req, res){
  var categoriesName = req.body.categoriesName;
  queries.addData({
    table: 'categories',
      values: {
        categories_id: 'NULL',
        categories_name: categoriesName
      }
  }, res);
  
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
        var photoObj =  {
          table: 'photos',
          values: {
              photos_id: "NULL",
              photos_name: imageName.substr(0, imageName.length-4),
              path: imageName,
              categories_id: req.body.categoryHidden
            }
        }
        queries.addData(photoObj, res);
        //res.redirect("/uploads/fullsize/" + imageName);

      });
    }
  });
  }
  
});
// start server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express App started!');
});
