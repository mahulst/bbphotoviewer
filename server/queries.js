var mysql      = require('mysql'),
	fs = require('fs'),
	http = require("http"),
	doQuery;


exports.getData = function (dataObj, res) {
	var query,
		idName;
	query = [
		"SELECT * FROM ",
		dataObj.table
	];
	if (dataObj.id !== undefined) {
		idName = dataObj.table + "_id";
		query.push(" WHERE ");
		query.push(idName);
		query.push(" = ");
		query.push(dataObj.id);
	}
	console.log(query.join(""));
	doQuery(query.join(""),function (data, args){
		res.end(JSON.stringify(data));
	});
}
exports.getPhotosFromCategory = function (categoriesId, res) {
	var query = [
		"SELECT * FROM photos p, categories c ",
		"WHERE c.categories_id = ",
		categoriesId,
		" AND c.categories_id = p.categories_id"
	].join("");
	console.log(query);
	doQuery(query, function (data, args) {		
		res.end(JSON.stringify(data));
	})
}

	
doQuery = function(query, callback, args) {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'mysql',
		database : 'photoviewer'
	});

	connection.connect();

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		if(callback !== undefined){
			callback(rows, args);
		}
	});
	connection.end();
}
