define([
	'underscore'
], function (_){
	var Templates = {};
	Templates['photos'] = [
		'<div class=" panel panel-info">',
			'<div class=" panel-heading">',
				'<h3 class=" panel panel-title">',
				'photos made on - <%= dateAdded %>',
				'</h3>',
			'</div>',
			'<div class=" panel-body">',
			'panel content',
			'</div>',
		'</div>'
	].join("");

	for (var tmpl in Templates) {
		if (Templates.hasOwnProperty(tmpl)) {
			Templates[tmpl] = _.template(Templates[tmpl]);
		}
	}
	return Templates;
});