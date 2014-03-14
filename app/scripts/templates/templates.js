define([
	'underscore'
], function (_){
	var Templates = {};
	Templates['group'] = [
		'<div class=" panel panel-info">',
			'<div class=" panel-heading">',
				'<h3 class=" panel panel-title">',
				'photos of <%= groupName %>',
				'</h3>',
			'</div>',
			'<div class=" panel-body">',
			'panel content',
			'</div>',
		'</div>'
	].join("");

	Templates['photos'] = [
		'<div class=" panel panel-info">',
			'<a href="#"><img src= "<%= src %>" photo-id="<%= photoId %>" category-id="<%= categoryId %>" class="photo-link img-thumbnail"/></a>',
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