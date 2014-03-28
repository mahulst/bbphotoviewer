define([
	'underscore'
], function (_){
	var Templates = {};
	Templates['group'] = [
		'<div class="category panel panel-default">',
			'<div class=" panel-heading">',
				'<h3 class=" panel-title">',
				'Photos Of <%= groupName %>',
				'</h3>',
			'</div>',
			'<div class="row panel-body">',
			'panel content',
			'</div>',
		'</div>'
	].join("");

	Templates['photo'] = [
		'<div class="col-xs-6 col-md-3">',
			'<a><img src="uploads/thumbs/<%= src %>" photo-id="<%= photoId %>" category-id="<%= categoryId %>" class="photo-link img-thumbnail"/></a>',
		'</div>'
	].join("");

	Templates['photos'] = [

	    '<div class="category panel panel-default">',
	        '<div class=" panel-heading">',
	            '<h3 class=" panel-title">',
	        '</div>',
	       	'<div class="row panel-body">',
				'<% _.each(photos, function (photo) {%>',
				'<div class="col-xs-6 col-md-3">',
					'<a ><img src="uploads/thumbs/<%= photo.src %>" photo-id="<%= photo.photoId %>" category-id="<%= photo.categoryId %>" class="photo-link img-thumbnail"/></a>',
					'</div>',
				'<% });%>',
			'</div>',
		'</div>'
	].join("");

	Templates['upload'] = [		
		'<div id="category-div" class=category-select>',
			'<select name=categoryId id=uploadCategory></select>',
		'</div>',
		'<form id="dropzone-div" class=dropzone>',
			'<input id=dropzoneCategoryId type="hidden" name="categoryHidden" value="1" />',
		'</form>'
	].join("");
	for (var tmpl in Templates) {
		if (Templates.hasOwnProperty(tmpl)) {
			Templates[tmpl] = _.template(Templates[tmpl]);
		}
	}
	return Templates;
});