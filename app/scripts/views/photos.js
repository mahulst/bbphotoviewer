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
        template: Templates['photo'],
    	initialize: function () {
    		var html = '';//this.template(this.model.toJSON());
    		this.$el.html(html);
            this.listenTo(this.collection, 'reset', this.render);
    	},
        events : {
            "click .photo-link": "clickPhoto"
        },
        render : function () {
            var that = this,
                photosHTML = [];
            
            _.chain(this.collection.first(4)).each(function (element, index, list) {
                //add html of photos template with each photo in collection
                photosHTML.push(that.template(element.toJSON()));
            });
            if (this.collection.length > 4) {
                photosHTML.push("more...")
            }

            this.$el.append(photosHTML.join(''));
            return this;
        },
        clickPhoto : function (e) {
            var photoId = $(e.target).attr('photo-id');
            var categoryId = $(e.target).attr('category-id');
            //navigate 
            Backbone.Notifications.trigger("navigate", "photos/" + categoryId);
            //select photo
            Backbone.Notifications.trigger("selectPhoto", photoId);
        }
    });

    return PhotosView;
});
