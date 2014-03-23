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

exports.addData = function (dataObj, res) {
	var query,
		v,
		value;
	query = [
		"INSERT INTO ",
		dataObj.table,
		" ( "
	];
	for(v in dataObj.values) {
		value = dataObj.values[v];
		query.push(v + ", ");
	}
	//remove trailing comma
	query[query.length-1] = query[query.length-1].substr(0, query[query.length-1].length-2);

	query.push(") VALUES ( ");
	for(v in dataObj.values) {
		value = dataObj.values[v];
		query.push("'" + value + "'" + ", ");
	}
	//remove trailing comma
	query[query.length-1] = query[query.length-1].substr(0, query[query.length-1].length-2);

	query.push(");");
	console.log(query.join(""));
	doQuery(query.join(""),function (data, args){
		res.end('{status:"OK"}');
	});
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
