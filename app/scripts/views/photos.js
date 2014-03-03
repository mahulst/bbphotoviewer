/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/photos',
    'templates/templates'
], function ($, _, Backbone,  PhotosCollection, Templates) {
    'use strict';

    var PhotosView = Backbone.View.extend({
        html: [
            "<h3> photo view </h3>",
            "<div id=photo-list class='clearfix'>loading...</div>",
            "<div id=photo-filters></div>"
        ].join(""),
        initialize : function () {
            //anchors
            this.$el.html(this.html);
            this.$photoList = this.$("#photo-list");
            this.$photoFilters = this.$("#photo-filters");
            this.collection = new PhotosCollection();
            this.collection.fetch({
                success: function (collection, response, options) {

                },
                error: function (collection, response, options) {

                },
                complete: function (xhr, textStatus){
                    
                }
            });
            this.listenTo(this.collection, 'add', this.render);
            window.debug = this.collection;
        },

    	render: function () {
            if (this.collection.length) {
                var photoHtml = [];
                this.collection.each(function (element, index, list) {
                    photoHtml.push(Templates['photos'](element.toJSON()));
                });
                this.$photoList.html(photoHtml.join(""));
            } else {
                this.$photoList.html("no photos to display");
            }
    		return this;
    	}
    });

    return PhotosView;
});
