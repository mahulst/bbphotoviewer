/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/photos',
    'templates/templates'
], function ($, _, Backbone, PhotosCollection, Templates) {
    'use strict';

    var PhotosView = Backbone.View.extend({
        template: Templates['photos'],
        $groupElem: null, //element to render to

    	initialize: function () {
    		var html = '';//this.template(this.model.toJSON());
    		this.$el.html(html);
            this.listenTo(this.collection, 'reset', this.render);
    	},
        render : function () {
            var that = this,
                photosHTML = [];
            
            this.collection.each(function (element, index, list) {
                //add html of photos template with each photo in collection
                photosHTML.push(that.template(element.toJSON()));
            });
            this.$el.append(photosHTML.join(''));
            return this;
        }
    });

    return PhotosView;
});
